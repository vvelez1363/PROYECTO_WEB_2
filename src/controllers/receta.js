const Receta = require('../models/recetaModel');
const Todo = require('../models/todoModel');

const index = async (req, res) => {
    try {
        const recetas = await Receta.findAll({
            order: [['id', 'ASC']]
        });

        const todos = await Todo.findAll({
            order: [['id', 'ASC']],
            include: [{ model: Receta }] // Asegúrate de incluir la relación con recetas si existe
        });

        res.render('recetas/index', { recetas, todos, user: req.user });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const store = async (req, res) => {
    try {
        const { nombre, descripcion, tiempo_preparacion, dificultad } = req.body;
        await Receta.create({ nombre, descripcion, tiempo_preparacion, dificultad });
        res.redirect('/recetas');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const show = async (req, res) => {
    try {
        const receta = await Receta.findByPk(req.params.id);
        if (!receta) {
            return res.status(404).json({ message: 'Receta no encontrada' });
        }
        res.json(receta);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const update = async (req, res) => {
    try {
        const { nombre, descripcion, tiempo_preparacion, dificultad } = req.body;
        const [updatedRows] = await Receta.update(
            { nombre, descripcion, tiempo_preparacion, dificultad },
            { where: { id: req.params.id } }
        );
        if (updatedRows === 0) {
            return res.status(404).json({ message: 'Receta no encontrada' });
        }
        res.redirect('/recetas');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteReceta = async (req, res) => {
    try {
        const deletedRows = await Receta.destroy({ where: { id: req.params.id } });
        if (deletedRows === 0) {
            return res.status(404).json({ message: 'Receta no encontrada' });
        }
        res.json({ message: 'Receta eliminada' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    index,
    store,
    show,
    update,
    deleteReceta
};