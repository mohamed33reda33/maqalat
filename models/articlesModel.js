const mongoose=require('mongoose');

const articleSchema=mongoose.Schema({
    articleAuthorId:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Author"
    },
    articleTitle:
    {
        type:String,
        required:true
    },
    articleContent:
    {
        type:String,
        required:true
    },
    articleCreateDate:
    {
        type:Date,
        default:Date.now
    },
    articleUpdateDate:
    {
        type:Date,
        default: Date.now
    },
    articleCounter:
    {
        type:Number,
        default:0
    },
    articleAuthorName:
    {
        
    }

});

module.exports=mongoose.model("Article",articleSchema);