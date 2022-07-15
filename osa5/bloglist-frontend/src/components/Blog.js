import { useState } from "react";

const Blog = ({ blog, showAllInfo, toggleInfo, onUpdate, onDelete }) => {
  const [togglableBlog, setTogglableBlog] = useState({
    ...blog,
    showInfo: showAllInfo,
  });

  const toggleChange = (blog) => {
    toggleInfo();
    setTogglableBlog({ ...blog, showInfo: showAllInfo });
  };

  return (
    <div
      style={{
        border: "groove",
        padding: "10px 10px 2px 2px",
        borderWidth: 2,
        marginBottom: 8,
      }}
    >
      {togglableBlog.showInfo && (
        <div>
          {blog.title} {blog.author}
          <button onClick={() => toggleChange(blog)}>hide</button>
          <br></br>
          {blog.url}
          <br></br>
          {blog.likes} <button onClick={() => onUpdate(blog.id)}>like</button>
          <br></br>
          {blog.user.name}
          <br></br>
          <div>
            <button className="removeButton" onClick={() => onDelete(blog.id)}>
              remove
            </button>
          </div>
        </div>
      )}
      {!togglableBlog.showInfo && (
        <li>
          {blog.title} {blog.author} &nbsp;
          <button onClick={() => toggleChange(blog)}>view</button>
        </li>
      )}
    </div>
  );
};

export default Blog;
