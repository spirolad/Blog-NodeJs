const Blog = require('../models/blog');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path'); 

const blog_index = (req, res) => {
    Blog.find().sort({ createdAt: -1 })
      .then(result => {
        result.reverse();
        res.render('index', { blogs: result, title: 'Tous les blogs' });
      })
      .catch(err => {
        console.log(err);
      });
  }
  
  const blog_details = (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
      .then(result => {
        res.render('details', { blog: result, title: result.title, author: result.author, illustration: result.illustration });;;
      })
      .catch(err => {
        res.status(404).render('404', {title: 'Blog introuvable'})
      });
  }
  
  const blog_create_get = (req, res) => {
    res.render('create', { title: 'Créer un nouveau blog' });
  }

// var upload = multer({ dest: "Upload_folder_name" })
// If you do not want to use diskStorage then uncomment it

       
// Define the maximum size for uploading
// picture i.e. 1 MB. it is optional
 
  const blog_create_post = (req, res) => {
    var idAddress = req.header('x-forwarded-for') || req.connection.remoteAddress;
    var filename = 'x';
    if(req.files){
      var file = req.files.file;
      filename = file.name;

      file.mv('public/uploads/' + filename, function(err) {
          if(err){
            console.log('Erreur transfert de fichier');
            console.log(err);
          }
      });
  }
    const blog = new Blog({
      title: req.body.title, 
      snippet: req.body.snippet,
      body: req.body.body,
      ip: idAddress,
      author: req.body.author,
      illustration: filename
    });
    blog.save()
      .then(result => {
        res.redirect('/blogs');
      })
      .catch(err => {
        console.log(err);
      }); 
  }
  
  const blog_delete = (req, res) => {
    const id = req.params.id;
    var idAddress = req.header('x-forwarded-for') || req.connection.remoteAddress;
    Blog.findById(id)
      .then(result => {
        if(result.ip === idAddress) {
          Blog.findByIdAndDelete(id).then(
            res.json({success: true, redirect: '/blogs' })
          )
          .catch(err => res.status(404).render('404', {title: 'Blog introuvable'}));
        } else {
          res.json({success: false});
        }
      })
      .catch(err => {
        res.status(404).render('404', {title: 'Blog introuvable'})
      });
  }

module.exports = {
    blog_index, 
    blog_details, 
    blog_create_get, 
    blog_create_post,
    blog_delete
}