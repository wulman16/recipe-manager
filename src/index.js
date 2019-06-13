const express = require(`express`);
require(`./db/mongoose`);
const User = require(`./models/user`);
const Recipe = require(`./models/recipe`);
const Ingredient = require(`./models/ingredient`);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post(`/users`, (req, res) => {
  const user = new User(req.body);

  user
    .save()
    .then(() => {
      res.status(201).send(user);
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

app.get(`/users`, (req, res) => {
  User.find({})
    .then(users => {
      res.send(users);
    })
    .catch(e => {
      res.status(500).send();
    });
});

app.get("/users/:id", (req, res) => {
  const _id = req.params.id;
  User.findById(_id)
    .then(user => {
      if (!user) {
        return res.status(404).send();
      }

      res.send(user);
    })
    .catch(e => {
      res.status(500).send();
    });
});

app.post(`/ingredients`, (req, res) => {
  const ing = new Ingredient(req.body);

  ing
    .save()
    .then(() => {
      res.status(201).send(ing);
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

app.get(`/ingredients`, (req, res) => {
  Ingredient.find({})
    .then(ings => {
      res.send(ings);
    })
    .catch(e => {
      res.status(500).send();
    });
});

app.get("/ingredients/:id", (req, res) => {
  const _id = req.params.id;
  Ingredient.findById(_id)
    .then(ing => {
      if (!ing) {
        return res.status(404).send();
      }

      res.send(ing);
    })
    .catch(e => {
      res.status(500).send();
    });
});

app.post(`/recipes`, (req, res) => {
  const recipe = new Recipe(req.body);

  recipe
    .save()
    .then(() => {
      res.status(201).send(recipe);
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

app.get(`/recipes`, (req, res) => {
  Recipe.find({})
    .then(recipes => {
      res.send(recipes);
    })
    .catch(e => {
      res.status(500).send();
    });
});

app.get("/recipes/:id", (req, res) => {
  const _id = req.params.id;
  Recipe.findById(_id)
    .then(recipe => {
      if (!recipe) {
        return res.status(404).send();
      }

      res.send(recipe);
    })
    .catch(e => {
      res.status(500).send();
    });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
});
