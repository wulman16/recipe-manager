const mongoose = require(`mongoose`);

const Recipe = mongoose.model(`Recipe`, {
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
  }
});

module.exports = Recipe;
