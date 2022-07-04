import React from "react";

const Person = ({ person, id, deletePerson }) => {
  return (
    <li className="person">
      {person.name} {person.number}{" "}
      <button onClick={() => deletePerson(person.id)}>delete</button>
    </li>
  );
};

export default Person;
