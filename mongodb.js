const { MongoClient, ObjectID } = require(`mongodb`);

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

    db.collection(`ingredients`)
      .find({ isVegan: false })
      .toArray((error, ingredients) => {
        console.log(ingredients);
      });
  }
);
