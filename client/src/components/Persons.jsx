const Persons = ({ persons, searchInput, deletePerson, updatePerson }) => {
  const filterPersons = (persons, searchInput) => {
    return persons.filter((person) =>
      person.name.toLowerCase().includes(searchInput.toLowerCase())
    );
  };

  return (
    <div>
      {filterPersons(persons, searchInput).map((person) => (
        <div
          key={person.name}
          style={{ display: "flex", alignItems: "center" }}
        >
          <p style={{ marginRight: "8px" }}>
            <span>{person.name}</span>
            <span> </span>
            <span>{person.number}</span>
          </p>
          <button
            style={{ marginRight: "8px" }}
            onClick={() => deletePerson(person.id)}
          >
            delete
          </button>
          <button onClick={() => updatePerson(person.id, person)}>update</button>
        </div>
      ))}
    </div>
  );
};

export default Persons;
