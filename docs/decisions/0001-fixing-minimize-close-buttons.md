# IBUS-SAS Calculator - Bug Fix Summary

## Problem
Custom window controls (minimize/close buttons) stopped working after packaging the Electron app, despite working fine in development.

## Root Cause
The preload script path was incorrect in production. The original code used:
```javascript
preload: path.join(__dirname, "src/preload.js")
```

This worked in development but failed in production because:
- In development: `__dirname` points to the project root, so `src/preload.js` exists
- In production: `__dirname` points to `app.asar` (compressed archive), and the `src` folder structure doesn't exist there

## Investigation Process
1. Added logging to both main and preload processes
2. Created a file-based logger (since packaged apps don't show console output easily)
3. Discovered the preload script wasn't being loaded at all in production
4. Tested multiple possible preload paths to find which one exists

## Solution
The preload script needs to be:
1. **Copied outside the app.asar archive** during build (using `extraFiles` in package.json)
2. **Referenced using `process.resourcesPath`** in production

### Correct path logic:
```javascript
const preloadPath = isDev 
    ? path.join(__dirname, "src", "preload.js")           // Dev: src folder
    : path.join(process.resourcesPath, "preload.js");     // Prod: resources folder
```

### Required package.json configuration:
```json
"build": {
  "extraFiles": [
    {
      "from": "src/preload.js",
      "to": "preload.js"
    }
  ]
}
```

This tells electron-builder to copy `preload.js` to the `resources` folder instead of bundling it in the asar.

## File Structure Comparison

### Development:
```
project/
├── src/
│   └── preload.js          ← Preload loads from here
├── main.js
└── public/
```

### Production (Installed):
```
C:\Program Files\IBUS-SAS Calculator\
├── resources/
│   ├── app.asar            ← Main code compressed here
│   └── preload.js          ← Preload loads from here (outside asar)
└── IBUS-SAS Calculator.exe
```

### Production (Portable):
When you run the portable .exe, it extracts to a temp folder:
```
%TEMP%\[random-id]\
├── resources/
│   ├── app.asar
│   └── preload.js          ← Same structure as installed
└── executable files
```

## Key Learnings

1. **Preload scripts cannot be inside app.asar** - They must be external files for Electron to load them
2. **Use `process.resourcesPath`** in production - This always points to the resources folder regardless of installation type
3. **Portable apps run from temp directories** - They extract themselves to `%TEMP%` before running
4. **Logging is essential for debugging packaged apps** - File-based logging helps when console isn't accessible

## Files Modified

1. **main.js** - Fixed preload path logic, added comprehensive logging
2. **preload.js** - No changes needed (it was working fine)
3. **logger.js** - New file for debugging packaged apps
4. **package.json** - Added `extraFiles` configuration to copy preload.js correctly

## Testing Checklist

- [x] Works in development mode
- [x] Works after packaging (installed version)
- [x] Works in portable version
- [x] Window position persists across sessions
- [x] Minimize button works
- [x] Close button works
- [x] Logs are created and contain useful debugging info

## Cleanup Recommendations

Once confirmed working in production:
1. Remove DevTools opening in production mode (already done)
2. Remove verbose logging from main.js (can keep logger.js for future debugging)
3. Consider keeping minimal logging for critical events (startup, errors)

---

**Resolution Status**: ✅ RESOLVED
**Date**: December 19, 2025

**THIS WASNT TESTED IN LINUX**