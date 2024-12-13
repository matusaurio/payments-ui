import { ReactElement, useContext } from "react";
import "./PageHeader.css";
import Menu from "./Menu";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/userContext";

const PageHeader = (): ReactElement => {
  const userContext = useContext(UserContext);
  return (
    <>
      <div className="pageHeader">
        <h1>
          <Link to="/">Payments Application</Link>
        </h1>
        {userContext.id !== 0 && <p>{userContext.name}</p>}
        <Menu />
      </div>
    </>
  );
};

export default PageHeader;
