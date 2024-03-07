const routes = (handler) => [
    {
        method: 'POST',
        path: '/songs',
        handler: handler.postSongHandler,
        options: {
            tags: ['api'],
        }
    },

    {
        method: 'GET',
        path: '/songs',
        handler: handler.getSongsHandler,
        options: {
            tags: ['api'],
        }
    },

    {
        method: 'GET',
        path: '/songs/{id}',
        handler: handler.getSongByIdHandler,
        options: {
            tags: ['api'],
        }
    },

    {
        method: 'PUT',
        path: '/songs/{id}',
        handler: handler.putSongByIdHandler,
        options: {
            tags: ['api'],
        }
    },

    {
        method: 'DELETE',
        path: '/songs/{id}',
        handler: handler.deleteSongByIdHandler,
        options: {
            tags: ['api'],
        }
    }
];

module.exports = routes;