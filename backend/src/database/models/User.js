const { pool } = require("../../config/db");
const bcrypt = require('bcryptjs');

class User {
    static async findById(id){
        try{
            const [rows] = await pool.query('SELECT * from test WHERE id = ?', [id]);
            return rows[0];
        }catch(err){
            throw new Error(err);
        }
    }

    static async findByEmail(email){
        try{
            const [rows] = await pool.query('SELECT * from test WHERE email = ?', [email]);
            return rows[0];
        }catch(error){
            throw new Error(error);
            // return null;
        }
    }

    static async findByUsername(username){
        try{
            const [rows] = await pool.query('SELECT * from test WHERE username = ?', [username]);
            return rows[0];
        }catch(error){
            throw new Error(error);
        }
    }

    static async create(userData){
        try{
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(userData.password, salt);
            // insert user into database
            const [result] = await pool.query(
                'INSERT INTO test (username, email, password, profile_image) values (?, ?, ?, ?)',
                [userData.username, userData.email, hashedPassword, userData.profileImage || null]
            );
            
            return result.insertId;
        }catch(error){
            // throw new Error(error);
            return {status: 500, message: error.message}
            // return error.message;
        }
    }

    static async password(email){
        try{
            const [row] = await pool.query('SELECT password, id from test WHERE email = ?', [email]);
            return row[0];
        }catch(err){
            console.log("Can not find user email or user not exists..");
            throw new Error(err);
        }
    }

    static async comparePassword(password, hashedPassword){
        return await bcrypt.compare(password, hashedPassword);
    }

    static async update(user){
        console.log("what user", user);
        try{
            console.log("inside try")
            const [result] = await pool.query('UPDATE test SET username = ?, email = ? WHERE id = ?', [user.username, user.email, user.userId]);
            return result.affectedRows;       
        }catch(error){
            console.log("db error");
            throw new Error(error);
        }
    }

    static async deleteUser(user){
        try{
            const [result] = await pool.query("DELETE FROM test where id = ?", [user]);
            return result.affectedRows;
        }catch(err){
            throw new Error(err);
        }
    }
}

module.exports = {
    User
};