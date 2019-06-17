const mongoose = require(`mongoose`);

const recipeSchema = new mongoose.Schema(
  {
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
    ingredients: {
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
  },
  { timestamps: true }
);

const Recipe = mongoose.model(`Recipe`, recipeSchema);

module.exports = Recipe;
