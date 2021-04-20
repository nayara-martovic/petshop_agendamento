const config = require('dotenv-safe');
const express = require('express');

const resp = require('./utils/response');
const ValidateRequest = require('./middlewares/validate-request');
const ClienteRoutes = require('./routes/cliente-routes');

config.config();
const app = express();

app.use(express.json());

app.use('*', ValidateRequest);
app.use('/api/v1/clientes', ClienteRoutes);

app.get('*', (req, res) => resp.sendError(res, "", new BadRequest()));

const port = process.env.PORT || 3000;

app.listen(port, ()=> console.log(`Server is listenning on port ${port}...`));

module.exports = app;