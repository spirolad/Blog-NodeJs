const express = require('express');
const morgan = require('morgan');
const blogRoutes = require('./routes/blogsRoutes');
const mongoose = require('mongoose');

const app = express();

const dbURI = "mongodb+srv://rooot:@node.pha9j.mongodb.net/Node?retryWrites=true&w=majority";
mongoose.connect(dbURI)
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}));
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.redirect('/blogs');

});

app.get('/about', (req, res) => {
    res.render('about', {title: 'About'});
});


app.use('/blogs', blogRoutes);

app.use((req, res) => {
    res.status(404).render('404', {title: '404 Not Found'});
});