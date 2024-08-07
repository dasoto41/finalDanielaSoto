const { Router } = require("express");
const { sequelize } = require("../database/connect_mysql.js");
const TagModel = require("../database/models/Tag.model.js");

const tag = TagModel(
  sequelize,
  require("sequelize"),
  require("sequelize").DataTypes
);

const tagsRouter = Router();

tagsRouter.get("/tag", async (req, res) => {
  try {
    const tags = await tag.findAll();
    res.json(tags);
  } catch (error) {
    res.status(500).json;
  }
});

tagsRouter.get("/tag/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const tagById = await tag.findByPk(id);
    res.json(tagById);
  } catch (error) {
    res.status(500).json;
  }
});

tagsRouter.post("/tag", async (req, res) => {
  try {
    const { nombre } = req.body;
    const newTag = await tag.create({ nombre });
    res.status(201).json(newTag);
  } catch (error) {
    res.status(500).json;
  }
});

tagsRouter.put("/tag/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const tagNewById = await tag.findByPk(id);
    tagNewById.set(req.body);
    await tagNewById.save();
    res.status(202).json(tagNewById);
  } catch (error) {
    res.status(500).json;
  }
});

tagsRouter.delete("/tag/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await tag.destroy({ where: { id } });
    res.status(204).end();
  } catch (error) {
    res.status(500).json;
  }
});

module.exports = { tagsRouter };
