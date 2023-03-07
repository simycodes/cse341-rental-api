const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'cse341 Rental API',
    description: 'This is a documentation for the Rental API'
  },
  host: 'cse341-rental-api-service.onrender.com',
  schemes: ['https']
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.js'];

// localhost:3000
// schemes: ['http']

// host: 'https://cse341-blog-api-service.onrender.com',
// schemes: ['https']

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);
