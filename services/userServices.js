const pool = require("../config/db");

const userService = {
  addUser: async (user) => {
    return new Promise((resolve, reject) => {
      const insertQuery =
        "INSERT INTO user (`name`, `dob`, `country`, `image`, `createdAt`) VALUES (?, ?, ?, ?, ?)";
      const createdAt = new Date().toISOString().slice(0, 19).replace("T", " ");
      const values = [user.name, user.dob, user.country, user.image, createdAt];
      console.log("Values", values);
      pool.query(insertQuery, values, (err, data) => {
        if (err) {
          reject(err);
        } else {
          const newUser = {
            id: data.insertId,
            ...user,
            createdAt: values[4], // Use the createdAt value from values array
          };
          resolve(newUser);
        }
      });
    });
  },
  getUsersList: async (filters) => {
    return new Promise((resolve, reject) => {
      let query = "SELECT * FROM user";
      let conditions = [];

      if (filters && Array.isArray(filters)) {
        conditions = filters
          .map((filter) => {
            switch (filter) {
              case "date":
                return "createdAt DESC";
              case "name":
                return "name ASC";
              default:
                return null;
            }
          })
          .filter((condition) => condition !== null);
      }

      if (conditions.length > 0) {
        const orderBy = "ORDER BY " + conditions.join(", ");
        query += ` ${orderBy}`;
      }
       console.log("query", query);
      pool.query(query, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  },
};

module.exports = userService;
