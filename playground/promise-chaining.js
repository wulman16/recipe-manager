require(`../src/db/mongoose`);
const User = require(`../src/models/user`);

// 5d028e3f9eb406f7e64a099e

User.findByIdAndUpdate(`5d029f494cb621fe42957411`, { age: 1 })
  .then(user => {
    console.log(user);
    return User.countDocuments({ age: 1 });
  })
  .then(users => {
    console.log(users);
  })
  .catch(error => {
    console.log(error);
  });
