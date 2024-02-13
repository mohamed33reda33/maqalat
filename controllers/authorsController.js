const Author = require('../models/authorsModel.js');
const asyncWrapper = require('../middleware/asyncWrapper.js');
const hst = require('../utils/httpStatusText.js');
const bcryptjs = require('bcryptjs');
const generateJWT=require('../utils/generateJWT.js');

//require('crypto').randomBytes(32).toString('hex');

const register = asyncWrapper(async (req, res) => {
    const {authorName, authorEmail, authorPassword } = req.body;
    const oldAuthor = await Author.findOne({ authorEmail: authorEmail });
    if (oldAuthor) {
        return res.json({ msg: "email is already founded" });
    }

    const hashedPassword = await bcryptjs.hash(authorPassword, 10);
    const newAuthor = new Author({
        authorName,
        authorEmail,
        authorPassword: hashedPassword
    });
    newAuthor.token=await generateJWT({authorId:newAuthor._id,authorEmail:newAuthor.authorEmail});
    await newAuthor.save();
    res.json({ newAuthor });
});

const login = asyncWrapper(async (req, res) => {
    const { authorEmail, authorPassword } = req.body;
    if(!authorEmail||!authorPassword)
    {
        return res.json({ msg: "email & password is required" });

    }
    const author = await Author.findOne({ authorEmail: authorEmail });
    if (!author) {
        return res.json({ msg: "email not found" });
    }
    const matchedPassword = await bcryptjs.compare(authorPassword, author.authorPassword);
    if (author && matchedPassword) {
        const token=await generateJWT({authorId:author._id,authorEmail:author.authorEmail});
        res.json({ token });
    }
    else {
        res.json({ msg: "password not courect" });
    }

});


module.exports = { register, login };