module.exports = (sequelize, dataTypes) => {

    let alias = 'Actores';

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: {
            type: dataTypes.STRING
        },
        last_name: {
            type: dataTypes.STRING
        },
        rating: {
            type: dataTypes.DOUBLE
        },
        favorite_movie_id: {
            type: dataTypes.INTEGER
        }
    };
    
    let config = {
        tableName: 'actors',
        timestamps: false
    }

    const Actor = sequelize.define(alias, cols, config);

    //relaciones de tablas
    Actor.associate = function(models) {
        Actor.belongsToMany(models.Peliculas, {
            as: 'peliculas',
            through: 'actor_movie',
            foreignKey: 'actor_id',
            otherKey: 'movie_id',
            timestamps: false
        }) 
    }

    return Actor;
}