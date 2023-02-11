import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [error, setError] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const handleClick = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/users/1"
      );
      // console.log(data);
    
      setUser(data);
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };
  return (
    <div className="login">
      <form>
        <span>{user.name}</span>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button disabled={!username || !password} onClick={handleClick}>
          {loading ? "Please wait" : "Login"}
        </button>
        <span
          data-testId="error"
          style={{ visibility: error ? "visible" : "hidden" }}
        >
          Something went wrong!!!
        </span>
      </form>
    </div>
  );
};

export default Login;
