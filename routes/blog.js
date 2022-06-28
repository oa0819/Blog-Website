const router = require('express').Router();
const SavedBlogs = require('../models/SavedBlogs');
const mongoose = require('mongoose');

var db = mongoose.connection;


router.get('/blog/:id', async (req, res) => {
    const id = req.params.id;

    var record = await db.collection('SavedBlogs').find({}, { projection: { title: 1, content: 1 } }).toArray((err, result) => {

        for (var i = 0; i < result.length; i++) {

            if (result[i]._id == id) {

                res.render('specBlog', { blog: result[i] });

            }
        }

    });

    // console.log(record.title);

})

    .get('/delete/:id', (req, res) => {
        const id = req.params.id;
        db.collection('SavedBlogs').find({}, { projection: { title: 1, content: 1 } }).toArray((err, result) => {

            for (var i = 0; i < result.length; i++) {

                if (result[i]._id == id) {

                    var query = { _id: result[i]._id };

                    db.collection('SavedBlogs').deleteOne(query, (err, obj) => {
                        console.log('one blog deleted!');
                    });

                    res.redirect('/');
                    break;
                }
            }

        });

    })

    .get('/edit/:id', async (req, res) => {

        const id = req.params.id;

        var record = await db.collection('SavedBlogs').find({}, { projection: { title: 1, content: 1 } }).toArray((err, result) => {

            for (var i = 0; i < result.length; i++) {

                if (result[i]._id == id) {

                    res.render('editBlog', { blog: result[i] });

                }
            }

        });
    })
    .post('/edit/:id', (req, res) => {

        const id = req.params.id;

        db.collection('SavedBlogs').find({}, { projection: { title: 1, content: 1 } }).toArray((err, result) => {
            for (var i = 0; i < result.length; i++) {
                if (result[i]._id == id) {
                    var query = { _id: result[i]._id };

                    var newquery = { $set: { title: req.body.title, content: req.body.content } };

                    db.collection('SavedBlogs').updateOne(query, newquery, (err, obj) => {
                        if (err) throw err;
                        console.log("1 blog updated");
                    })

                    res.redirect('/');

                }
            }
        })


    })


module.exports = router;