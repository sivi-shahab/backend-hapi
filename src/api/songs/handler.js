const ClientError = require('./../../exceptions/ClientError');
class SongsHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;

        this.postSongHandler = this.postSongHandler.bind(this);
        this.getSongsHandler = this.getSongsHandler.bind(this);
        this.getSongByIdHandler = this.getSongByIdHandler.bind(this);
        this.putSongByIdHandler = this.putSongByIdHandler.bind(this);
        this.deleteSongByIdHandler = this.deleteSongByIdHandler.bind(this);

    }

    postSongHandler(request, h) {
        try {
            this._validator.validateSongPayload(request.payload);
            const { title, year, performer, genre, duration } = request.payload;

            const songId = this._service.postSong({ title, year, performer, genre, duration });

            const response = h.response({
                status: "success",
                message: `New Song with title ${title} and year ${year}, was added`,
                data: {
                    songId,
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
    }
}
getSongsHandler() {
    const songs = this._service.getAllSongs().map(song => ({
        id: song.id,
        title: song.title,
        performer: song.performer
    }));
    return {
        status: 'success',
        data: {
            songs,
        }
    };
}
getSongByIdHandler(request, h) {
    try {
        const { id } = request.params;
        const song = this._service.getSongById(id);
        return {
            status: 'success',
            data: {
                song,
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

    }
}

putSongByIdHandler(request, h) {

    try {
        this._validator.validateSongPayload(request.payload);
        const { id } = request.params;

        this._service.editSongById(id, request.payload);
        
        return {
            status: 'success',
            message: 'Songs updated successfully',
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

        
    }
}

deleteSongByIdHandler(request, h) {
    try {
        const { id } = request.params;
        this._service.deleteSongById(id);
        return {
            status: 'success',
            message: 'Songs deleted successfully',
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

}
}
}

module.exports = SongsHandler;