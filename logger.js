/**
 * Logger Module
 * 
 * Creates log files in the userData directory for consistent access.
 * This ensures logs are accessible even for portable builds.
 * 
 * Log file locations:
 * - Portable: %APPDATA%\IBUS-SAS-Calculator\logs\
 * - Installed: [install-dir]\data\logs\
 */

const fs = require('fs');
const path = require('path');

let logFile;
let logsDir;

/**
 * Initialize the logger
 * Must be called after app.whenReady() and after userData path is set
 * 
 * @param {Electron.App} app - The Electron app instance
 */
function initLogger(app) {
    // Create logs directory inside userData (which we've already configured)
    logsDir = path.join(app.getPath('userData'), 'logs');

    // Ensure logs directory exists
    if (!fs.existsSync(logsDir)) {
        fs.mkdirSync(logsDir, { recursive: true });
    }

    // Create log file with timestamp to avoid overwriting
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
    logFile = path.join(logsDir, `app-${timestamp}.log`);

    log(`=== LOGGER INITIALIZED ===`);
    log(`Log file: ${logFile}`);
    log(`Logs directory: ${logsDir}`);
    
    cleanOldLogs();
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

/**
 * Clean up old log files, keeping only the most recent 10
 */
function cleanOldLogs() {
    try {
        const files = fs.readdirSync(logsDir)
            .filter(file => file.startsWith('app-') && file.endsWith('.log'))
            .map(file => ({
                name: file,
                path: path.join(logsDir, file),
                time: fs.statSync(path.join(logsDir, file)).mtime.getTime()
            }))
            .sort((a, b) => b.time - a.time); // Sort by newest first

        // Delete all but the 10 most recent
        if (files.length > 10) {
            files.slice(10).forEach(file => {
                try {
                    fs.unlinkSync(file.path);
                    log(`Deleted old log file: ${file.name}`);
                } catch (err) {
                    log(`Failed to delete old log: ${file.name}`, 'ERROR');
                }
            });
        }
    } catch (err) {
        log(`Failed to clean old logs: ${err}`, 'ERROR');
    }
}

module.exports = { log, initLogger };