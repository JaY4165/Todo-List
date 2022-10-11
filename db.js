const mysql = require("mysql2");
const dotenv = require("dotenv");
const { json } = require("body-parser");

dotenv.config();

// const connection = mysql.createConnection({
//   host: process.env.MYSQL_HOST,
//   user: process.env.MYSQL_USER,
//   password: process.env.MYSQL_PASSWORD,
//   database: process.env.MYSQL_DATABASE,
// });

// function getAllTasks() {
//   connection.execute("SELECT * FROM todo", (err, rows, fields) => {
//     if (!err) {
//       return rows;
//     } else {
//       console.error(err);
//     }
//   });
// }

// function getAllTasks() {
//   try {
//     connection.execute(`SELECT * FROM todo`, (err, rows) => {
//       return rows;
//     });
//   } catch (error) {
//     console.log(error);
//   }
// }

// function getTaskById(id) {
//   connection.execute(`SELECT * FROM todo WHERE id = ?`, [id], (err, rows) => {
//     if (!err) {
//       return rows;
//     } else {
//       console.error(err);
//     }
//   });
// }

// function insertTask(task) {
//   connection.execute(
//     `INSERT INTO todo (task) VALUES (?)`,
//     [task],
//     (err, rows) => {
//       if (!err) {
//         console.log("New todo innserted");
//         console.log(rows);
//       } else {
//         console.error(err);
//       }
//     }
//   );
// }

// module.exports = { getAllTasks, getTaskById, insertTask };

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

async function getAllData() {
  try {
    const [result] = await pool.query(`SELECT * FROM todo`);
    return result;
  } catch (error) {
    console.log(error);
  }
}

async function getDataOfId(id) {
  try {
    const [result] = await pool.query(`SELECT * FROM todo WHERE id = ?`, [id]);
    return result;
  } catch (error) {
    console.log(error);
  }
}

async function insertData(taskToInsert) {
  try {
    const [result] = await pool.query(`INSERT INTO todo (task) VALUES (?)`, [
      taskToInsert,
    ]);
    const id = await result.insertId;
    return `Inserted with id = ${id}`;
  } catch (error) {
    console.error(error);
  }
}

async function updateDataForID(forId, updatedTask) {
  try {
    const [result] = await pool.query(`UPDATE todo SET task = ? WHERE id = ?`, [
      updatedTask,
      forId,
    ]);
    const resId = await result.insertId;
    return await getDataOfId(resId);
  } catch (error) {
    console.error(error);
  }
}

async function deleteDataForId(delId) {
  try {
    const [result] = await pool.query(`DELETE FROM todo WHERE id = ?`, [delId]);
    if (result.affectedRows == 0) {
      return `${delId} not present to delete`;
    } else {
      const alt1 = await pool.query(`ALTER TABLE todo DROP COLUMN id`);
      const alt2 = await pool.query(
        `ALTER TABLE todo ADD COLUMN id int(255) NOT NULL PRIMARY KEY AUTO_INCREMENT FIRST`
      );

      console.log(`Deleted with id = ${delId}`);
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getAllData,
  getDataOfId,
  insertData,
  updateDataForID,
  deleteDataForId,
};
