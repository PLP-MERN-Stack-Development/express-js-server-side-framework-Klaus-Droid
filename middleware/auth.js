// Auth middleware placeholder
middleware / auth.js;

module.exports = function auth(req, res, next) {
    const apiKey = req.header('x-api-key') || '';
    const expected = process.env.API_KEY || '';


    // Allow health/root endpoints without key
    if (req.path === '/' && req.method === 'GET') return next();


    if (!expected) {
        // If no API_KEY configured, allow requests (helpful for local dev).
        return next();
    }


    if (!apiKey || apiKey !== expected) {
        const err = new Error('Unauthorized: invalid API key');
        err.status = 401;
        return next(err);
    }
    next();
};