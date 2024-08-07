module.exports = (sequelize, Sequelize, DataTypes) => {
    const Actor = require('./actor.model')(sequelize, Sequelize, DataTypes);
    const Contenido = require('./contenido.model')(sequelize, Sequelize, DataTypes);
    const Reparto = sequelize.define('reparto_de_contenidos', {
        contenido_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        actor_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, {
        timestamps: false,
        underscored: true,
    });
    
    Actor.belongsToMany(Contenido, { 
        through: Reparto,
        foreignKey: 'actor_id',
        otherKey: 'contenido_id'
    });
    Contenido.belongsToMany(Actor, {
        through: Reparto,
        foreignKey: 'contenido_id',
        otherKey: 'actor_id'
    });

    Actor.sync().then(() => {
        console.log('Tabla de actores sincronizada');
    });
    Contenido.sync().then(() => {
        console.log('Tabla de contenidos sincronizada');
    });
    Reparto.sync().then(() => {
        console.log('Tabla de reparto sincronizada');
    }); 

    return Reparto;
}