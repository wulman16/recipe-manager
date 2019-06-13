const mongoose = require(`mongoose`);

mongoose.connect(`mongodb://127.0.0.1:27017/recipe-manager-api`, {
  useNewUrlParser: true,
  useCreateIndex: true
});

const User = mongoose.model(`User`, {
  name: {
    type: String
  },
  age: {
    type: Number
  }
});

// const me = new User({
//   name: `Will`,
//   age: `whatttttt`
// });

// me.save()
//   .then(() => {
//     console.log(me);
//   })
//   .catch(error => {
//     console.log(`Error: ${error}`);
//   });

const Recipe = mongoose.model(`Recipe`, {
  title: {
    type: String
  },
  time: {
    type: String
  },
  instructions: {
    type: String
  }
});

const Ingredient = mongoose.model(`Ingredient`, {
  name: {
    type: String
  },
  amount: {
    type: String
  },
  isVegan: {
    type: Boolean
  }
});

const almondButterToast = new Recipe({
  title: `Almond Butter Toast`,
  time: 5,
  instructions: `Toast bread. Spread almond butter on one side. Enjoy!`
});

almondButterToast
  .save()
  .then(() => {
    console.log(almondButterToast);
  })
  .catch(error => {
    console.log(error);
  });
