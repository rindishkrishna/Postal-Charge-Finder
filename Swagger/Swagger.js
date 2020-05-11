const swaggerJsdoc = require('swagger-jsdoc');
const options = {
    swaggerDefinition: {
        info: {
            title: "postal Delivery API Documentation",
            version: "1.0.0",
            description:
                "A documention of Backend API written in Nodejs.",
        },
        securityDefinitions: {
        }
    },
    apis: ['./Routes/postal.js']
};
const specs = swaggerJsdoc(options);
module.exports =specs;
