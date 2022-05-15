const Blog = require('../models/blog');


const blog_index = (req, res) => {
    Blog.find().sort({ createdAt: -1 })
      .then(result => {
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
        res.render('details', { blog: result, title: result.title, author: result.author });;
      })
      .catch(err => {
        res.status(404).render('404', {title: 'Blog introuvable'})
      });
  }
  
  const blog_create_get = (req, res) => {
    res.render('create', { title: 'Créer un nouveau blog' });
  }
  
  const blog_create_post = (req, res) => {
    var idAddress = req.header('x-forwarded-for') || req.connection.remoteAddress;
    console.log(idAddress);
    const blog = new Blog({
      title: req.body.title, 
      snippet: req.body.snippet,
      body: req.body.body,
      ip: idAddress,
      author: req.body.author
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