const error = require('../Middleware/Errors');
const postal = require('../Routes/postal');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const specs= require('../Swagger/Swagger');
module.exports=function (app) {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:false}));
    app.use('/postal', postal);
    app.use(error);


};
