
const userService = require("../services/userServices");
const userController = {
  addUser: async (req, res) => {
    try {
      const user = {
        name: req.body.name,
        dob: req.body.dob,
        country: req.body.country,
        image: req.body.image,
      };

      const newUser = await userService.addUser(user);

      const resObj = {
        id: newUser.id,
        name: newUser.name,
        dob: newUser.dob,
        country: newUser.country,
        image: newUser.image,
        createdAt: newUser.createdAt,
      };

      return res
        .status(200)
        .json({ message: "User Created Successfully", data: resObj });
    } catch (err) {
      return res.status(500).json({
        message: "Server Error",
        data: err,
      });
    }
  },
  getUsersList: async (req, res) => {
    try {
      const filters = req.query.filters || [];

      const userList = await userService.getUsersList(filters);

      return res.status(200).json({
        message: "User List Retrieved Successfully",
        data: userList,
      });
    } catch (err) {
      return res.status(500).json({
        message: "Server Error",
        data: err,
      });
    }
  },
  
  // Add user Controller

};
module.exports = userController;
