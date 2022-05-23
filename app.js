const express = require('express');
const morgan = require('morgan');
const blogRoutes = require('./routes/blogsRoutes');
const mongoose = require('mongoose');
const upload = require('express-fileupload');


const app = express();

const dbURI = "mongodb+srv://:@node.pha9j.mongodb.net/Node?retryWrites=true&w=majority";
mongoose.connect(dbURI)
    .then((result) => {
        app.listen(80);
        console.log('Server listening on http');
    }
    ).catch((err) => console.log(err));

app.set('view engine', 'ejs');
app.use(upload());
app.use(express.static('public'));
app.use(morgan('dev'));

/*app.post('/upload', function(req, res){
    if(req.files){
        var file = req.files.file;
        var filename = file.name;
        console.log(filename);

        file.mv('./public/uploads/' + filename, function(err) {
            if(err){
                res.send(err);
            } else {
                res.send('File uploaded successfully');
            }
        });
    }
    console.log(req.files);
}); */

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
