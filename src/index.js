const express = require(`express`);
require(`./db/mongoose`);
const userRouter = require(`./routers/user`);
const ingredientRouter = require(`./routers/ingredient`);
const recipeRouter = require(`./routers/recipe`);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(ingredientRouter);
app.use(recipeRouter);

app.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
});

const bcrypt = require(`bcryptjs`);

const myFunction = async () => {
  const password = `Red12345!`;
  const hashedPassword = await bcrypt.hash(password, 8);

  console.log(password);
  console.log(hashedPassword);

  const isMatch = await bcrypt.compare(`ed12345!`, hashedPassword);
  console.log(isMatch);
};

myFunction();
