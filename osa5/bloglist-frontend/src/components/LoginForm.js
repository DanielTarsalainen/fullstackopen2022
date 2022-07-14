import { useState } from "react";

const LoginForm = ({ loginUser }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    loginUser({ username: userName, password: password });
  };

  return (
    <div>
      <h1>login to application</h1>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            value={userName}
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

export default LoginForm;
