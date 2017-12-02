'use strict';

const mongoose = require('mongoose');

const commentsSchema = mongoose.Schema({
  comments:[{text:String, likes:Number}]
});

const Comment = mongoose.model('Comment',commentsSchema);

module.exports= {Comment};