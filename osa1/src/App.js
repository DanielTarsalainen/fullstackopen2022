const App = () => {
  const course = "Half Stack application development";
  const exercises1 = 10;
  const exercises2 = 7;
  const exercises3 = 14;

  return (
    <div>
      <Header
        course1="Fundamentals of React"
        course2="Using props to pass data"
        course3="State of a component"
      />
    </div>
  );
};

export default App;

const Header = (props) => {
  return <div> {props.course1}</div>;
};

const Content = (props) => {
  return <div></div>;
};

const Total = (props) => {
  return <div></div>;
};
