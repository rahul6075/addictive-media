const pool = require("../config/db");

const userService = {
  addUser: async (user) => {
    return new Promise((resolve, reject) => {
      const insertQuery =
        "INSERT INTO user (`name`, `dob`, `country`, `image`, `createdAt`) VALUES (?, ?, ?, ?, ?)";
      const createdAt = new Date().toISOString().slice(0, 19).replace("T", " ");

      // Create an array of values with null values for fields that can be null
      const values = [
        user.name || null,
        user.dob || null,
        user.country || null,
        user.image || null,
        createdAt,
      ];

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
  updateUser: async (userId, updatedUser) => {
    return new Promise((resolve, reject) => {
      const updateQuery =
        "UPDATE user SET `name` = ?, `dob` = ?, `country` = ?, `image` = ? WHERE `id` = ?";
      
      // Create an array of values with null values for fields that can be null
      const values = [
        updatedUser.name || null,
        updatedUser.dob || null,
        updatedUser.country || null,
        updatedUser.image || null,
        userId,
      ];

      pool.query(updateQuery, values, (err, data) => {
        if (err) {
          reject(err);
        } else if (data.affectedRows === 0) {
          resolve(null); // User not found
        } else {
          const updatedUserData = {
            id: userId,
            ...updatedUser,
          };
          resolve(updatedUserData);
        }
      });
    });
  },
  getUsersList: async (filters) => {
    return new Promise((resolve, reject) => {
      let query = "SELECT * FROM user";
      let conditions = [];
    if (filters && Array.isArray(filters) && filters.length > 0) {
      conditions = filters
        .map((filter) => {
          switch (filter) {
            case "date":
              return "createdAt ASC";
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
      pool.query(query, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  },
  getCoutriesList: async (filters) => {
    return new Promise((resolve, reject) => {
      let query = "SELECT * FROM countries";
      if (filters) {
        query += ` WHERE name LIKE '%${filters}%'`;
      }
      pool.query(query, (err, data) => {
        if (err) {
          reject(err);
        } else {
          const countriesList = data.map(item => ({
            value: item.code,
            label: item.name
          }));
          resolve(countriesList);
        }
      });
    });
  },
  deleteUserById : async (userId) => {
    return new Promise((resolve, reject) => {
      const deleteQuery = "DELETE FROM user WHERE id = ?";
      pool.query(deleteQuery, [userId], (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data.affectedRows > 0);
        }
      });
    });
  }
};

module.exports = userService;
