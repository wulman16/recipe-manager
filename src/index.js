const express = require(`express`);
require(`./db/mongoose`);
const User = require(`./models/user`);
const Recipe = require(`./models/recipe`);
const Ingredient = require(`./models/ingredient`);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post(`/users`, async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.get(`/users`, async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (e) {
    res.status(500).send();
  }
});

app.get("/users/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.findById(_id);
    if (!user) return res.status(404).send();
    res.send(user);
  } catch (e) {
    res.status(500).send();
  }
});

app.post(`/ingredients`, async (req, res) => {
  const ing = new Ingredient(req.body);

  try {
    await ing.save();
    res.status(201).send(ing);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.get(`/ingredients`, async (req, res) => {
  try {
    const ings = await Ingredient.find({});
    res.send(ings);
  } catch (e) {
    res.status(500).send();
  }
});

app.get("/ingredients/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const ing = await Ingredient.findById(_id);
    if (!ing) return res.status(404).send();
    res.send(ing);
  } catch (e) {
    res.status(500).send();
  }
});

app.post(`/recipes`, async (req, res) => {
  const recipe = await new Recipe(req.body);

  try {
    await recipe.save();
    res.status(201).send(recipe);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.get(`/recipes`, async (req, res) => {
  try {
    const recipes = await Recipe.find({});
    res.send(recipes);
  } catch (e) {
    res.status(500).send();
  }
});

app.get("/recipes/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const recipe = await Recipe.findById(_id);
    if (!recipe) return res.status(404).send();
    res.send(recipe);
  } catch (e) {
    res.status(500).send();
  }
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
});
