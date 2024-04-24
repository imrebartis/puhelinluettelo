const mongoose = require("mongoose");

const password = process.argv[2];

const url = `mongodb+srv://imbartis:${password}@cluster0.yilkjhg.mongodb.net/peopleApp?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  id: Number,
});

const Person = mongoose.model("Person", personSchema);

mongoose
  .connect(url)
  .then(() => {
    console.log("connected to MongoDB");

    if (process.argv.length === 5) {
      Person.find({}).then((people) => {
        const maxId =
          people.length > 0 ? Math.max(...people.map((p) => p.id)) : 0;
        const newId = maxId + 1;

        const person = new Person({
          name: process.argv[3],
          number: process.argv[4],
          id: newId,
        });

        person.save().then(() => {
          console.log(
            `added ${person.name} number ${person.number} to phonebook`
          );
          mongoose.connection.close();
        });
      });
    } else if (process.argv.length === 3) {
      console.log("phonebook:");
      Person.find({}).then((people) => {
        people.forEach((person) => {
          console.log(person.name, person.number);
        });
        mongoose.connection.close();
      });
    } else {
      console.log(
        "Please provide as an argument: node mongo.js <password> or node mongo.js <password> <name> <number>"
      );
      process.exit(1);
    }
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });
