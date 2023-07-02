
const userService = require("../services/userServices");
const userController = {
  addUser: async (req, res) => {
    try {
      console.log("body", req.body)
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
  updateUser: async (req, res) => {
    try {
      const userId = req.params.id;
      const updatedUser = {
        name: req.body.name,
        dob: req.body.dob,
        country: req.body.country,
        image: req.body.image,
      };

      const updatedUserData = await userService.updateUser(userId, updatedUser);
      if (!updatedUserData) {
        return res.status(404).json({
          message: "User not found",
          data: null,
        });
      }
      const resObj = {
        id: updatedUserData.id,
        name: updatedUserData.name,
        dob: updatedUserData.dob,
        country: updatedUserData.country,
        image: updatedUserData.image,
        createdAt: updatedUserData.createdAt,
      };

      return res.status(200).json({
        message: "User updated successfully",
        data: resObj,
      });
    } catch (err) {
      return res.status(500).json({
        message: "Server Error",
        data: err,
      });
    }
  },
  deleteUser:async (req, res) =>{
    try {
      const userId = req.params.id;
      const deleted = await userService.deleteUserById(userId);
      if (deleted) {
        return res.status(200).json({ message: 'User Deleted Successfully' });
      } else {
        return res.status(404).json({ message: 'User Not Found' });
      }
    } catch (err) {
      return res.status(500).json({ message: 'Server Error', data: err });
    }
  },
  getUsersList: async (req, res) => {
    try {
      const filters = req.query.filetrs;
      let arr = [filters]
      const userList = await userService.getUsersList(arr);

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
  getCountries: async(req, res) =>{
    try {
      const filters = req.query.name || "";

      const countryList = await userService.getCoutriesList(filters);

      return res.status(200).json({
        message: "Country List Retrieved Successfully",
        data: countryList,
      });
    } catch (err) {
      return res.status(500).json({
        message: "Server Error",
        data: err,
      });
    }
  }
  // Add user Controller

};
module.exports = userController;
