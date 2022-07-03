const router = require('express').Router();
const mongoose = require('mongoose');
// const Blog = require('../models/Blog');

// connect to mongoDB
mongoose.connect('mongodb://localhost:27017/Blog', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
var db = mongoose.connection;

db.on('error', () => console.log('error in connection'));
db.once('open', () => console.log('connection successful'));

router.get('/compose', (req, res) => {
    res.render("composeBlog")
})

    .post('/compose', (req, res) => {
        var title = req.body.title;
        var content = req.body.content;

        var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var d = new Date();
        var min = d.getMinutes();
        if (min >= 0 && min <= 9) {
            min = "0" + min;
        }

        var data = {
            'title': title,
            'content': content,
            'date': month[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear() + " " + d.getHours() + ":" + min,
            'image':image
        }
        db.collection('SavedBlogs').insertOne(data, (err, collection) => {
            if (err) throw err;
            console.log('blog saved successfully');
        })
        res.redirect('/');


    })
// db.collection('SavedBlogs')
module.exports = router;