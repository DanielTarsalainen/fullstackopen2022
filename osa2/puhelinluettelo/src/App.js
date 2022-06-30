import { useEffect, useState } from "react";
import Persons from "./components/Persons";
import AddPerson from "./components/AddPerson";
import Filter from "./components/Filter";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [filtered, setFiltered] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      const notes = response.data;
      setPersons(response.data);
    });
  }, []);

  const handleNameChange = (event) => {
    event.preventDefault();
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    event.preventDefault();
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    event.preventDefault();
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

  // Oma toiminnallisuus: kun dokumenttia klikkaa mistä vain tyhjästä kohdasta silloin kun search-muuttujassa on merkkijono, search muuttuja tyhjennetään
  useEffect(() => {
    const onMouseClicked = () => {
      const activeField = document.activeElement;
      if (activeField === document.body) {
        if (activeField.children[1].id === "root") {
          console.log("tyhjennetty");
          setSearch("");
        }
      }
    };
    let document_element = document;
    document_element.addEventListener("mouseup", onMouseClicked, true);
  }, []);

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

export default App;
