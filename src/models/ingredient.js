const mongoose = require(`mongoose`);

const Ingredient = mongoose.model(`Ingredient`, {
  name: {
    type: String,
    required: true,
    trim: true
  },
  amount: {
    type: String,
    trim: true
  },
  isVegan: {
    type: Boolean,
    required: true
  },
  recipe: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: `Recipe`
  }
});

module.exports = Ingredient;
