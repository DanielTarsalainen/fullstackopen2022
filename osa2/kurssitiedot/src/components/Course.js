const Courses = ({ courses }) => {
  return (
    <div>
      {courses.map((course) => (
        <li key={course.id}>
          <Header name={course.name} />
          <Content content={course.parts} />
        </li>
      ))}
    </div>
  );
};

//rsc for component shortcut
const Header = ({ name }) => {
  return (
    <div>
      <h1>{name}</h1>
    </div>
  );
};

const Content = ({ content }) => {
  //prev is at first 0, and 0 at the end is the initial value
  const sumOfExercises = content.reduce(
    (prev, curr) => console.log(prev, curr) || prev + curr.exercises,
    0
  );

  return (
    <div>
      {content.map((part) => (
        <ul key={part.id}>
          <Part content={part} />
        </ul>
      ))}
      <b>total of {sumOfExercises} exercises </b>
      <br />
      <br />
    </div>
  );
};

const Part = ({ content }) => {
  return (
    <li>
      {content.name} {content.exercises}
    </li>
  );
};

export default Courses;
