const { nanoid } = require("nanoid");
const InvariantError = require('./../../exceptions/InvariantError');
const NotFoundError = require('./../../exceptions/NotFoundError');
class SongServices {

    constructor() {
        this._songs = [];

    }

    postSong({ title, year, genre, performer, duration, albumId }) {
        const id = "song-" + nanoid(16);
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;

        const newSong = {
            id, title, year, genre, performer, duration, albumId, createdAt, updatedAt
        };

        this._songs.push(newSong);

        const isSuccess = this._songs.filter((song) => song.id === id).length > 0;

        if (!isSuccess) {
            throw new InvariantError("Song gagal ditambahkan");
        }

        return id;
    }
    getAllSongs() {
        return this._songs;

    }

    getSongById(id) {
        const song = this._songs.filter((song) => song.id === id)[0];
        if(!song) {
            throw new NotFoundError(`Data dengan ID ${id} tidak ditemukan`);
        }

        return song;
    }

    editSongById( id, { title, year, genre, performer, duration, albumId }) {
        const index = this._songs.findIndex((song) => song.id === id);
        const updatedAt = new Date().toISOString();

        if (index === -1) {
            throw new NotFoundError(`Data dengan ID tidak ditemukan`);
        }

        this._songs[index] = {
            ...this._songs[index],
            title,
            year,
            genre,
            performer,
            duration,
            albumId,
            updatedAt
        };
    }
    deleteSongById(id){
        const index = this._songs.findIndex((album) => album.id === id);

        if (index === -1) {
            throw new NotFoundError('Gagal menghapus data. Id tidak ditemukan');
        }

        this._songs.splice(index, 1);
    }

}

module.exports = SongServices;