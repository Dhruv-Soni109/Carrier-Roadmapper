export class AppError extends Error {
  constructor(message, statusCode = 500, code = 'INTERNAL_ERROR', details = null) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message, details = null) {
    super(message, 400, 'VALIDATION_FAILED', details);
  }
}

export class BadRequestError extends AppError {
  constructor(message, code = 'BAD_REQUEST') {
    super(message, 400, code);
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Resource not found') {
    super(message, 404, 'NOT_FOUND');
  }
}

export class RateLimitError extends AppError {
  constructor(message = 'Too many requests. Please try again later.') {
    super(message, 429, 'RATE_LIMIT_EXCEEDED');
  }
}

export class AiServiceError extends AppError {
  constructor(message, details = null, statusCode = 502) {
    super(message, statusCode, 'AI_SERVICE_ERROR', details);
  }
}

export class GraphValidationError extends AppError {
  constructor(message, details = null) {
    super(message, 422, 'INVALID_ROADMAP_GRAPH', details);
  }
}
