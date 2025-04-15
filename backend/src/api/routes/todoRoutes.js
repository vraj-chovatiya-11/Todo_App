const express = require('express');
const routes = express.Router();
const todoController = require('../controllers/todoController');
const auth = require('../../utils/auth');

routes.use(auth);

routes.post('/', todoController.createTodo);
routes.get('/', todoController.getAllTodos);
routes.delete('/:id', todoController.deleteTodo);
routes.put('/:id', todoController.updateTodo);
// routes.get('/', todoController.countTodos);

module.exports = routes;