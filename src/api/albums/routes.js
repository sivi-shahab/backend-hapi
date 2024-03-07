// const Joi = require('joi');
// const validate = require('../../validator/albums');
// const compiledValidation = Joi.compile(validate);
const routes = (handler) => [
    {
        method: 'POST',
        path: '/albums',
        handler: handler.postAlbumHandler,
        options: {
            tags: ['api'],
            description: 'A post route in albums plugin',
            // validate: {
            //      payload: compiledValidation,
            // }
        }
    },
    {
        method: 'GET',
        path: '/albums',
        handler: handler.getAlbumsHandler,
        options: {
            tags: ['api'],
            description: 'A get all route in albums plugin',
        }
    },

    {
        method: 'GET',
        path: '/albums/{id}',
        handler: handler.getAlbumByIdHandler,
        options: {
            tags: ['api'],
            description: 'A get by id route in albums plugin'
        }
    },
    {
        method: 'PUT',
        path: '/albums/{id}',
        handler: handler.putAlbumByIdHandler,
        options: {
            tags: ['api'],
            description: 'A put by id route in albums plugin',
        }
    },

    {
        method: 'DELETE',
        path: '/albums/{id}',
        handler: handler.deleteAlbumByIdHandler,
        options: {
            tags: ['api'],
            description: 'A delete by id route in albums plugin'

        }
    }
];

module.exports = routes;