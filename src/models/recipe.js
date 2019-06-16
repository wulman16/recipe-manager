const mongoose = require(`mongoose`);

const recipeSchema = new mongoose.Schema(`Recipe`, {
  title: {
    type: String,
    required: true,
    trim: true
  },
  time: {
    type: String,
    required: true,
    trim: true
  },
  instructions: {
    type: String,
    required: true,
    trim: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: `User`
  }
});

recipeSchema.virtual(`ingredients`, {
  ref: `Ingredient`,
  localField: `_id`,
  foreignField: `recipe`
});

const Recipe = mongoose.model(`Recipe`, recipeSchema);

module.exports = Recipe;
