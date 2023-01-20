let express = require('express');
let mongoose = require('mongoose');
const multer = require("multer");
let cors = require('cors');
let bodyParser = require('body-parser');
//var jwt = require('jsonwebtoken');
let mongoDb = require('./connection/db');
const CandidateRoute = require('./routes/Candidate/candidate_route');
const UserRoute = require('./routes/user/user_route');
require('dotenv').config()
const app = express();
mongoose.connect(mongoDb.database, {
  useUnifiedTopology: true,
  useNewUrlParser: true
}).then(() => {
console.log('Database connected!')
},
error => {
  console.log("Data Base Not Connected!", error);
}
)
app.use(cors());

app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${file.originalname}`
    )
  },
})

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/ // Choose Types you want...
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb('Images only!') // custom this message to fit your needs
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
})
 app.use('/user', UserRoute);
app.use('/candidate', CandidateRoute);
app.post('/uploadimage', upload.single('image'), (req, res) => {
  res.send(`/${req.file.path}`);
})
// --------------------------deployment------------------------------
if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, './client/build/index.html'));
})
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}
// --------------------------deployment------------------------------


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log('Connected on : ' + port)
})

app.use(function (err, req, res, next) {
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});