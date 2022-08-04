import { useState } from "react";
import PropTypes from "prop-types";

const LoginForm = ({ loginUser }) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    loginUser({ username: username, password: password });
  };

  return (
    <div>
      <h1>login to application</h1>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            value={username}
            onChange={({ target }) => setUserName(target.value)}
          ></input>
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          ></input>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  loginUser: PropTypes.func.isRequired,
};

export default LoginForm;
