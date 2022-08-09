import { useSelector, useDispatch } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";
import Filter from "./Filter";

const AnecdoteList = (props) => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => state.anecdotes);
  const filterSearchWord = useSelector((state) => state.filtering);
  let selectedAnecdotes = null;

  if (filterSearchWord) {
    const filteredList = anecdotes.filter((obj) =>
      obj.content.toLowerCase().includes(filterSearchWord.trimEnd())
    );
    selectedAnecdotes = filteredList;
  } else {
    selectedAnecdotes = anecdotes;
  }

  const handleVote = (anecdote) => {
    dispatch(vote(anecdote));
    dispatch(setNotification(`you voted '${anecdote.content}'`, 5));
  };

  return (
    <div>
      <div>
        <Filter />
      </div>
      {selectedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button
              onClick={() => {
                handleVote(anecdote);
              }}
            >
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
