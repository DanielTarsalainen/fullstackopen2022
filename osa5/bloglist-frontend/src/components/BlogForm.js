import { useState } from "react";

const BlogForm = ({ createBlog }) => {
  const [newBlog, setBlog] = useState({ title: "", author: "", url: "" });

  const onTitleChange = (event) => {
    event.preventDefault();
    setBlog({ ...newBlog, title: event.target.value });
  };

  const onAuthorChange = (event) => {
    event.preventDefault();
    setBlog({ ...newBlog, author: event.target.value });
  };

  const onUrlChange = (event) => {
    event.preventDefault();
    setBlog({ ...newBlog, url: event.target.value });
  };

  const addBlog = (event) => {
    event.preventDefault();
    createBlog(newBlog);
  };

  return (
    <div>
      <h1>create new</h1>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            id="title"
            value={newBlog.title}
            onChange={onTitleChange}
          ></input>
        </div>
        <div>
          author:
          <input
            id="author"
            value={newBlog.author}
            onChange={onAuthorChange}
          ></input>
        </div>
        <div>
          url:
          <input id="url" value={newBlog.url} onChange={onUrlChange}></input>
        </div>

        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default BlogForm;
