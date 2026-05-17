export class AppError extends Error {
  /**
   * @param {number} statusCode
   * @param {string} message
   * @param {boolean} [isOperational]
   */
  constructor(statusCode, message, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace?.(this, this.constructor);
  }
}
