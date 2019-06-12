// CRUD create read update delete

const mongodb = require(`mongodb`);
const MongoClient = mongodb.MongoClient;

const connectionURL = `mongodb://127.0.0.1:27017`;
const databaseName = `recipe-manager`;

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log(`Unable to connect to database!`);
    }

    const db = client.db(databaseName);

    db.collection(`recipes`).insertMany(
      [
        {
          title: `Almond Butter Toast`,
          time: `5 minutes`,
          instructions: `Toast bread. Spread almond butter on one side. Enjoy!`
        },
        {
          title: `Overnight Oats`,
          time: `6 hours`,
          instructions: `Pour oats, frozen berries, and soy milk into a single-serving container. Chill overnight.`
        },
        {
          title: `Quesadilla`,
          time: `10 minutes`,
          instructions: `Heat skillet over medium. Sprinkle cheese on one side of tortilla and fold in half. Cook each side until golden brown.`
        }
      ],
      (error, result) => {
        if (error) {
          return console.log(`Unable to insert recipes!`);
        }

        console.log(result.ops);
      }
    );

    db.collection(`ingredients`).insertMany(
      [
        {
          name: `whole-wheat bread`,
          amount: `1 slice`
        },
        {
          name: `almond butter`,
          amount: `2 Tbsp`
        },
        {
          name: `rolled oats`,
          amount: `1/2 cup`
        },
        {
          name: `frozen berries`,
          amount: `1/2 cup`
        },
        {
          name: `soy milk`,
          amount: `3/4 cup`
        },
        {
          name: `tortilla`,
          amount: `1`
        },
        {
          name: `shredded cheese`,
          amount: `1/2 cup`
        }
      ],
      (error, result) => {
        if (error) {
          return console.log(`Unable to insert ingredients!`);
        }

        console.log(result.ops);
      }
    );
  }
);
