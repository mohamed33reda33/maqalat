const express=require('express');
const router=express.Router();
const verifyToken=require('../middleware/verifyToken');

const articlesController=require('../controllers/articlesController');

router.route('/')
    .post(articlesController.createArticle)
    .get(articlesController.getAllArticles)
    .delete(articlesController.deleteAllArticles);
    

router.route('/:articleID')
    .get(verifyToken,articlesController.getOneArticle)
    .patch(verifyToken,articlesController.updateArticle)
    .delete(verifyToken,articlesController.deleteOneArticle);



module.exports=router;