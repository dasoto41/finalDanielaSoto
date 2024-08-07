module.exports = (sequelize, Sequelize, DataTypes) => {
  const Tags = require("./tag.model")(sequelize, Sequelize, DataTypes);
  const Contenido = require("./contenido.model")(
    sequelize,
    Sequelize,
    DataTypes
  );
  const TagsDeContenido = sequelize.define(
    "tags_de_contenidos",
    {
      contenido_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      tag_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      underscored: true,
    }
  );

  Tags.belongsToMany(Contenido, {
    through: TagsDeContenido,
    foreignKey: "tag_id",
    otherKey: "contenido_id",
  });
  Contenido.belongsToMany(Tags, {
    through: TagsDeContenido,
    foreignKey: "contenido_id",
    otherKey: "tag_id",
  });

  /* Tags.sync().then(() => {
        console.log('Tabla de tags sincronizada');
    });
    Contenido.sync().then(() => {
        console.log('Tabla de contenidos sincronizada');
    });
    TagsDeContenido.sync().then(() => {
        console.log('Tabla de tags de contenidos sincronizada');
    });*/

  return TagsDeContenido;
};
