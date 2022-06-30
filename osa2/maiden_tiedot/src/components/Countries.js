import { useState } from "react";
import SingleCountry from "./SingleCountry";

const Countries = ({ countries }) => {
  const [clicked, setClicked] = useState(false);
  const [selectedCountry, setSelected] = useState({});

  const toggleClick = (country) => {
    setClicked(true);
    setSelected(country);
  };

  return (
    <div>
      {!clicked ? (
        <div>
          {countries.map((country) => (
            <li key={country.name.common}>
              {country.name.common}
              <button onClick={() => toggleClick(country)}>Show</button>
            </li>
          ))}
        </div>
      ) : (
        <SingleCountry country={selectedCountry} />
      )}
    </div>
  );
};

export default Countries;
