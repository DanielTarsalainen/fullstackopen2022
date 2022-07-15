import { useState } from "react";
import Blog from "./Blog";

const Blogs = ({ blogs, updateBlog, deleteBlog }) => {
  const [showAllInfo, setShowAllInfo] = useState(false);

  const toggleInfo = () => {
    setShowAllInfo(!showAllInfo);
  };

  const onUpdate = (id) => {
    updateBlog(id);
  };

  const onDelete = (id) => {
    deleteBlog(id);
  };

  return (
    <div>
      <div>
        {blogs.map((blog) => (
          <ul key={blog.id}>
            <Blog
              blog={blog}
              toggleInfo={toggleInfo}
              showAllInfo={showAllInfo}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          </ul>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
