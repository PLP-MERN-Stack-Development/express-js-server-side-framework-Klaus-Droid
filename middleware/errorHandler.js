// Error handler placeholder
middleware / errorHandler.js

function notFound(req, res, next) {
    const err = new Error(`Not Found - ${req.originalUrl}`);
    err.status = 404;
    next(err);
}


function errorHandler(err, req, res, next) {
    const status = err.status || 500;
    const payload = {
        message: err.message || 'Internal Server Error',
        status,
    };
    if (err.details) payload.details = err.details;
    if (process.env.NODE_ENV === 'development') payload.stack = err.stack;
    res.status(status).json(payload);
}


module.exports = { notFound, errorHandler };