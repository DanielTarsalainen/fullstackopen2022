import React from "react";

const Filter = ({ onChange, value }) => {
  return (
    <div>
      <form name="input">
        <div id="filterInput" value="def">
          filter shown with &nbsp;
          <input
            placeholder="Type name here"
            value={value}
            onChange={onChange}
          ></input>
        </div>
      </form>
    </div>
  );
};

export default Filter;
