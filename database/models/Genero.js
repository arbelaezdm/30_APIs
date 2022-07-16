module.exports = (sequelize, dataTypes) => {

    let alias = 'Genero';

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING
        },
        ranking: {
            type: dataTypes.INTEGER
        },
        active: {
            type: dataTypes.BOOLEAN
        }
    };
    
    let config = {
        tableName: 'genres',
        timestamps: false
    }

    const Genero = sequelize.define(alias, cols, config);

    //relaciones de tablas
    Genero.associate = function(models) {
        Genero.hasMany(models.Peliculas, {
            as: 'pelicula',
            foreignKey: 'genre_id'
        })
    }

    return Genero;
}