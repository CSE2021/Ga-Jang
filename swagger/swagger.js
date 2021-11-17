const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    swaggerDefinition: {
        info: {
            title: 'Gajang API',
            version: '1.0.0',
            description: 'Gajang API with express',
        },
        servers: [
            {
                url: "http://shbox.shop:3002",
                description: "Gajang Server"
            }
        ],
        host: 'shbox.shop:3002'
    },
    apis: ['./routes/*.js', './swagger/*']
};

const specs = swaggerJsdoc(options);

module.exports = {
    swaggerUi,
    specs
};