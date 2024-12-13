import "./App.css";
import PageHeader from "./components/pageHeader/PageHeader";
import AddTransactionPage from "./components/AddTransaction/AddTransactionPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FindTransactionPage from "./components/FindTransactionPage/FindTransactionPage";
import HomePage from "./components/staticPages/HomePage";
import PageNotFound from "./components/staticPages/PageNotFound";
import { UserContext, userType } from "./context/userContext";
import { useState } from "react";
import Login from "./components/staticPages/Login";
import DemoUseRef from "./components/staticPages/DemoUseRef";

function App() {
  const [user, setUser] = useState<userType>({
    id: 0,
    name: "",
    role: "",
  });
  const login = (user: userType) => {
    setUser(user);
  };
  const logout = () => {
    setUser({
      id: 0,
      name: "",
      role: "",
    });
    sessionStorage.removeItem("user");
  };
  return (
    <UserContext.Provider value={{ ...user, login: login, logout: logout }}>
      <BrowserRouter>
        <PageHeader />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add" element={<AddTransactionPage />} />
          <Route path="/find" element={<FindTransactionPage />} />
          <Route path="/find/:orderId" element={<FindTransactionPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<PageNotFound />} />
          <Route path="/demo" element={<DemoUseRef />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
