// Products route placeholder
routes / products.js
if (idx === -1) {
    const err = new Error('Product not found');
    err.status = 404;
    return next(err);
}
const { name, description, price, category, inStock } = req.body;
const updated = Object.assign(products[idx], {
    name,
    description,
    price: Number(price),
    category,
    inStock: !!inStock
});
res.json(updated);



// DELETE /api/products/:id
router.delete(
    '/:id',
    asyncWrapper(async (req, res, next) => {
        const { id } = req.params;
        const idx = findProductIndex(id);
        if (idx === -1) {
            const err = new Error('Product not found');
            err.status = 404;
            return next(err);
        }
        const deleted = products.splice(idx, 1)[0];
        res.json({ deleted });
    })
);


// GET /api/products/search?q=term (alternative search route)
router.get(
    '/search',
    asyncWrapper(async (req, res) => {
        const q = (req.query.q || '').toLowerCase();
        if (!q) return res.json({ data: [] });
        const matches = products.filter(p => p.name.toLowerCase().includes(q));
        res.json({ total: matches.length, data: matches });
    })
);


// GET /api/products/stats - count by category
router.get(
    '/stats',
    asyncWrapper(async (req, res) => {
        const stats = products.reduce((acc, p) => {
            acc[p.category] = (acc[p.category] || 0) + 1;
            return acc;
        }, {});
        res.json({ total: products.length, byCategory: stats });
    })
);


module.exports = router;
