const mongoose = require(`mongoose`);
const validator = require(`validator`);

mongoose.connect(`mongodb://127.0.0.1:27017/recipe-manager-api`, {
  useNewUrlParser: true,
  useCreateIndex: true
});

const User = mongoose.model(`User`, {
  name: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error(`Age must be a positive number!`);
      }
    }
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error(`Email is invalid!`);
      }
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (value.length < 7) {
        throw new Error(`Password must be at least 7 characters!`);
      } else if (validator.contains(value, `password`)) {
        throw new Error(`Password cannot contain the word "password"!`);
      }
    }
  }
});

const me = new User({
  name: `   Will `,
  email: `qwertyuiop161661@yahoo.com   `
});

me.save()
  .then(() => {
    console.log(me);
  })
  .catch(error => {
    console.log(`Error: ${error}`);
  });

const Recipe = mongoose.model(`Recipe`, {
  title: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  instructions: {
    type: String,
    required: true
  }
});

const Ingredient = mongoose.model(`Ingredient`, {
  name: {
    type: String,
    required: true
  },
  amount: {
    type: String
  },
  isVegan: {
    type: Boolean,
    required: true
  }
});

// const almondButterToast = new Recipe({
//   title: `Almond Butter Toast`,
//   time: 5,
//   instructions: `Toast bread. Spread almond butter on one side. Enjoy!`
// });

// almondButterToast
//   .save()
//   .then(() => {
//     console.log(almondButterToast);
//   })
//   .catch(error => {
//     console.log(error);
//   });
