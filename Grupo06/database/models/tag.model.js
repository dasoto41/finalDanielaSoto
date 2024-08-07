module.exports = (sequelize, Sequelize, DataTypes) => {
    const Tag = sequelize.define('tags', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: false,
        underscored: true,
    });
    return Tag;
}