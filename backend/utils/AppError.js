export class AppError extends Error {
  /**
   * @param {number} statusCode HTTP status
   * @param {string} message Safe client-facing message
   * @param {boolean} isOperational Distinguishes expected errors from programmer bugs
   */
  constructor(statusCode, message, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace?.(this, this.constructor);
  }
}
