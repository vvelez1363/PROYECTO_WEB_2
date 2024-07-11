const Todo = require('../models/todoModel');

const home = async (req, res) => {
    try {
        const result = await Todo.findAll({
            order: [
                ['id', 'ASC']
            ]
        });
        res.render('home', { user: req.user, todos: result });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const index = async (req, res) => {
    try {
        const result = await Todo.findAll({
            order: [
                ['id', 'ASC']
            ]
        });
        res.render('todos/index', { todos: result, user: req.user });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const store = async (req, res) => {
    try {
        const { title, completed } = req.body;
        await Todo.create({ title, completed: completed == 'on' ? true : false });
        res.redirect('/todospanel');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const show = async (req, res) => {
    try {
        const result = await Todo.findByPk(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const update = async (req, res) => {
    try {
        const { title, completed } = req.body;
        const updatedRows = await Todo.update(
            { title, completed: completed === 'on' ? true : false },
            { where: { id: req.params.id } }
        );
        if (updatedRows[0] === 0) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }
        res.redirect('/todospanel');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteTodo = async (req, res) => {
    try {
        const deletedRows = await Todo.destroy({ where: { id: req.params.id } });
        if (deletedRows === 0) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }
        res.json({ message: 'Tarea eliminada' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    home, index, store, show, update, deleteTodo
}