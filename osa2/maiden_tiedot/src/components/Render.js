import React from "react";
import Countries from "./Countries";
import SingleCountry from "./SingleCountry";

const Render = ({ countries }) => {
  const array_length = countries.length;

  if (array_length > 1 && array_length <= 10) {
    return <Countries countries={countries} />;
  } else if (countries.length === 1) {
    return <SingleCountry country={countries[0]} />;
  } else if (countries.length > 10) {
    return <p>Too many results, specify another filter!</p>;
  } else if (countries.length === 0) {
    return <p>No results!</p>;
  }
};

export default Render;
