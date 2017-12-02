'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const {DATABASE_URL} = require('./config');
const {Comment} = require('./model/comment.js');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));
mongoose.Promise = global.Promise;

app.get('/', (req,res) => {
  res.sendFile(__dirname + 'index.html');
});

let server;
function runServer(port=3001,databaseUrl=DATABASE_URL) {
  //console.log(databaseUrl);
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl,err=>{
      if(err){
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
      .on('error', err=>{
        mongoose.disconnect();
        reject(err);
      });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() =>{
    return new Promise((resolve, reject) => {
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
  runServer();
}

module.exports = {
  app, runServer, closeServer
};
