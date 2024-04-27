const toPersonObject = (person) => {
  let personObject = person.toObject();
  delete personObject._id;
  delete personObject.__v;
  return personObject;
};

module.exports = { toPersonObject };
