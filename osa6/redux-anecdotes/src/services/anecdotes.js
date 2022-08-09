import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAllAnecdotes = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNewAnecdote = async (content) => {
  const obj = { content, votes: 0 };
  const response = await axios.post(baseUrl, obj);
  return response.data;
};

const voteAnecdote = async (content) => {
  const updatedVotes = content.votes;
  const newObj = { ...content, votes: updatedVotes + 1 };
  const response = await axios.put(`${baseUrl}/${newObj.id}`, newObj);
  return response.data;
};

const anecdoteService = {
  getAllAnecdotes: getAllAnecdotes,
  createNewAnecdote: createNewAnecdote,
  voteAnecdote: voteAnecdote,
};

export default anecdoteService;
