const ClientError = require('../../exceptions/ClientError');
class AlbumsHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;
        //this._songsService = songsService;

        this.postAlbumHandler = this.postAlbumHandler.bind(this);
        this.getAlbumsHandler = this.getAlbumsHandler.bind(this);
        this.getAlbumByIdHandler = this.getAlbumByIdHandler.bind(this);
        this.putAlbumByIdHandler = this.putAlbumByIdHandler.bind(this);
        this.deleteAlbumByIdHandler = this.deleteAlbumByIdHandler.bind(this);
    }

    postAlbumHandler(request, h) {
        try {
            this._validator.validateAlbumPayload(request.payload);
            const { name, year} = request.payload;

            const albumId = this._service.postAlbum({ name, year});

            const response = h.response({
                status: "success",
                message: `New album with the name ${name} and year ${year}, was added`,
                data: {
                    albumId,
                },

            });
            response.code(201);
            return response;
        } catch (error) {
            if (error instanceof ClientError) {
                const response = h.response({
                    status: 'fail',
                    message: error.message,
                });
                response.code(error.statusCode);
                return response;
            }
            //Server ERROR!
            // const response = h.response({
            //     status: 'error',
            //     message: 'Maaf, terjadi kesalahan pada server kami.',
            // });
            // response.code(500);
            // console.error(error);
            // return response;
    }
}
getAlbumsHandler() {
    const albums = this._service.getAlbums();
    return {
        status: 'success',
        data: {
        albums,
    },
    };
}

    getAlbumByIdHandler(request, h) {

        try {
        const { id } = request.params;
        const album = this._service.getAlbumById(id);
//        const songs = this._songsService.getSongById(id);
        return {
            status: 'success',
            data: {
                album,
//                songs,

            },
        };

    } catch (error) {
            if (error instanceof ClientError) {
                const response = h.response({
                    status: 'fail',
                    message: error.message,
                });
                response.code(error.statusCode);
                return response;
            }
            // Server ERROR!
            // const response = h.response({
            //     status: 'error',
            //     message: 'Maaf, terjadi kesalahan pada server kami.',
            // });
            // response.code(500);
            // console.error(error);
            // return response;
}
    }
    putAlbumByIdHandler(request, h) {
        try {
            this._validator.validateAlbumPayload(request.payload);
            const { id } = request.params;
            this._service.editAlbumById(id, request.payload);
            return {
                status: 'success',
                message: 'Album berhasil diperbarui',
            };
        } catch (error) {
            if (error instanceof ClientError) {
                const response = h.response({
                    status: 'fail',
                    message: error.message,
                });
                response.code(error.statusCode);
                return response;

            }
            // Server ERROR!
            // const response = h.response({
            //     status: 'error',
            //     message: 'Maaf, terjadi kesalahan pada server kami.',
            // });
            // response.code(500);
            // console.error(error);
            // return response;


    }
}

    deleteAlbumByIdHandler(request, h) {
        try {
            const { id } = request.params;
            this._service.deleteAlbumById(id);
            return {
                status: 'success',
                message: 'Album deleted successfully!',
            }
        } catch (error) {
            if (error instanceof ClientError) {
                const response = h.response({
                    status: 'fail',
                    message: error.message,
                });
                response.code(error.statusCode);
                return response;

            }
            // Server ERROR!
            // const response = h.response({
            //     status: 'error',
            //     message: 'Maaf, terjadi kesalahan pada server kami.',
            // });
            // response.code(500);
            // console.error(error);
            // return response;
    }



    
}
}

module.exports = AlbumsHandler;