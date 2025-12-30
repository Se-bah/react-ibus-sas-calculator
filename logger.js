/**
 * Logger Module
 * 
 * Creates log files in a 'logs' folder next to the executable.
 * Useful for debugging packaged apps where console output isn't visible.
 * 
 * Log file location:
 * - Installed: C:\Program Files\AppName\logs\
 * - Portable: %TEMP%\[random-folder]\logs\ (extracted temp location)
 */

const fs = require('fs');
const path = require('path');

let logFile;
let logsDir;

/**
 * Initialize the logger
 * Must be called after app.whenReady() to access app.getPath()
 * 
 * @param {Electron.App} app - The Electron app instance
 */
function initLogger(app) {
    // Create logs directory next to the executable
    // Does not work with portable mode as app.getPath('exe') points to temp location
    logsDir = path.join(path.dirname(app.getPath('exe')), 'logs');

    // Ensure logs directory exists
    if (!fs.existsSync(logsDir)) {
        fs.mkdirSync(logsDir, { recursive: true });
    }

    // Create log file with timestamp to avoid overwriting
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
    logFile = path.join(logsDir, `app-${timestamp}.log`);
    
    // Log initialization info
    log(`=== LOGGER INITIALIZED ===`);
    log(`Log file: ${logFile}`);
    log(`Logs directory: ${logsDir}`);
}

/**
 * Write a log message to file and console
 * 
 * @param {string} message - The message to log
 * @param {string} type - Log level (INFO, ERROR, WARN, etc.)
 */
function log(message, type = 'INFO') {
    const time = new Date().toISOString();
    const logMessage = `[${time}] [${type}] ${message}\n`;
    
    // Write to file if logger is initialized
    if (logFile) {
        try {
            fs.appendFileSync(logFile, logMessage);
        } catch (err) {
            console.error('Failed to write to log file:', err);
        }
    }
    
    console.log(message);
}

module.exports = { log, initLogger };