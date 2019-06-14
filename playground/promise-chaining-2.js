require(`../src/db/mongoose`);
const Ingredient = require(`../src/models/ingredient`);

//5d02a89ff0b5d0041b88b358

// Ingredient.findByIdAndDelete(`5d02a89ff0b5d0041b88b358`)
//   .then(() => {
//     return Ingredient.countDocuments({ isVegan: true });
//   })
//   .then(ings => {
//     console.log(ings);
//   })
//   .catch(error => {
//     console.log(error);
//   });

const deleteIngredientAndCountVeganIngredients = async id => {
  await Ingredient.findByIdAndDelete(id);
  const count = await Ingredient.countDocuments({ isVegan: true });
  return count;
};

deleteIngredientAndCountVeganIngredients(`5d02a135e90e4c016ad7e2bc`)
  .then(count => {
    console.log(count);
  })
  .catch(e => {
    console.log(e);
  });
