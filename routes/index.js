const mongoose = require('mongoose');
const SavedBlogs = require('../models/SavedBlogs');

const router = require('express').Router();

router.get('/', async(req, res) => {
    var db = mongoose.connection;
    await db.collection('SavedBlogs').find({}).toArray((err, result) => {
        if (err) throw err;
        // console.log(result);
        res.render("index", {data: result});
    });

    // const allBlogs = await SavedBlogs.find();
    // res.render("index", {data: allBlogs});
})

module.exports = router;