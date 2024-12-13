import { ReactElement, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/userContext";

const Menu = (): ReactElement => {
  const userContext = useContext(UserContext);
  return (
    <ul className="nav">
      <li>
        <Link to="/find">Find a transaction</Link>
      </li>
      <li>
        <Link to="/add">New Transaction</Link>
      </li>
      <li>
        {userContext.id !== 0 ? (
          <Link to="/" onClick={userContext.logout}>
            Logout
          </Link>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </li>
    </ul>
  );
};

export default Menu;
