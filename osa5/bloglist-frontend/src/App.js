import { useState, useEffect, useRef } from "react";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import Blogs from "./components/Blogs";
import LoginForm from "./components/LoginForm";

const App = () => {
  const [allBlogs, setAllBlogs] = useState([]);
  const [ownBlogs, setOwnBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationStyle, setNotificationStyle] = useState({
    color: "green",
  });
  const noteFromRef = useRef();

  const errorStyle = { color: "red", fontWeight: "bold", borderWidth: "3.5px" };

  useEffect(() => {
    blogService.getAll().then((blogs) => setAllBlogs(blogs));
  }, []);

  useEffect(() => {
    if (user && allBlogs) {
      blogService.getAll().then((blogs) =>
        setOwnBlogs(
          blogs
            .filter((blog) => blog.user.username === user.username)
            .sort((a, b) => a.likes - b.likes)
            .reverse()
        )
      );
    }
  }, [user, allBlogs]);

  useEffect(() => {
    const localLoggedUserJSON = window.localStorage.getItem("loggedUser");

    if (localLoggedUserJSON) {
      const localUser = JSON.parse(localLoggedUserJSON);
      setUser(localUser);
      blogService.setToken(localUser.token);
    }
  }, []);

  const setNotification = (message, error) => {
    setNotificationMessage(message);
    if (error) {
      setNotificationStyle(error);
    }

    setTimeout(() => {
      setNotificationMessage(null);
      setNotificationStyle({ color: "green" });
    }, 3000);
  };

  const loginUser = async (newUser) => {
    try {
      const user = await loginService.login(newUser);
      setNotification("Login succeeded!");
      window.localStorage.setItem("loggedUser", JSON.stringify(user));

      setTimeout(() => {
        blogService.setToken(user.token);
        setUser(user);
      }, 1000);
    } catch (e) {
      setNotification("wrong username or password!", errorStyle);
    }
  };

  const addBlog = async (newBlog) => {
    try {
      const blog = await blogService.createBlog(newBlog);
      setAllBlogs(allBlogs.concat(blog));
      setNotification(
        `a new blog: ${newBlog.title} by ${newBlog.author} was added!`
      );
      noteFromRef.current.toggleVisibility();
    } catch (e) {
      setNotification(
        `Failed to add the following blog ${newBlog.title}`,
        errorStyle
      );
    }
  };

  const updateBlog = async (id) => {
    const foundBlog = ownBlogs.find((blog) => blog.id === id);
    const updatedBlog = { ...foundBlog, likes: foundBlog.likes + 1 };

    try {
      await blogService.updateBlog(foundBlog.id, updatedBlog);
      const updatedBlogs = ownBlogs.map((obj) => {
        if (obj.id === foundBlog.id) {
          return updatedBlog;
        }
        return obj;
      });

      setAllBlogs(updatedBlogs);
    } catch (e) {
      setNotification(
        `a blog titled ${foundBlog.title} couldn't be updated`,
        errorStyle
      );
    }
  };

  const deleteBlog = async (id) => {
    const foundBlog = ownBlogs.find((blog) => blog.id === id);

    const confirmed = window.confirm(
      `Remove blog ${foundBlog.title} by ${foundBlog.author}`
    );

    if (confirmed) {
      try {
        await blogService.deleteBlog(id);
        const filteredBlogs = ownBlogs.filter((obj) => obj.id !== id);
        setNotification(
          `a blog titled: ${foundBlog.title} was deleted succesfully!`
        );
        setAllBlogs(filteredBlogs);
      } catch (e) {
        setNotification("Failed to remove the item", errorStyle);
      }
    }
  };

  const handleLogOut = () => {
    window.localStorage.removeItem("loggedUser");
    setUser(null);
  };

  return (
    <div>
      <Notification
        notificationMessage={notificationMessage}
        notificationColor={notificationStyle}
      />
      <div>
        {user === null && <LoginForm loginUser={loginUser} />}
        {user !== null && (
          <div>
            <h1>blogs</h1>

            <div>
              {user.name} logged in &nbsp;
              <button onClick={() => handleLogOut()}>Log out</button>
            </div>
            <br></br>

            <Togglable buttonLabel="new note" ref={noteFromRef}>
              <BlogForm createBlog={addBlog} />
            </Togglable>

            <Blogs
              handleLogOut={handleLogOut}
              blogs={ownBlogs}
              user={user}
              updateBlog={updateBlog}
              deleteBlog={deleteBlog}
            />
          </div>
        )}
      </div>
      <div></div>
    </div>
  );
};

export default App;
