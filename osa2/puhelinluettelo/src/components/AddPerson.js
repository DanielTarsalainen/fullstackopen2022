import React from "react";

const AddPerson = ({
  name,
  number,
  onNameChange,
  onNumberChange,
  addOrUpdate,
}) => {
  return (
    <div>
      <form id="addPerson">
        <div>
          name: &nbsp;
          <input
            value={name}
            placeholder="Type name here"
            onChange={onNameChange}
          />
        </div>
        <div>
          number: &nbsp;
          <input
            value={number}
            placeholder="Type number here"
            onChange={onNumberChange}
          />
        </div>
        <div>
          <button onClick={addOrUpdate} type="submit">
            add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPerson;
