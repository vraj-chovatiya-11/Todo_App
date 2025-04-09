const { pool } = require("../../config/db");

class Todo {
  static async findbyId(userId) {
    try {
      const [result] = await pool.query("SELECT * from test where id = ?", [
        userId,
      ]);
      if (result.length > 0) {
        return true;
      }
      throw new Error();
    } catch (error) {
      console.log("user not found..!");
      return false;
    }
  }

  static async create(userId, description) {
    try {
      const [result] = await pool.query(
        "INSERT INTO todos (user_id, description) VALUES (?, ?)",
        [userId, description]
      );
      return result.insertId;
    } catch (error) {
      console.log("User not Found Error");
      return null;
    }
  }

  static async getById(TodoId, UserId) {
    try {
      const [rows] = await pool.query(
        "SELECT * FROM todos WHERE id = ?, user_id = ?",
        [TodoId, UserId]
      );
      return rows[0];
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getTodoId(todoId) {
    try {
      const [result] = await pool.query(
        "Select * from todos where id = ?",
        todoId
      );
      return result[0];
    } catch (error) {
      throw new Error(error);
    }
  }

  // Get all todos for a specific user
  static async getAllByUserId(userId) {
    try {
      const [rows] = await pool.query(
        "SELECT * FROM todos WHERE user_id = ? ORDER BY created_at DESC",
        [userId]
      );
      return rows;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async delete(todoId, userId) {
    try {
      const [result] = await pool.query(
        "DELETE FROM todos WHERE id = ? and user_id = ?",
        [todoId, userId]
      );
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async updateTodo({ todoId, description, userId }) {
    try {
      const [result] = await pool.query(
        "UPDATE todos set description = ? where id = ? and user_id = ?",
        [description, todoId, userId]
      );
      if (result.affectedRows === 0) {
        throw new Error("Todo not found or not authorized to update");
      }
      return result;
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = {
  Todo,
};
