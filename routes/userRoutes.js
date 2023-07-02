const express = require('express');
const router = express.Router();

const  { addUser, getUsersList, getCountries, updateUser, deleteUser }  = require('../controllers/userControllers');

router.post("/addUser", addUser);
router.put('/updateUser/:id', updateUser)
router.delete('/deleteUser/:id', deleteUser)
router.get("/getUser", getUsersList);
router.get('/getCountries', getCountries)




module.exports = router ;