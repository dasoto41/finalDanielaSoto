const { Router } = require('express');
const { sequelize } = require('../database/connect_mysql.js');
const { Sequelize } = require('sequelize');
const ContenidoModel = require('../database/models/contenido.model.js');
const CategoriasModel = require('../database/models/categoria.model.js');
const GenerosModel = require('../database/models/genero.model.js');
//const RepartoModel = require('../database/models/reparto.model.js');
//const TagsModel = require('../database/models/tag.model.js');
//const TagsDeContenidoModel = require('../database/models/tagsDeContenido.model.js');
//const ActoresModel = require('../database/models/actor.model.js');


const Contenido = ContenidoModel(sequelize, require('sequelize'), require('sequelize').DataTypes);
const Categoria = CategoriasModel(sequelize, require('sequelize'), require('sequelize').DataTypes);
const Genero = GenerosModel(sequelize, require('sequelize'), require('sequelize').DataTypes);
//const Reparto = RepartoModel(sequelize, require('sequelize'), require('sequelize').DataTypes);
//const Tags = TagsModel(sequelize, require('sequelize'), require('sequelize').DataTypes);
//const TagsDeContenido = TagsDeContenidoModel(sequelize, require('sequelize'), require('sequelize').DataTypes);
//const Actores = ActoresModel(sequelize, require('sequelize'), require('sequelize').DataTypes);


const contenidosRouter = Router();

contenidosRouter.get('/contenido', async (req, res) => {
    try {
        const contenidos = await Contenido.findAll( {
            attributes: ['titulo', 'poster', 'trailer', 'resumen'],
            include: [
                { model: Categoria, attributes: ['nombre', 'temporadas'] },
                { model: Genero, attributes: ['nombre'] },
            ],
        });
        res.json(contenidos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

contenidosRouter.get('/contenido/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const contenido = await Contenido.findByPk(id, {
            attributes: ['titulo', 'poster', 'trailer', 'resumen'],
            include: [
                { model: Categoria, attributes: ['nombre', 'temporadas'] },
                { model: Genero, attributes: ['nombre'] },
            ],
        });
        
        res.json(contenido);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

contenidosRouter.get('/contenido/titulo/:titulo', async (req, res) => {
    try {
        const { titulo } = req.params;

        const contenido = await Contenido.findOne({
            where: { titulo: { [Sequelize.Op.like]: `%${titulo}%` } },
            attributes: ['titulo', 'poster', 'trailer', 'resumen'],
            include: [
                { model: Categoria, attributes: ['nombre', 'temporadas'] },
                { model: Genero, attributes: ['nombre'] },
            ],
        });

        res.json(contenido);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

contenidosRouter.get('/contenido/categoria/:categoria', async (req, res) => {
    try {
        const { categoria } = req.params;

        const categoriaId = await Categoria.findOne({
            where: { nombre: { [Sequelize.Op.like]: `%${categoria}%` } },
            attributes: ['id'],
        });
      

        if (!categoriaId) {
            return res.status(404).json({ error: 'No existe la categoria' });
        }

        const contenidos = await Contenido.findAll({
            where: { id_cat: categoriaId.id },
            attributes: ['titulo', 'poster', 'trailer', 'resumen'],
            rejectOnEmpty: true,
        });
        
        res.json(contenidos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

contenidosRouter.get('/contenido/genero/:genero', async (req, res) => {
    try {
        const { genero } = req.params;

        const generoId = await Genero.findOne({
            where: { nombre: { [Sequelize.Op.like]: `%${genero}%` } },
            attributes: ['id'],
        });

        if (!generoId) {
            return res.status(404).json({ error: 'No existe el genero' });
        }

        const contenidos = await Contenido.findAll({
            where: { id_gen: generoId.id },
            attributes: ['titulo', 'poster', 'trailer', 'resumen'],
            rejectOnEmpty: true,
        });

        res.json(contenidos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



module.exports = { contenidosRouter };
