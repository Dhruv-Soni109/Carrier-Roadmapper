/**
 * Formats a successful API response conforming to PathForge specification
 */
export const successResponse = (res, data, meta = {}, statusCode = 200) => {
  const requestId = res.locals?.requestId || 'req-' + Date.now();
  return res.status(statusCode).json({
    success: true,
    data,
    meta: {
      requestId,
      timestamp: new Date().toISOString(),
      ...meta,
    },
  });
};

/**
 * Formats a controlled API error response
 */
export const errorResponse = (res, statusCode = 500, code = 'INTERNAL_ERROR', message = 'An error occurred', details = null) => {
  const requestId = res.locals?.requestId || 'req-' + Date.now();
  const payload = {
    success: false,
    error: {
      code,
      message,
    },
    meta: {
      requestId,
      timestamp: new Date().toISOString(),
    },
  };

  if (details && process.env.NODE_ENV !== 'production') {
    payload.error.details = details;
  }

  return res.status(statusCode).json(payload);
};
