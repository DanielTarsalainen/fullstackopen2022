const Hello = (props) => {
  return (
    <div>
      <p>Hei maailma!</p>
      <p>
        Hello {props.name}, you are {props.age} years old
      </p>
    </div>
  );
};

const App = () => {
  const now = new Date();
  const a = 10;
  const b = 20;

  return (
    <div>
      <p>Hello world, it is {now.toString()}</p>
      <p>
        {a} plus {b} is {a + b}
      </p>
      <Hello name="Maya" age={26 + 10} />
    </div>

    /*
      Vaihtoehtoinen tapa käyttäen fragmentteja:

      <>
        <h1>Greetings</h1>
        <Hello name="Maya" age={26 + 10} />
        <Hello name={name} age={age} />
        <Hello name={name} age={age} />
        <Footer/>
      </>

    */
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
