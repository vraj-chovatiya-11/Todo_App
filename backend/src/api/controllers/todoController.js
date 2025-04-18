const { Todo } = require("../../database/models/todoModel");

exports.createTodo = async (req, res) => {
  try {
    const {title} = req.body;
    const {description} = req.body;
    const userId = req.user;

    // create todo

    const todoId = await Todo.create(userId, title, description);

    if (typeof todoId === "number") {
      res.status(201).json({ message: "Todo created successfully" });
    } else {
      res.status(404).json({ message: "user not found" });
    }
  } catch (error) {
    console.log("Todo creating Error : ", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get all todos for current user
exports.getAllTodos = async (req, res) => {
  try {
    const id = req.user;
    // let todos;

    let todos = await Todo.getAllByUserId(id);

    res.json(todos);
  } catch (error) {
    console.error("Get todos error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// exports.countTodos = async (req, res) => {
//   try{
//     const id = req.user;

//   }catch(error){
//     console.log("Error on count todos", error);
//   }
// }

exports.deleteTodo = async (req, res) => {
  try {
    const TodoId = req.params.id;   
    const userId = req.user;
    
    const isExistTodoId = await Todo.getTodoId(TodoId);

    if (!isExistTodoId) {
      res.status(404).json({ message: "Todo not found.!" });
    }
    // Delete todo
    const deleted = await Todo.delete(TodoId, userId);
    if (!deleted) {
      res.status(400).json({ message: "Todo not found for this user" });
    }else{
        res.status(200).json({ message: "Todo Deleted Successfully..." });
    }

  } catch (error) {
    console.log("Delete todo error.");
    res.status(500).json({ message: "Server error" });
  }
};

// Update a todo
exports.updateTodo = async (req, res) => {
  try{
  const todoId = req.params.id;
  const description = req.body.description;
  const completed = req.body.completed;
  const userId = req.user;

  const updatedTodo = await Todo.updateTodo({todoId, description, completed, userId});
  
  if(updatedTodo.affectedRows > 0){
      return res.status(200).json({message: 'Todo updated successfully'});
  }else{
      return res.status(404).json({message: 'Todo not found or not authorized to update'});
  }
  }catch(err){
      console.log("Error on updating todo", err);
      return res.status(500).json({message: 'Server error'});
  }
}
