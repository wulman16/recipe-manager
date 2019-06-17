const mongoose = require(`mongoose`);
const validator = require(`validator`);
const bcrypt = require(`bcryptjs`);
const jwt = require(`jsonwebtoken`);
const Recipe = require(`./recipe`);

const userSchema = new mongoose.Schema(
  {
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
      unique: true,
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
      minlength: 7,
      validate(value) {
        if (validator.contains(value, `password`)) {
          throw new Error(`Password cannot contain the word "password"!`);
        }
      }
    },
    tokens: [
      {
        token: {
          type: String,
          required: true
        }
      }
    ]
  },
  { timestamps: true }
);

userSchema.virtual(`recipes`, {
  ref: `Recipe`,
  localField: `_id`,
  foreignField: `owner`
});

userSchema.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, `Eeehhh`);

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

userSchema.methods.toJSON = function() {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error({ error: `Invalid credentials!` });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error({ error: `Invalid credentials!` });
  }

  return user;
};

// Hash plain-text password before saving
userSchema.pre(`save`, async function(next) {
  const user = this;

  if (user.isModified(`password`)) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

// Delete user recipes when user is deleted
userSchema.pre(`remove`, async function(next) {
  const user = this;
  await Recipe.deleteMany({ owner: user._id });
  next();
});

const User = mongoose.model(`User`, userSchema);

module.exports = User;
