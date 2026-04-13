/**
 * Logger Utility - Centralized logging for debugging and error tracking
 * Logs both to console and stores in memory for potential backend logging
 */

type LogLevel = 'DEBUG' | 'INFO' | 'WARN' | 'ERROR';

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  module: string;
  message: string;
  data?: any;
  error?: string;
}

class Logger {
  private logs: LogEntry[] = [];
  private maxLogs = 1000;

  private formatTimestamp(): string {
    const now = new Date();
    return now.toISOString();
  }

  private getColorCode(level: LogLevel): string {
    const colors: Record<LogLevel, string> = {
      DEBUG: '\x1b[36m',   // Cyan
      INFO: '\x1b[32m',    // Green
      WARN: '\x1b[33m',    // Yellow
      ERROR: '\x1b[31m'    // Red
    };
    return colors[level];
  }

  private log(level: LogLevel, module: string, message: string, data?: any, error?: Error) {
    const timestamp = this.formatTimestamp();
    const logEntry: LogEntry = {
      timestamp,
      level,
      module,
      message,
      data,
      error: error?.message
    };

    // Store in memory
    this.logs.push(logEntry);
    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }

    // Console output with color
    const color = this.getColorCode(level);
    const reset = '\x1b[0m';
    const prefix = `${color}[${timestamp}] [${level}] [${module}]${reset}`;

    if (level === 'ERROR' && error) {
      console.error(`${prefix} ${message}`, data, error.stack);
    } else {
      console[level.toLowerCase() as 'log' | 'debug' | 'warn' | 'error'](
        `${prefix} ${message}`,
        data ? data : ''
      );
    }
  }

  debug(module: string, message: string, data?: any) {
    this.log('DEBUG', module, message, data);
  }

  info(module: string, message: string, data?: any) {
    this.log('INFO', module, message, data);
  }

  warn(module: string, message: string, data?: any) {
    this.log('WARN', module, message, data);
  }

  error(module: string, message: string, error?: Error, data?: any) {
    this.log('ERROR', module, message, data, error);
  }

  getLogs(): LogEntry[] {
    return [...this.logs];
  }

  getLogsSince(minutes: number): LogEntry[] {
    const now = new Date();
    const cutoff = new Date(now.getTime() - minutes * 60000);
    return this.logs.filter(log => new Date(log.timestamp) > cutoff);
  }

  clearLogs() {
    this.logs = [];
  }

  exportLogs(): string {
    return JSON.stringify(this.logs, null, 2);
  }
}

export const logger = new Logger();
