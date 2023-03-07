// SETTING UP UI SWAGGER
const swaggerRouter = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json');

// http://localhost:3000/api-docs/#/
swaggerRouter.use('/api-docs', swaggerUi.serve);
swaggerRouter.get('/api-docs', swaggerUi.setup(swaggerDocument));

module.exports = swaggerRouter;
