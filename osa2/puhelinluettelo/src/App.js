import { useEffect, useState } from "react";
import Person from "./components/Person";
import AddPerson from "./components/AddPerson";
import Filter from "./components/Filter";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationColor, setNotificationColor] = useState({
    color: "green",
  });

  useEffect(() => {
    personService.getAll().then((initialNotes) => {
      setPersons(initialNotes);
    });
  }, []);

  const handleNameChange = (event) => {
    event.preventDefault();
    const name = event.target.value;

    setNewName(name);
  };

  const handleNumberChange = (event) => {
    event.preventDefault();
    const number = event.target.value;

    setNewNumber(number);
  };

  const handleFilterChange = (event) => {
    event.preventDefault();
    const typedSearch = event.target.value;

    setSearch(typedSearch);

    if (typedSearch !== "") {
      filterNumbersByName(typedSearch);
    }
  };

  const filterNumbersByName = (val) => {
    const filteredPersons = persons.filter((person) =>
      person.name.toLowerCase().includes(val.toLowerCase().trim())
    );
    setFiltered(filteredPersons);
  };

  const addPerson = (newObject) => {
    personService
      .create(newObject)
      .then((newData) => {
        setPersons(persons.concat(newData));

        setNotificationMessage(`Added ${newObject.name}!`);

        setTimeout(() => {
          setNotificationMessage(null);
        }, 3000);
      })
      .catch((error) => {
        setNotificationColor({ color: "red" });
        setNotificationMessage(error.response.data.error);

        setTimeout(() => {
          setNotificationMessage(null);
          setNotificationColor({ color: "green" });
        }, 3000);
      });
  };

  const updatePerson = (newObject) => {
    const person = persons.find((n) => n.name === newObject.name);
    const changedPerson = { ...person, number: newObject.number };

    personService
      .update(person.id, changedPerson)
      .then((returnedPerson) => {
        setPersons(
          persons.map((person) =>
            person.name !== newObject.name ? person : returnedPerson
          )
        );
        setNotificationMessage(`Updated ${newObject.name}!`);

        setTimeout(() => {
          setNotificationMessage(null);
        }, 3000);
      })
      .catch((error) => {
        setNotificationColor({ color: "red" });
        setNotificationMessage(error.response.data.error);

        setTimeout(() => {
          setNotificationMessage(null);
          setNotificationColor({ color: "green" });
        }, 3000);
      });
  };

  const filterPerson = (object) => {
    const filtered = persons.filter((person) => person.name !== object.name);
    setPersons(filtered);
  };

  const deletePerson = (id, name, selectedPerson) => {
    personService
      .deleteItem(id)
      .then(() => {
        setNotificationMessage(`Deleted ${name}!`);
        filterPerson(selectedPerson);

        setTimeout(() => {
          setNotificationMessage(null);
        }, 3000);
      })
      .catch((error) => {
        setNotificationColor({ color: "red" });

        setNotificationMessage(
          `Information of ${selectedPerson.name} was already been removed from server`
        );

        setTimeout(() => {
          setNotificationMessage(null);
          setNotificationColor({ color: "green" });
          filterPerson(selectedPerson);
        }, 3000);
      });
  };

  const confirmUpdate = (newObject, newName) => {
    const confirm = window.confirm(
      `${newName} is already added to phonebook, replace old number with a new one?`
    );
    if (confirm) {
      updatePerson(newObject);
    } else {
      alert("Something went wrong!");
    }
  };

  const confirmDelete = (selectedPerson) => {
    const confirm = window.confirm(
      `Do you really wanna delele '${selectedPerson.name}'?`
    );

    if (confirm) {
      deletePerson(selectedPerson.id, selectedPerson.name, selectedPerson);
    } else {
      alert(`${newName} wasn't deleted!`);
    }
  };

  const AddOrUpdatePerson = (event) => {
    event.preventDefault();
    const newObject = { name: newName.trim(), number: newNumber.trim() };

    if (persons.find((element) => element.name === newName)) {
      confirmUpdate(newObject, newName);
    } else {
      addPerson(newObject);
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
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} color={notificationColor} />

      <Filter onChange={handleFilterChange} value={search} />

      <h2>add a new</h2>

      <AddPerson
        name={newName}
        number={newNumber}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
        addOrUpdate={AddOrUpdatePerson}
      />

      <h2>Numbers</h2>

      {search === "" ? (
        <div>
          <div>
            {persons.map((person) => (
              <ul key={person.name}>
                <Person
                  person={person}
                  personId={person.id}
                  deletePerson={() => confirmDelete(person)}
                />
              </ul>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <div>
            {filtered.map((person) => (
              <ul key={person.name}>
                <li className="person">
                  {person.name} {person.number}
                </li>
              </ul>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
