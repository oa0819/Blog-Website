const router = require('express').Router();
const mongoose = require('mongoose');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

var db = mongoose.connection;

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

var upload = multer({ storage: storage });

router.get('/', (req, res) => {
    db.collection('SavedBlogs').find({}).toArray((err, result) => {
        if (err) throw err;

        res.render('index', { data: result });
    })
})
    .post('/', upload.single('image'), (req, res) => {
        var obj = {
            title: req.body.title,
            content: req.body.content,
            desc: req.body.desc,
            image: {
                data: fs.readFileSync(path.join(__dirname + './uploads' + req.file.filename)),
                contentType: 'image/png'
            }
        }
        db.collection('SavedBlogs').insertOne(obj, (err, collection) => {
            if (err) throw err;
            console.log('blog saved successfully');
        })
        res.redirect('/');
    })

// module.exports = router;