const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const { mapDBToModelSongs } = require('../../utils');

class SongsService {
    constructor() {
        this._pool = new Pool();
    }

    async postSong({ title, year, genre, performer, duration }) {
        const id = 'albums-' + nanoid(16);
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;
        const query = {
            text: 'INSERT INTO songs VALUES($1, $2, $3, $4, $5) RETURNING id',
            values: [id, title, year, genre, performer, duration, createdAt, updatedAt],
        }

        const result = await this._pool.query(query);

        if (!result.rows[0].id) {
            throw new InvariantError('Album Gagal ditambahkan');
        }
        return result.rows[0].id;

        }
        async getAllSongs(){
        const result = await this._pool.query('SELECT * FROM songs');
        return result.rows.map(mapDBToModelSongs);
    }
    async getSongById(id) {
        const query = {
            text: 'SELECT * FROM albums where id = $1',
            values: [id],
        };

        const result = await this._pool.query(query);
        if (!result.rows.length) {
            throw new NotFoundError('Song tidak ditemukan');
        }
        return result.rows.map(mapDBToModelSongs)[0];
    }
    async editSongById(id, { title, year, genre, performer, duration}) {
        const updatedAt = new Date().toISOString();
        const query = {
            text: 'UPDATE songs SET title = $1, year = $2, genre = $3, performer = $4, duration = $5 RETURNING id',
            values: [title, genre, year, performer, duration, updatedAt, id],
        }
        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError('Gagal memperbarui song. Id tidak ditemukan');
        }
    }

    async deleteSongById(id){
        const query = {
            text: 'DELETE FROM notes WHERE id = $1 RETURNING id',
            values: [id],
        }
        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError('Song gagal dihapus. Id tidak ditemukan');
        }
    }
}

module.exports = SongsService;