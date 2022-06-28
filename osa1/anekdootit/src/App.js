import { useState } from "react";

const MaxVotes = ({ points, anecdotes }) => {
  const maxVal = Math.max(...points);
  if (maxVal > 0) {
    const index = points.indexOf(maxVal);
    return (
      <div>
        <p>{anecdotes[index]}</p>
        <p>Has {maxVal} votes</p>
      </div>
    );
  } else {
    return <p>No votes yet!</p>;
  }
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.",
  ];

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(new Array(6).fill(0));
  const copyOfPoints = [...points];

  const getRandomInt = () => {
    const number = Math.floor(Math.random() * 6);
    setSelected(number);
  };

  const voteAnecdote = () => {
    copyOfPoints[selected] += 1;
    setPoints(copyOfPoints);
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <div>
        <button onClick={voteAnecdote}>vote</button>
        <button onClick={getRandomInt}>next anecdote</button>
      </div>
      <p>has {copyOfPoints[selected]} votes</p>

      <h1>Anecdote with most votes</h1>

      <MaxVotes anecdotes={anecdotes} points={copyOfPoints} />
    </div>
  );
};

export default App;
