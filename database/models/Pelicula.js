module.exports = (sequelize, dataTypes) => {

    let alias = 'Peliculas';

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: dataTypes.STRING
        },
        length: {
            type: dataTypes.INTEGER
        },
        rating: {
            type: dataTypes.DOUBLE
        },
        awards: {
            type: dataTypes.INTEGER
        },
        genre_id: {
            type: dataTypes.INTEGER
        },
        release_date: {
            type: dataTypes.DATE
        }
    };
    
    let config = {
        tableName: 'movies',
        timestamps: false
    }

    const Pelicula = sequelize.define(alias, cols, config);

    //relaciones de tablas
    Pelicula.associate = function(models) {
        Pelicula.belongsTo(models.Genero, {
            as: 'generos',
            foreignKey: 'genre_id'
        })

        Pelicula.belongsToMany(models.Actores, {
            as: 'actores',
            through: 'actor_movie',
            foreignKey: 'movie_id',
            otherKey: 'actor_id',
            timestamps: false
        })
    }

    return Pelicula;
}