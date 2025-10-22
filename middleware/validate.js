// Validation middleware placeholder
// validate.js

// Basic validation middleware for product create/update
module.exports.validateProduct = function validateProduct(req, res, next) {
    const { name, description, price, category, inStock } = req.body;
    const errors = [];


    if (!name || typeof name !== 'string' || !name.trim()) errors.push('name is required');
    if (!description || typeof description !== 'string') errors.push('description is required');
    if (price === undefined || isNaN(Number(price))) errors.push('price must be a number');
    if (!category || typeof category !== 'string') errors.push('category is required');
    if (inStock === undefined || typeof inStock !== 'boolean') errors.push('inStock must be boolean');


    if (errors.length) {
        const err = new Error('Validation failed');
        err.status = 400;
        err.details = errors;
        return next(err);
    }
    next();
};