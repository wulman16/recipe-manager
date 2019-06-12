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

    const updatePromise = db.collection(`ingredients`).updateMany(
      {
        isVegan: false
      },
      {
        $set: {
          isVegan: true
        }
      }
    );

    updatePromise
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.log(error);
      });

    // const updatePromise = db.collection(`users`).updateOne(
    //   {
    //     _id: new ObjectID(`5d0144c76d28c9d877805cc4`)
    //   },
    //   {
    //     $inc: {
    //       age: -8
    //     }
    //   }
    // );

    // updatePromise
    //   .then(result => {
    //     console.log(result);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  }
);
