const mapDBToModelAlbums = ({
    id,
    name,
    year,
    created_at,
    updated_at,
}) => ({
    id,
    name,
    year,
    createdAt: created_at,
    updatedAt: updated_at,
});

const mapDBToModelSongs = ({
    title,
    year,
    performer,
    genre,
    duration,
    albumId,
    created_at,
    updated_at,
}) => ({
    title,
    year,
    performer,
    genre,
    duration,
    albumId,
    createdAt: created_at,
    updatedAt: updated_at,
})
module.exports = { mapDBToModelAlbums, mapDBToModelSongs };