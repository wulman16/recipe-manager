const express = require(`express`);
const Ingredient = require(`../models/ingredient`);
const router = new express.Router();

router.post(`/ingredients`, async (req, res) => {
  const ing = new Ingredient(req.body);

  try {
    await ing.save();
    res.status(201).send(ing);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get(`/ingredients`, async (req, res) => {
  try {
    const ings = await Ingredient.find({});
    res.send(ings);
  } catch (e) {
    res.status(500).send();
  }
});

router.get(`/ingredients/:id`, async (req, res) => {
  const _id = req.params.id;

  try {
    const ing = await Ingredient.findById(_id);
    if (!ing) return res.status(404).send();
    res.send(ing);
  } catch (e) {
    res.status(500).send();
  }
});

router.patch(`/ingredients/:id`, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [`name`, `amount`, `isVegan`];
  const isValidOperation = updates.every(update => {
    return allowedUpdates.includes(update);
  });

  if (!isValidOperation) {
    return res.status(400).send({ error: `Invalid updates!` });
  }

  const _id = req.params.id;

  try {
    const ing = await Ingredient.findById(_id);

    updates.forEach(update => (ing[update] = req.body[update]));
    await ing.save();

    if (!ing) return res.status(404).send();
    res.send(ing);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete(`/ingredients/:id`, async (req, res) => {
  const _id = req.params.id;

  try {
    const ing = await Ingredient.findByIdAndDelete(_id);
    if (!ing) return res.status(404).send();
    res.send(ing);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
