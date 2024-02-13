const mongoose=require('mongoose');
const validator=require('validator');
const authorSchema=mongoose.Schema({
    // authorId:
    // {
    //     type:String,
    //     required:true,
    //     unique:true
    // },
    authorName:
    {
        type:String,
        required:true
    },
    authorEmail:
    {
        type:String,
        required:true,
        unique:true,
        validate:[validator.isEmail,'filed must be a valid email address']
    },
    authorPassword:
    {
        type:String,
        required:true,
    },
    token:
    {
        type:String
    }
})

module.exports=mongoose.model('Author',authorSchema);