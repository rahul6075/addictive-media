const express = require('express');
const router = express.Router();

const  { addUser, getUsersList }  = require('../controllers/userControllers');

router.post("/addUser", addUser);
router.get("/getUser", getUsersList);





module.exports = router ;