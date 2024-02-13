const express=require('express');
const router=express.Router();

const authorsController=require('../controllers/authorsController');

router.route('/register')
    .post(authorsController.register);

router.route('/login')
    .post(authorsController.login);

module.exports=router;