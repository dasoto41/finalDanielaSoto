module.exports = (sequelize, Sequelize, DataTypes) => {
  const Categoria = sequelize.define(
    "categorias",
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
      },
      temporadas: {
        type: DataTypes.INTEGER,
      },
    },
    {
      timestamps: false,
      underscored: true,
    }
  );

  return Categoria;
};
