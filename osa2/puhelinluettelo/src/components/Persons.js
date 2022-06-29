import React from "react";

const Persons = ({ search, persons, filtered }) => {
  return (
    <div>
      <div>
        {search === "" ? (
          <div>
            {persons.map((person) => (
              <li key={person.name}>
                {person.name} {person.number}
              </li>
            ))}
          </div>
        ) : (
          <div>
            {filtered.map((person) => (
              <li key={person.name}>
                {person.name} {person.number}
              </li>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Persons;
