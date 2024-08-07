const { Router } = require("express");
const { sequelize } = require("../database/connect_mysql.js");
const GeneroModel = require("../database/models/genero.model.js");

const Genero = GeneroModel(
  sequelize,
  require("sequelize"),
  require("sequelize").DataTypes
);

const generosRouter = Router();

generosRouter.get("/genero", async (req, res) => {
  try {
    const generos = await Genero.findAll();
    res.json(generos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

generosRouter.get("/genero/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const genero = await Genero.findByPk(id);
    res.json(genero);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

generosRouter.post("/genero", async (req, res) => {
  try {
    const { nombre } = req.body; //desestructuramos de la request de body q nos manden
    const newGenero = await Genero.create({
      nombre: nombre,
    });
    res.status(201).json(newGenero);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
generosRouter.put("/genero/:id", async (req, res) => {
  try {
    const { id } = req.params; //obtengoel id
    const genero = await Genero.findByPk(id);
    genero.set(req.body); //edita lo que venga en el body del put
    await genero.save(); //para que se guarde
    res.status(202).json(genero);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
generosRouter.delete("/genero/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Genero.destroy({ where: { id } });
    res.status(204).end(); //aca va el end, porq no hay .json. y el.json hace el end automatico,sinohay q ponerlo
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = { generosRouter };
