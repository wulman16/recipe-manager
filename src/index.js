const express = require(`express`);
require(`./db/mongoose`);
const userRouter = require(`./routers/user`);
const recipeRouter = require(`./routers/recipe`);

const app = express();
const port = process.env.PORT || 3000;

const multer = require(`multer`);
const upload = multer({
  dest: `images`,
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(doc|docx)$/)) {
      return cb(new Error(`File must be a Word document!`));
    }

    cb(undefined, true);
  }
});

app.post(
  `/upload`,
  upload.single(`upload`),
  (req, res) => {
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({
      error: error.message
    });
  }
);

app.use(express.json());
app.use(userRouter);
app.use(recipeRouter);

app.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
});
