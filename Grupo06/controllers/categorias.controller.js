const { Router } = require("express");
const { sequelize } = require("../database/connect_mysql.js");
const CategoriaModel = require("../database/models/categoria.model.js");

const Categoria = CategoriaModel(
  sequelize,
  require("sequelize"),
  require("sequelize").DataTypes
);

const categoriasRouter = Router();

categoriasRouter.get("/categoria", async (req, res) => {
  try {
    const categorias = await Categoria.findAll();
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

categoriasRouter.get("/categoria/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const categoria = await Categoria.findByPk(id);
    res.json(categoria);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

categoriasRouter.post("/categoria", async (req, res) => {
  try {
    const { nombre, temporadas } = req.body; //desestructuramos de la request de body q nos manden
    const newCategoria = await Categoria.create({
      nombre: nombre,
      temporadas: temporadas,
    });
    res.status(201).json(newCategoria);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
categoriasRouter.put("/categoria/:id", async (req, res) => {
  try {
    const { id } = req.params; //obtengoel id
    const categoria = await Categoria.findByPk(id);
    categoria.set(req.body); //edita lo que venga en el body del put
    await categoria.save(); //para que se guarde
    res.status(202).json(categoria);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
categoriasRouter.delete("/categoria/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Categoria.destroy({ where: { id } });
    res.status(204).end(); //aca va el end, porq no hay .json. y el.json hace el end automatico,sinohay q ponerlo
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = { categoriasRouter };
