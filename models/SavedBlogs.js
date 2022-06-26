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
    postedAt: {
        type: String,
        default: new Date().toString()
    }
})

var userBlog = new mongoose.model("SavedBlogs", Schema)

module.exports = userBlog;