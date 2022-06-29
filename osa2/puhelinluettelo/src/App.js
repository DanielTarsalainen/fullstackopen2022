import { useEffect, useState } from "react";
import Persons from "./components/Persons";
import AddPerson from "./components/AddPerson";
import Filter from "./components/Filter";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);

  const [filtered, setFiltered] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setSearch(event.target.value);

    if (event.target.value !== "") {
      filterNumbersByName(event.target.value);
    }
  };

  const filterNumbersByName = (val) => {
    const filteredPersons = persons.filter((person) =>
      person.name.toLowerCase().includes(val.toLowerCase())
    );
    setFiltered(filteredPersons);
  };

  const addPerson = (event) => {
    event.preventDefault();

    if (persons.find((element) => element.name === newName)) {
      alert(`${newName} is already added to phonebook!`);
    } else {
      setPersons(persons.concat({ name: newName, number: newNumber }));
    }

    setNewName("");
    setNewNumber("");
  };

  // Own functionality: when <body> element is clicked, input field for filter is emptied.
  useEffect(() => {
    let body = document.getElementById("body");
    body.addEventListener("mouseup", onMouseClicked, true);
  }, []);

  const onMouseClicked = () => {
    const activeField = document.activeElement;
    if (activeField === document.body) {
      if (activeField.children[1].id === "root") {
        setSearch("");
      }
    }
  };

  return (
    <div id="body">
      <h2>Phonebook</h2>

      <Filter onChange={handleFilterChange} value={search} />

      <h2>add a new</h2>

      <AddPerson
        name={newName}
        number={newNumber}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
        addPerson={addPerson}
      />

      <h2>Numbers</h2>

      <Persons search={search} persons={persons} filtered={filtered} />
    </div>
  );
};

// Komponenttien eriytys:

/*
3. kaikki henkilöt renderöivä komponentti
4. yksittäisen henkilön renderöivä komponentti
*/

export default App;
