const { Router } = require("express");
const { sequelize } = require("../database/connect_mysql.js");
const TagModel = require("../database/models/tag.model.js");
const tagsDeContenidoModel = require("../database/models/tagsDeContenido.model.js");
const ContenidoModel = require("../database/models/contenido.model.js");

const Contenido = ContenidoModel(
  sequelize,
  require("sequelize"),
  require("sequelize").DataTypes
);
const tagsDeContenido = tagsDeContenidoModel(
  sequelize,
  require("sequelize"),
  require("sequelize").DataTypes
);

const tagsDeContenidoRouter = Router();

// Obtener todas las asociaciones
tagsDeContenidoRouter.get("/tagsDeContenido", async (req, res) => {
  try {
    const listaDeTagsDeContenido = await tagsDeContenido.findAll();
    res.json(listaDeTagsDeContenido);
  } catch (error) {
    console.error("Error al obtener las asociaciones:", error);
    res.status(500).json({ error: "Error al obtener las asociaciones" });
  }
});

// Obtener una asociación específica
tagsDeContenidoRouter.get(
  "/tagsDeContenido/:tagId/:contenidoId",
  async (req, res) => {
    try {
      const { tagId, contenidoId } = req.params;
      const asociacion = await tagsDeContenido.findOne({
        where: {
          tag_id: tagId,
          contenido_id: contenidoId,
        },
      });

      if (asociacion) {
        res.json(asociacion);
      } else {
        res.status(404).json({ error: "Asociación no encontrada" });
      }
    } catch (error) {
      console.error("Error al obtener la asociación:", error);
      res.status(500).json({ error: "Error al obtener la asociación" });
    }
  }
);

// Crear una nueva asociación
tagsDeContenidoRouter.post("/tagsDeContenido", async (req, res) => {
  const { tag_id, contenido_id } = req.body;
  try {
    const nuevaAsociacion = await tagsDeContenido.create({
      tag_id,
      contenido_id,
    });
    res.status(201).json(nuevaAsociacion);
  } catch (error) {
    console.error("Error al crear la asociación:", error);
    res.status(500).json({ error: "Error al crear la asociación" });
  }
});

// Actualizar una asociación existente
tagsDeContenidoRouter.put(
  "/tagsDeContenido/:tagId/:contenidoId",
  async (req, res) => {
    const { tagId, contenidoId } = req.params;
    const { newTagId, newContenidoId } = req.body;
    try {
      const asociacion = await tagsDeContenido.findOne({
        where: {
          tag_id: tagId,
          contenido_id: contenidoId,
        },
      });

      if (asociacion) {
        asociacion.tag_id = newTagId || asociacion.tag_id;
        asociacion.contenido_id = newContenidoId || asociacion.contenido_id;
        await asociacion.save();
        res.json(asociacion);
      } else {
        res.status(404).json({ error: "Asociación no encontrada" });
      }
    } catch (error) {
      console.error("Error al actualizar la asociación:", error);
      res.status(500).json({ error: "Error al actualizar la asociación" });
    }
  }
);

// Eliminar una asociación
tagsDeContenidoRouter.delete(
  "/tagsDeContenido/:tagId/:contenidoId",
  async (req, res) => {
    const { tagId, contenidoId } = req.params;
    try {
      const asociacion = await tagsDeContenido.findOne({
        where: {
          tag_id: tagId,
          contenido_id: contenidoId,
        },
      });

      if (asociacion) {
        await asociacion.destroy();
        res.status(204).send();
      } else {
        res.status(404).json({ error: "Asociación no encontrada" });
      }
    } catch (error) {
      console.error("Error al eliminar la asociación:", error);
      res.status(500).json({ error: "Error al eliminar la asociación" });
    }
  }
);

module.exports = { tagsDeContenidoRouter };
