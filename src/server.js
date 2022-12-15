const Hapi = require('@hapi/hapi');
const routes= require('./routes')

const init = async () => {
    //server.options routes{cors{origin:[]}} to allow same origin access for whole server
    const server = Hapi.server({
        port: 5000,
        host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
        routes: {
          cors: {
            origin: ['*'],
          },
        },
      });

    //router
    server.route(routes);


    await server.start();
    console.log('Server running on %s', server.info.uri);
};


init();