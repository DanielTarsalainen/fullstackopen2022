import React from "react";
import { setSearchWord } from "../reducers/filterReducer";
import { connect } from "react-redux";

const Filter = ({ setFilterSearch }) => {
  const handleChange = (event) => {
    event.preventDefault();
    const search = event.target.value;
    setFilterSearch(search.toLowerCase());
  };

  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

const filterDispatchToProps = {
  setFilterSearch: setSearchWord,
};

export default connect(null, filterDispatchToProps)(Filter);
