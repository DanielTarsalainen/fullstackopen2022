import React from "react";
import { connect } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteForm = ({ createNew, setNf }) => {
  const create = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    createNew(content);
    setNf(`new anecdote named '${content}' was created succesfully!`, 5);
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={create}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

const anecdoteFormDispatchToProps = {
  createNew: createAnecdote,
  setNf: setNotification,
};

export default connect(null, anecdoteFormDispatchToProps)(AnecdoteForm);
