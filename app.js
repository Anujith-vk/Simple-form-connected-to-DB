var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('./database/db'); 
var multer = require('multer');
var Form = require('./schema/schema');

var app = express();
const port = 4000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname));

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'uploads')); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

var upload = multer({ storage: storage });

app.post('/upload', upload.fields([{ name: 'photo' }, { name: 'proof' }]), async (req, res) => {
  try {
    const { name, branch } = req.body;
    const photo = req.files['photo'] ? req.files['photo'][0].path : null;
    const proof = req.files['proof'] ? req.files['proof'][0].path : null;
    if (!name || !branch || !photo || !proof) {
      console.log('Missing field(s):', { name, branch, photo, proof });
      return res.status(400).send('All fields are required!');
    }
    const newForm = new Form({
      name,
      branch,
      photo,
      proof
    });

    await newForm.save();

    res.send('Data successfully stored in the database.');
  } catch (err) {
    console.error('Error saving data:', err);
    res.status(500).send('Failed to store data in the database.');
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:4000`);
});

module.exports = app;
