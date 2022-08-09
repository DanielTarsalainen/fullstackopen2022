import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      const obj = action.payload;
      const foundObj = state.find((object) => object.content === obj.content);
      state.splice(state.indexOf(foundObj), 1, obj);
      state
        .sort(({ content: a }, { content: b }) => a - b)
        .reverse()
        .sort(({ votes: a }, { votes: b }) => a - b)
        .reverse();
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload
        .sort(({ votes: a }, { votes: b }) => a - b)
        .reverse();
    },
  },
});

export const { voteAnecdote, appendAnecdote, setAnecdotes } =
  anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAllAnecdotes();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNewAnecdote(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const vote = (content) => {
  return async (dispatch) => {
    const updatedAnecdotes = await anecdoteService.voteAnecdote(content);
    dispatch(voteAnecdote(updatedAnecdotes));
  };
};

export default anecdoteSlice.reducer;
