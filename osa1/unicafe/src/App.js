import { useState } from "react";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const StatisticsLine = ({ count, text }) => (
  <tr>
    <td>{text}</td>
    <td>{count}</td>
  </tr>
);

const Statistics = ({ clicks, average, positive, allClicks }) => (
  <table>
    <tbody>
      <StatisticsLine count={clicks.good} text="good" />
      <StatisticsLine count={clicks.neutral} text="neutral" />
      <StatisticsLine count={clicks.bad} text="bad" />
      <StatisticsLine count={allClicks} text="all" />
      <StatisticsLine count={average} text="average" />
      <StatisticsLine count={positive} text="positive" />
    </tbody>
  </table>
);

const App = () => {
  const [clicks, setClicks] = useState({ good: 0, neutral: 0, bad: 0 });
  const [allClicks, setAll] = useState([]);

  const handleGoodClick = () => {
    setClicks({ ...clicks, good: clicks.good + 1 });
    setAll(allClicks.concat(1));
  };

  const handleNeutralClick = () => {
    setClicks({ ...clicks, neutral: clicks.neutral + 1 });
    setAll(allClicks.concat(0));
  };

  const handleBadClick = () => {
    setClicks({ ...clicks, bad: clicks.bad + 1 });
    setAll(allClicks.concat(-1));
  };

  const filterNeg = () => {
    const filter = allClicks.filter((num) => num === 1);
    return filter;
  };

  const returnPositive = () => {
    const filtered = filterNeg();

    if (allClicks.length) {
      return (filtered.length / allClicks.length) * 100 + " %";
    } else {
      return 0;
    }
  };

  const countAverage = () => {
    let sum = 0;

    for (let i = 0; i < allClicks.length; i++) {
      sum += allClicks[i];
    }

    if (allClicks.length) {
      return sum / allClicks.length;
    } else {
      return 0;
    }
  };

  return (
    <div>
      <div>
        <h1>give feedback</h1>
      </div>
      <div>
        <Button handleClick={handleGoodClick} text="good" />
        <Button handleClick={handleNeutralClick} text="neutral" />
        <Button handleClick={handleBadClick} text="bad" />
      </div>
      <div>
        <h1>statistics</h1>
        {allClicks.length !== 0 ? (
          <Statistics
            clicks={clicks}
            average={countAverage()}
            positive={returnPositive()}
            allClicks={allClicks.length}
          />
        ) : (
          <div>
            <p>No feedback given</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
