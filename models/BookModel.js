const mongoose = require("mongoose");

const schema = mongoose.Schema({
    title:{type:String,require:true},
    author:{type:String,require:true},
    genre:{type:String,require:true},
    publishedYear:{type:Number},
    availableCopies:{type:Number,require:true},
    borrowedBy:{type:Number}
})

const bookModel = mongoose.model("books",schema);

module.exports = bookModel;