import { AppError } from './app-error';

const commonErrors = {
  InvalidInput: { name: 'InvalidInput', httpStatus: 400 },
  Unauthorized: { name: 'Unauthorized', httpStatus: 401 },
  OperationNotAllowed: { name: 'OperationNotAllowed', httpStatus: 403 },
  ResourceNotFound: { name: 'ResourceNotFound', httpStatus: 404 },
  DuplicateItem: { name: 'DuplicateItem', httpStatus: 409 },
  Conflict: { name: 'Conflict', httpStatus: 409 },
  BadFormat: { name: 'BadFormat', httpStatus: 422 },
  UnknownError: { name: 'UnknownError', httpStatus: 500 },
};

export class InvalidInputError extends Error {
  public httpCode: any;
  public isOperational: boolean;
  public innerException: any;
  constructor(message, name, innerException) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.httpCode = commonErrors.InvalidInput.httpStatus;
    this.name = name || commonErrors.InvalidInput.name;
    this.isOperational = true;
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

// tslint:disable-next-line:max-classes-per-file
export class UnauthorizedError extends Error {
  public httpCode: any;
  public isOperational: boolean;
  public innerException: any;
  constructor(message, name, innerException) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.httpCode = commonErrors.Unauthorized.httpStatus;
    this.name = name || commonErrors.Unauthorized.name;
    this.isOperational = true;
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
// tslint:disable-next-line:max-classes-per-file
export class OperationNotAllowedError extends Error {
  public httpCode: any;
  public isOperational: boolean;
  public innerException: any;
  constructor(message, name, innerException) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.httpCode = commonErrors.OperationNotAllowed.httpStatus;
    this.name = name || commonErrors.OperationNotAllowed.name;
    this.isOperational = true;
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
// tslint:disable-next-line:max-classes-per-file
export class ResourceNotFoundError extends Error {
  public httpCode: any;
  public isOperational: boolean;
  public innerException: any;
  constructor(message, name, innerException) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.httpCode = commonErrors.ResourceNotFound.httpStatus;
    this.name = name || commonErrors.ResourceNotFound.name;
    this.isOperational = true;
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
// tslint:disable-next-line:max-classes-per-file
export class DuplicateItemError extends Error {
  public httpCode: any;
  public isOperational: boolean;
  public innerException: any;
  constructor(message, name, innerException) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.httpCode = commonErrors.DuplicateItem.httpStatus;
    this.name = name || commonErrors.DuplicateItem.name;
    this.isOperational = true;
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
// tslint:disable-next-line:max-classes-per-file
export class ConflictError extends Error {
  public httpCode: any;
  public isOperational: boolean;
  public innerException: any;
  constructor(message, name, innerException) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.httpCode = commonErrors.Conflict.httpStatus;
    this.name = name || commonErrors.Conflict.name;
    this.isOperational = true;
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
// tslint:disable-next-line:max-classes-per-file
export class BadFormatError extends Error {
  public httpCode: any;
  public isOperational: boolean;
  public innerException: any;
  constructor(message, name, innerException) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.httpCode = commonErrors.BadFormat.httpStatus;
    this.name = name || commonErrors.BadFormat.name;
    this.isOperational = true;
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
// tslint:disable-next-line:max-classes-per-file
export class UnknownError extends Error {
  public httpCode: any;
  public isOperational: boolean;
  public innerException: any;
  constructor(message, name, innerException) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.httpCode = commonErrors.UnknownError.httpStatus;
    this.name = name || commonErrors.UnknownError.name;
    this.isOperational = true;
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
