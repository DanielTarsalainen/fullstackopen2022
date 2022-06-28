import React from "react";
import { useState } from "react";

// const Button = ({ handleClick, text }) => (
//   <button onClick={handleClick}> {text} </button>
// );

const Display = ({ value }) => <>{value}</>;

const History = ({ allClicks }) => {
  if (allClicks.length === 0) {
    return <div> the app is used by pressing the buttons</div>;
  }

  return <div>button press history: {allClicks.join(" ")}</div>;
};

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const App = () => {
  const [clicks, setClicks] = useState({ left: 0, right: 0 });
  const [allClicks, setAll] = useState([]);

  const handleLeftClick = () => {
    // State changes have to be done with copies of the orginal state!
    setClicks({
      ...clicks,
      left: clicks.left + 1,
    });
    setAll(allClicks.concat("L"));
  };

  const handleRightClick = () => {
    setClicks({
      ...clicks,
      right: clicks.right + 1,
    });
    setAll(allClicks.concat("R"));
  };

  return (
    <div>
      <div>
        <Display value={clicks.left} />
        <Button handleClick={handleLeftClick} text="left" />
        <Button handleClick={handleRightClick} text="right" />
        <Display value={clicks.right} />
        <History allClicks={allClicks} />
      </div>
    </div>
  );
};

export default App;

/*
Käännösvaiheen jälkeen (koodi käännetty JSX:stä Javascriptiksi. Tämän hoitaa Babel).
JSX lähellä palvelimella käytettäviä templating-kieliä kuten Java Springin yhteydessä käytettävää Thymeleafia. JSX:ssä tagit tulee sulkea toisin kuin vaikka HTML:ssä!


const App = () => {
  const now = new Date()
  const a = 10
  const b = 20
  return React.createElement(
    'div',
    null,
    React.createElement(
      'p', null, 'Hello world, it is ', now.toString()
    ),
    React.createElement(
      'p', null, a, ' plus ', b, ' is ', a + b
    )
  )
}

*/
