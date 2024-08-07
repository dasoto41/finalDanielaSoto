const { Router } = require("express");
const { sequelize } = require("../database/connect_mysql.js");
const ActorModel = require("../database/models/actor.model.js");

const Actor = ActorModel(
  sequelize,
  require("sequelize"),
  require("sequelize").DataTypes
);

const actorsRouter = Router();

// Obtener todos los actores
actorsRouter.get("/actor", async (req, res) => {
  try {
    const actores = await Actor.findAll();
    res.json(actores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener un actor por ID
actorsRouter.get("/actor/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const actor = await Actor.findByPk(id);
    if (actor) {
      res.json(actor);
    } else {
      res.status(404).json({ error: "Actor not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear un nuevo actor
actorsRouter.post("/actor", async (req, res) => {
  try {
    const { nombre } = req.body;
    const newActor = await Actor.create({ nombre });
    res.status(201).json(newActor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar un actor por ID
actorsRouter.put("/actor/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const actor = await Actor.findByPk(id);
    if (actor) {
      actor.set(req.body);
      await actor.save();
      res.status(202).json(actor);
    } else {
      res.status(404).json({ error: "Actor not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar un actor por ID
actorsRouter.delete("/actor/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Actor.destroy({ where: { id } });
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: "Actor not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = { actorsRouter };
