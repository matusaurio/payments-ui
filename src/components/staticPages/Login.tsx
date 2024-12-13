import { useContext } from "react";
import { UserContext, userContextType } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

const Login = (): JSX.Element => {
  const userContext = useContext<userContextType>(UserContext);
  const navigate = useNavigate();
  const handleLogin = () => {
    console.log("login");
    userContext.login({
      id: 1,
      name: "John",
      role: "admin",
    });
    sessionStorage.setItem("theme", "light");
    sessionStorage.setItem(
      "user",
      JSON.stringify({
        id: 1,
        name: "John",
        role: "admin",
      })
    );
    navigate("/");
  };

  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
