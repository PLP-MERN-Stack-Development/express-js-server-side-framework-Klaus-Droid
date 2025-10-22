// Express server file placeholder
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const productsRouter = require('./routes/products');
const logger = require('./middleware/logger');
const auth = require('./middleware/auth');
const { errorHandler, notFound } = require('./middleware/errorHandler');


const app = express();
const PORT = process.env.PORT || 3000;


// Middleware
app.use(bodyParser.json()); // task required body-parser
app.use(logger);
app.use(auth); // global auth - you can move to specific routes if needed


// Hello World root
app.get('/', (req, res) => {
    res.send('Hello World');
});


// API routes
app.use('/api/products', productsRouter);


// 404 handler
app.use(notFound);


// Global error handler
app.use(errorHandler);


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT} `);
});