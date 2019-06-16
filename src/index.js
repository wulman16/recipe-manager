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
// const Ingredient = require(`./models/ingredient`);

// const main = async () => {
//   const ingredient = await Ingredient.findById(`5d068dda8c26753e22c89467`);
//   await ingredient.populate(`recipe`).execPopulate();
//   console.log(ingredient.recipe);

//   // const recipe = await Recipe.findById(`5d0687a79d8d163a7ea279c8`);
//   // await recipe.populate(`ingredients`).execPopulate();
//   // console.log(recipe.ingredients);
// };

// main();
