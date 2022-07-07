const router = require('express').Router();
const mongoose = require('mongoose');
var multer = require('multer');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
// const Blog = require('../models/Blog');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// connect to mongoDB
mongoose.connect('mongodb://localhost:27017/Blog', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
var db = mongoose.connection;

db.on('error', () => console.log('error in connection'));
db.once('open', () => console.log('connection successful'));

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

var upload = multer({ storage: storage });

router.get('/compose', (req, res) => {
    res.render("composeBlog")
})

    .post('/compose', upload.single('image'), (req, res) => {
        var title = req.body.title;
        var content = req.body.content;
        let file = req.file;
        console.log(file);

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
            'image': {
                data: fs.readFileSync(path.join(__dirname + './uploads' + file.filename))
            }
        }
        db.collection('SavedBlogs').insertOne(data, (err, collection) => {
            if (err) throw err;
            console.log('blog saved successfully');
        })
        res.redirect('/');


    })
// db.collection('SavedBlogs')
module.exports = router;