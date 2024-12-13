import { ReactElement, useState } from "react";
import Search from "../Search/Search";
import Transactions from "../Transactions/Transactions";
import { useNavigate } from "react-router-dom";

const FindTransactionPage = (): ReactElement => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  console.log("FindTransactionPage invoked with searchTerm: ", searchTerm);

  const navigate = useNavigate();

  const applySearchTerm = (searchTerm: string): void => {
    setSearchTerm(searchTerm);
    navigate(`/find/${searchTerm}`);
  };
  return (
    <>
      <Search searchTerm={searchTerm} setSearchTerm={applySearchTerm} />
      <Transactions />
    </>
  );
};

export default FindTransactionPage;
