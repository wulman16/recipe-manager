const express = require(`express`);
require(`./db/mongoose`);
const userRouter = require(`./routers/user`);
const ingredientRouter = require(`./routers/ingredient`);
const recipeRouter = require(`./routers/recipe`);

const app = express();
const port = process.env.PORT || 3000;

// app.use((req, res, next) => {
//   res.status(503).send(`Site is under maintenance! Please come back later.`);
// });

app.use(express.json());
app.use(userRouter);
app.use(ingredientRouter);
app.use(recipeRouter);

app.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
});

// const Recipe = require(`./models/recipe`);
// const User = require(`./models/user`);

// const main = async () => {
//   // const recipe = await Recipe.findById(`5d0687a79d8d163a7ea279c8`);
//   // await recipe.populate(`owner`).execPopulate();
//   // console.log(recipe.owner);

//   const user = await User.findById(`5d0687929d8d163a7ea279c6`);
//   await user.populate(`recipes`).execPopulate();
//   console.log(user.recipes);
// };

// main();
