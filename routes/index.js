const express = require('express')
const todosRouter = require('./todos/todos.router')
const recetasRouter = require('./receta/receta.router')
const authRouter = require('./users/auth.router')

function routerTodos(app){
    const router = express.Router()
    app.use('/', router) 
    router.use('/todospanel', todosRouter)
    router.use('/auth', authRouter)
    router.use('/recetas', recetasRouter)
}

module.exports = routerTodos