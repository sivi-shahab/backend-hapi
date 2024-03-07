require('dotenv').config();

const Hapi = require('@hapi/hapi');
const albums = require('./api/albums');
const songs = require('./api/songs');
//const AlbumsService = require('./services/inMemory/MusicServices');
const AlbumServices = require('./services/inMemory/AlbumServices');
const SongServices = require('./services/inMemory/SongServices');
const AlbumsValidator = require('./validator/albums');
const SongsValidator = require('./validator/songs');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');

const init = async () => {
    const albumServices = new AlbumServices();
    const songServices = new SongServices();

    const server = Hapi.server({
        port: process.env.PORT,
        host: process.env.HOST,
        //host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
        routes: {
            cors: {
                origin: ['*'], // allow requests from any domain
            },
        },
    });

    const swaggerOptions = {
        info: {
            title: 'Test API Documentation',
            version: '1.0.0',
        },
        schemes: ['http', 'https'],
        payloadType: 'json',
    };

    await server.register([
        {
            plugin: albums,
            options: {
                service: albumServices,
                validator: AlbumsValidator,
            },
        },
        {
            plugin: songs,
            options: {
                service: songServices,
                validator: SongsValidator,
            },
        },
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions,

        },
    ]);

    try {
        await server.start();
        console.log(`Server running on ${server.info.uri}`);
    } catch(err) {
        console.log(err);
    }
    await server.start();

};

init();