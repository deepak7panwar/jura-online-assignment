'use strict';
export class AppError extends Error {
  public httpCode: any;
  public isOperational: boolean;
  public innerException: any;
  constructor(message, httpCode, name, innerException, isOperational = true) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.httpCode = httpCode || 500;
    this.name = name || 'UnknownError';
    this.isOperational = isOperational;
    this.innerException = innerException;
  }

  public toString() {
    let result = '\nError Info: ';
    if (this.name) {
      result += `${this.name}`;
    }
    if (this.httpCode) {
      result += ` (${this.httpCode})`;
    }
    if (this.message) {
      result += `: ${this.message}`;
    }
    result += '\n';
    if (this.stack) {
      result += this.stack;
    }
    if (this.innerException) {
      result += `Inner Exception: ${this.innerException}`;
    }

    return result;
  }
}
