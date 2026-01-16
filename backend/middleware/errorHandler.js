const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || err.status || 500;
  const status = err.status || 'error';

  // Log error details
  console.error('💥 ERROR:', {
    message: err.message,
    statusCode,
    status,
    path: req.originalUrl,
    method: req.method
  });

  if (process.env.NODE_ENV === 'development') {
    return res.status(statusCode).json({
      status,
      error: err,
      message: err.message,
      stack: err.stack
    });
  }

  // Production response
  if (err.isOperational) {
    return res.status(statusCode).json({
      status,
      message: err.message
    });
  }

  // Fallback for specific status codes if not using custom error classes yet
  if (err.status === 401) {
    return res.status(401).json({ error: 'Unauthorized - Please login' });
  }

  if (err.status === 404) {
    return res.status(404).json({ error: 'Resource not found' });
  }

  // Programming or unknown errors: don't leak details in production
  res.status(500).json({
    status: 'error',
    message: 'Something went very wrong!'
  });
};

module.exports = errorHandler;
