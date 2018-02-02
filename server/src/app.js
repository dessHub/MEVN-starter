
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
var mongoose = require('mongoose');

const app = express();

var Post = require('../models/post');

mongoose.connect('mongodb://localhost:/v-posts');
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback){
  console.log("Connection succeeded");
});

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

app.get('/posts', (req, res) => {
   Post.find({}, function(error, posts) {
      if (error){
          console.log(error);
      }
      res.send({
        posts: posts
      })
   }).sort({_id:-1});
});

app.post('/post', (req, res) => {
   var db = req.db;
   var title = req.body.title;
   var description = req.body.description;
   const requestBody = req.body;
   const newPost = new Post(requestBody);
   var new_post = new Post({
     title:title,
     description:description
   });

   newPost.save(function (error) {
     if (error) {
       console.log(error)
     }
     res.send({
       success: true,
       message: 'Post successful!'
     });
     
   });
   console.log(new_post);
});

app.get('/post/:id', (req, res) => {
  
  Post.findById(req.params.id, function(error, post) {
    if(error) {
        console.log(error);
    }
    res.send(post);
  });
});

app.put('/post/:id', (req, res) => {
  console.log("receiving the signal");
  Post.findById(req.params.id, function(error, post) {
    if (error) {
     console.log(error);
    }

    post.title = req.body.title;
    post.description = req.body.description;
    post.save(function (error) {
      if(error) {
        console.log(error);
      }
      res.send({
        success: true
      })
    })
  })
});

app.delete('/post/:id', (req, res) => {
  console.log('getting here');  
  Post.remove({
    _id: req.params.id
  },function(err, post){
   if (err) {
       res.send(err)
   }
   res.send({
       success: true
   })
  })
});


app.listen(process.env.PORT || 8081);
