const Article = require('../models/articlesModel');
const Author = require('../models/authorsModel');
const Counter = require('../models/articlesCounterModel.js');

const asyncWrapper = require('../middleware/asyncWrapper');
const hst = require('../utils/httpStatusText.js');

const createArticle = asyncWrapper(async (req, res) => {

    const { articleAuthorId, articleTitle, articleContent, articleCreateDate, articleUpdateDate } = req.body;
    const author = await Author.findOne({ _id: articleAuthorId });
    if(!author)
    {
        return res.json({msg:"author not found"});
    }
    const authorName = author.authorName;

    const newArticle = new Article({
        articleAuthorId,
        articleTitle,
        articleContent,
        articleCreateDate,
        articleUpdateDate,
    });
    newArticle.articleAuthorName = authorName;

    const counter = await Counter.findOneAndUpdate(
        { articleAuthorId: author._id },
        { $inc: { count: 1 } },
        { upsert: true, new: true }
    );
    newArticle.articleCounter = counter.count;
    await newArticle.save();
    res.json({ msg: newArticle });
});

const getOneArticle = asyncWrapper(async (req, res) => {
    const article = await Article.findById(req.params.articleID);
    if (!article) {
        return res.json({ msg: "article not found" });
    }
    //console.log(article.articleAuthorId.toString());

    res.json({ article });

});

const getAllArticles = asyncWrapper(async (req, res) => {
    const query = req.query;
    const limit = query.limit || 10;
    const page = query.page || 1;
    const skip = (page - 1) * limit;
    const authorID = query.authorID;
    const articles = await Article.find({ articleAuthorId: authorID }).limit(limit).skip(skip);
    if (articles.length == 0) {
        return res.json({ msg: "not found any articles" });
    }
    res.json({ articles });
});

const updateArticle = asyncWrapper(async (req, res) => {
    const date = new Date().toLocaleString();
    const updatedarticle = await Article.findByIdAndUpdate(
        req.params.articleID,
        { $set: { "articleUpdateDate": date, ...req.body } },
        { new: true });
    console.log(updatedarticle.articleUpdateDate);
    res.json({ updatedarticle });

});

const deleteOneArticle = asyncWrapper(async (req, res) => {
    const article = await Article.findById(req.params.articleID);
    if (!article) {
        return res.json({ msg: "article not found" });
    }
    const articleAuthorId = article.articleAuthorId;
    await Article.deleteOne({ _id: req.params.articleID });
    const counter = await Counter.findOneAndUpdate(
        { articleAuthorId: articleAuthorId },
        { $inc: { count: -1 } },
        { new: true }
    );
    res.json({ msg: "article deleted" });
});

const deleteAllArticles = asyncWrapper(async (req, res) => {

    console.log(req.query.authorID);
    await Article.deleteMany({ articleAuthorId: req.query.authorID });
    await Counter.findOneAndUpdate(
        { articleAuthorId: req.query.authorID },
        { count: 0 },
        { new: true }
    );
    res.json({ msg: "articles deleted" });
});


module.exports = { createArticle, deleteOneArticle, deleteAllArticles, updateArticle, getAllArticles, getOneArticle };