const config = require('dotenv-safe');
const express = require('express');

const resp = require('./utils/response');
const ValidateRequest = require('./middleware/validate-request');
const ProductRouter = require('./routes/product-routes');

config.config();
const app = express();

app.use(express.json());

app.use('*', ValidateRequest);
app.use('/api/v1/products', ProductRouter);

app.get('*', (req, res) => resp.sendError(res, "", new BadRequest()));

const port = process.env.PORT || 3000;

app.listen(port, ()=> console.log(`Server is listenning on port ${port}...`));

module.exports = app;