const express = require("express");
const app = express();
const morgan = require("morgan");

const cors = require("cors");

require("dotenv").config();

const Person = require("./models/person");

const { toPersonObject } = require("./utils");

app.use(express.static("dist"));

app.use(cors());

app.use(express.json());

morgan.token("body", function (request, response) {
  return JSON.stringify(request.body);
});

app.use(
  morgan(":method :url :status :res[name-length] - :response-time ms :body")
);

let persons = [
  {
    name: "Harry Dresden",
    number: "123456789",
    id: 1,
  },
  {
    name: "Harry Carpenter",
    number: "00000000",
    id: 2,
  },
];

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/persons", (request, response) => {
  Person.find({})
    .then((persons) => {
      let personsArray = persons.map(toPersonObject);
      response.json(personsArray);
    })
    .catch((error) => {
      console.log(error);
      response.status(500).end();
    });
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  Person.findOne({ id })
    .then((person) => {
      if (person) {
        response.json(toPersonObject(person));
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => {
      console.log(error);
      response.status(400).send({ error: "malformatted id" });
    });
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

let maxId = 0;

const generateId = () => {
  const currentMaxId =
    persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0;
  maxId = Math.max(maxId, currentMaxId) + 1;
  return maxId;
};

app.post("/api/persons", (request, response) => {
  const body = request.body;

  console.log(request.body);

  if (!body.name) {
    return response.status(400).json({
      error: "name missing",
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number || false,
    id: generateId(),
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
