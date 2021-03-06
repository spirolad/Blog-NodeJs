const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    ip: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    illustration: {
        type: String,
        required: true
    }
}, {timeseries: true});

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;