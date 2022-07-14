import { useState, useEffect, useRef } from "react";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import Blogs from "./components/Blogs";
import LoginForm from "./components/LoginForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationStyle, setNotificationStyle] = useState({
    color: "green",
  });
  const noteFromRef = useRef();

  const errorStyle = { color: "red", fontWeight: "bold", borderWidth: "3.5px" };

  useEffect(() => {
    if (user) {
      blogService
        .getAll()
        .then((blogs) =>
          setBlogs(blogs.filter((blog) => blog.user.username === user.username))
        );
    }
  }, [user]);

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
      setBlogs(blogs.concat(blog));
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
              <p>{user.name} logged in</p>
              <button onClick={() => handleLogOut()}>Log out</button>
            </div>

            <Togglable buttonLabel="new note" ref={noteFromRef}>
              <BlogForm createBlog={addBlog} />
            </Togglable>

            <Blogs handleLogOut={handleLogOut} blogs={blogs} />
          </div>
        )}
      </div>
      <div></div>
    </div>
  );
};

export default App;
