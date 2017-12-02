'use strict';

const mongoose = require('mongoose');

const commentsSchema = mongoose.Schema({
  text:{type:String, required:true}, 
  likes:{type: Number, required:true}
});

const Comment = mongoose.model('Comment',commentsSchema);

module.exports= {Comment};