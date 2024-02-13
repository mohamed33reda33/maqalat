const jwt=require('jsonwebtoken');
const Article = require('../models/articlesModel');


const verifyToken=async(req,res,next)=>{
    const article=await Article.findById(req.params.articleID);
    if(!article)
    {
        res.json({msg:"article not found"});
        return next();
    }
    const authorizationHeader=req.headers['Authorization']||req.headers['authorization'];
    if (!authorizationHeader)
    {
        res.json({msg:"token is required"});
        return next();
    }
    const token=authorizationHeader.split(' ')[1];

    try
    {
        const decodedToken=jwt.verify(token,process.env.JWT_SECRET_KEY);
        if(article.articleAuthorId.toString()=== decodedToken.authorId)
        {
            return next();
        }
        else
        {
            res.json({msg:"invalid token2"});
            return next();
        }
    }
    catch(error)
    {   console.log("invalid token");
        return next(error);
    }
}

module.exports=verifyToken;