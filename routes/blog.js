const router = require('express').Router();
const SavedBlogs = require('../models/SavedBlogs');
const mongoose = require('mongoose');

router.get('/blog/:id', async (req, res) => {
    var db = mongoose.connection;
    const id = req.params.id;

    var record = await db.collection('SavedBlogs').find({}, { projection: { title: 1, content: 1 } }).toArray((err, result) => {

        for (var i = 0; i < result.length; i++) {

            if (result[i]._id == id) {
                // console.log(result[i]._id);
                // console.log(result[i].title);
                // console.log(result[i].content);

                res.render('specBlog', { blog: result[i] });

            }
        }

    });

    // console.log(record.title);

})

module.exports = router;