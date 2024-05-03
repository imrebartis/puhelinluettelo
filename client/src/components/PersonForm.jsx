const PersonForm = ({
  newName,
  newNumber,
  handleNameChange,
  handleNumberChange,
  addPerson,
}) => (
  <form>
    <div>
      name: <input id="name" name="name" value={newName} onChange={handleNameChange} autoComplete="off" />
    </div>
    <div>
      number: <input id="number" name="number" value={newNumber} onChange={handleNumberChange} autoComplete="off" />
    </div>
    <div>
      <button type='submit' onClick={addPerson}>
        add
      </button>
    </div>
  </form>
);

export default PersonForm;
