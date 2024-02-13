const mongoose=require('mongoose');

const counterSchema=new mongoose.Schema({
    articleAuthorId:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Author"
    },
    name:
    {
        type:String,
        //default:"articleCounter"
    },
    count:
    {
        type:Number,
        default:0
    }
});
module.exports=mongoose.model('Counter',counterSchema);