import { useState, useEffect } from "react";
import axios from "axios";
import Render from "./components/Render";

const App = () => {
  const [input, setInput] = useState("");
  const [countries, setCountries] = useState([]);

  const handleSearch = (value) => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      const countries = response.data;

      const filteredCountries = countries.filter((country) =>
        country.name.common.toLowerCase().includes(value.toLowerCase())
      );

      if (!value || !filteredCountries) {
        setCountries([]);
      } else {
        setCountries(filteredCountries);
      }
    });
  };

  // Oma toiminnallisuus: kun dokumenttia klikkaa mistä vain tyhjästä kohdasta silloin kun input-muuttujassa on merkkijono, search muuttujan arvo ja maat sisältävä taulukko tyhjennetään
  useEffect(() => {
    const onMouseClicked = () => {
      const activeField = document.activeElement;
      if (activeField === document.body) {
        if (activeField.children[1].id === "root") {
          console.log("tyhjennetty");
          setInput("");
          setCountries([]);
        }
      }
    };
    let document_element = document;

    document_element.addEventListener("mouseup", onMouseClicked, true);
  }, []);

  const handleInputChange = (event) => {
    event.preventDefault();
    const value = event.target.value;
    setInput(value);

    setTimeout(() => {
      handleSearch(value.trimEnd());
    }, "70");
  };

  return (
    <div>
      <div>
        find countries <input value={input} onChange={handleInputChange} />
      </div>

      <div>
        <Render countries={countries} />
      </div>
    </div>
  );
};

export default App;
