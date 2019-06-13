require(`../src/db/mongoose`);
const Ingredient = require(`../src/models/ingredient`);

//5d02a89ff0b5d0041b88b358

Ingredient.findByIdAndDelete(`5d02a89ff0b5d0041b88b358`)
  .then(() => {
    return Ingredient.countDocuments({ isVegan: true });
  })
  .then(ings => {
    console.log(ings);
  })
  .catch(error => {
    console.log(error);
  });
