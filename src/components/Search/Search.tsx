import { ChangeEvent, FormEvent, ReactElement, useState } from "react";
import "./Search.css";

type searchProps = {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
};
const Search = (props: searchProps): ReactElement => {
  const [searchTerm, setSearchTerm] = useState<string>(props.searchTerm);
  const [valid, setValid] = useState<boolean>(false);
  const [touched, setTouched] = useState<boolean>(false);
  const doSearch = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    console.log(searchTerm);
    if (valid) {
      props.setSearchTerm(searchTerm);
    }
  };
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(event.target.value.trim());
    setTouched(true);
    setValid(event.target.value.trim().length > 0);
  };
  return (
    <div className="searchBox">
      <form onSubmit={doSearch}>
        <label htmlFor="orderId">Order ID:</label>
        <input
          id="orderId"
          type="text"
          value={searchTerm}
          onChange={handleChange}
          className={touched && !valid ? "searchBoxError" : ""}
        />
        {touched && !valid && <span className="searchBoxError">Required</span>}
        <button type="submit">Search Order</button>
      </form>
    </div>
  );
};

export default Search;
