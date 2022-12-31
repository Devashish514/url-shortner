const { version } = require('../../package.json');

const swaggerDef = {
    openapi: '3.0.0',
    info: {
        title: 'Url_Shortner',
        version,
        copyright:"@Devashish514"
    },
    servers: [
        {
            url: `https://fun-size-url.onrender.com`,
        }
    ],
};

module.exports = swaggerDef;
