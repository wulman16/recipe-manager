const express = require(`express`);
const Recipe = require(`../models/recipe`);
const auth = require(`../middleware/auth`);
const router = new express.Router();

router.post(`/recipes`, auth, async (req, res) => {
  const recipe = new Recipe({
    ...req.body,
    owner: req.user._id
  });

  try {
    await recipe.save();
    res.status(201).send(recipe);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get(`/recipes`, auth, async (req, res) => {
  try {
    const recipes = await Recipe.find({ owner: req.user._id });
    res.send(recipes);
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/recipes/:id", auth, async (req, res) => {
  const _id = req.params.id;

  try {
    const recipe = await Recipe.findOne({ _id, owner: req.user._id });
    if (!recipe) return res.status(404).send();
    res.send(recipe);
  } catch (e) {
    res.status(500).send();
  }
});

router.patch(`/recipes/:id`, auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [`title`, `time`, `instructions`];
  const isValidOperation = updates.every(update => {
    return allowedUpdates.includes(update);
  });

  if (!isValidOperation) {
    return res.status(400).send({ error: `Invalid updates!` });
  }

  const _id = req.params.id;

  try {
    const recipe = await Recipe.findOne({ _id, owner: req.user._id });

    if (!recipe) return res.status(404).send();

    updates.forEach(update => (recipe[update] = req.body[update]));
    await recipe.save();

    res.send(recipe);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete(`/recipes/:id`, async (req, res) => {
  const _id = req.params.id;

  try {
    const recipe = await Recipe.findByIdAndDelete(_id);
    if (!recipe) return res.status(404).send();
    res.send(recipe);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
