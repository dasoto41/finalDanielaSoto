module.exports = (sequelize, Sequelize, DataTypes) => {
  const Genero = sequelize.define(
    "generos",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      timestamps: false,
      underscored: true,
    }
  );
  return Genero;
};
