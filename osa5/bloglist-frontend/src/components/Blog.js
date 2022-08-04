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
        <div className="blogContainer">
          <div className="fullBlogData">
            <p className="blogData">
              {blog.title} {blog.author} &nbsp;
              <button className="blogButton" onClick={() => toggleChange(blog)}>
                hide
              </button>
            </p>
            <p className="blogData"> {blog.url}</p>
            <p className="blogData">
              {blog.likes} &nbsp;
              <button className="blogButton" onClick={() => onUpdate(blog.id)}>
                like
              </button>
            </p>
            <p className="blogData"> {blog.user.name}</p>
          </div>
          <div>
            <button className="removeButton" onClick={() => onDelete(blog.id)}>
              remove
            </button>
          </div>
        </div>
      )}
      {!togglableBlog.showInfo && (
        <li className="limitedBlog">
          {blog.title} {blog.author} &nbsp;
          <button onClick={() => toggleChange(blog)}>view</button>
        </li>
      )}
    </div>
  );
};

export default Blog;
