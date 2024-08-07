module.exports = (sequelize, Sequelize, DataTypes) => {
  const Categoria = require("./categoria.model")(
    sequelize,
    Sequelize,
    DataTypes
  );
  const Genero = require("./genero.model")(sequelize, Sequelize, DataTypes);
  const Contenido = sequelize.define(
    "contenidos",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      titulo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      poster: {
        type: DataTypes.STRING,
      },
      trailer: {
        type: DataTypes.STRING,
      },
      resumen: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      id_cat: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      id_gen: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      underscored: true,
    }
  );

  Categoria.hasMany(Contenido, { foreignKey: "id_cat" });
  Genero.hasMany(Contenido, { foreignKey: "id_gen" });
  Contenido.belongsTo(Categoria, { foreignKey: "id_cat", target_key: "id" });
  Contenido.belongsTo(Genero, { foreignKey: "id_gen", target_key: "id" });

  return Contenido;
};
