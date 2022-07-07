const mongoose = require('mongoose');


const Schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    Date: {
        type: String,
        default: new Date().toString()
    },
    image:{
        type: String
    }
})

var userBlog = new mongoose.model("SavedBlogs", Schema)

module.exports = userBlog;