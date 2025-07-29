// Method tracing script for jailbreak detection analysis
if (ObjC.available) {
    console.log("[INFO] Objective-C runtime is available");
    
    // Check if JailMonkey class exists
    var JailMonkey = ObjC.classes.JailMonkey;
    if (JailMonkey) {
        console.log("[INFO] JailMonkey class found");
        
        // Check if the method exists before attaching
        if (JailMonkey['isJailBroken']) {
            console.log("[INFO] isJailBroken method found, attaching interceptor...");
            
            Interceptor.attach(JailMonkey['isJailBroken'].implementation, {
                onEnter: function(args) {
                    console.log('[TRACE] JailMonkey.isJailBroken() called');
                    console.log('[TRACE] Arguments: ' + args.length);
                },
                onLeave: function(retval) {
                    console.log('[TRACE] JailMonkey.isJailBroken() returned: ' + retval);
                }
            });
        } else {
            console.log("[WARNING] JailMonkey class found but isJailBroken method not found");
            console.log("[DEBUG] Available methods on JailMonkey:");
            JailMonkey.$ownMethods.forEach(function(method) {
                console.log("  - " + method);
            });
        }
    } else {
        console.log("[WARNING] JailMonkey class not found");
    }
    
    // Enhanced class enumeration script
    console.log("\n[INFO] Scanning for jailbreak detection related classes...");
    var foundClasses = [];
    
    ObjC.classes.forEach(function(className) {
        var lowerClassName = className.toLowerCase();
        if (lowerClassName.indexOf('jail') !== -1 ||
            lowerClassName.indexOf('frida') !== -1 ||
            lowerClassName.indexOf('cydia') !== -1 ||
            lowerClassName.indexOf('substrate') !== -1 ||
            lowerClassName.indexOf('xposed') !== -1 ||
            lowerClassName.indexOf('root') !== -1 ||
            lowerClassName.indexOf('detect') !== -1) {
            
            foundClasses.push(className);
            console.log("[FOUND] Relevant class: " + className);
            
            // Try to get methods for this class
            try {
                var classObj = ObjC.classes[className];
                if (classObj && classObj.$ownMethods) {
                    console.log("  Methods:");
                    classObj.$ownMethods.forEach(function(method) {
                        console.log("    - " + method);
                    });
                }
            } catch (e) {
                console.log("  [ERROR] Could not enumerate methods: " + e.message);
            }
        }
    });
    
    if (foundClasses.length === 0) {
        console.log("[INFO] No jailbreak detection related classes found");
    } else {
        console.log("[INFO] Found " + foundClasses.length + " relevant classes");
    }
    
    // Additional debugging: Check for common jailbreak detection frameworks
    console.log("\n[INFO] Checking for common jailbreak detection frameworks...");
    
    var frameworks = [
        'JailMonkey',
        'JailbreakDetector', 
        'JailbreakDetection',
        'SecurityCheck',
        'IntegrityCheck',
        'DeviceCheck',
        'AppCheck'
    ];
    
    frameworks.forEach(function(frameworkName) {
        if (ObjC.classes[frameworkName]) {
            console.log("[FOUND] Framework: " + frameworkName);
        }
    });
    
} else {
    console.log("[ERROR] Objective-C runtime not available");
} 