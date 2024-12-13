import { ChangeEvent, useReducer, useState } from "react";
import { addNewTransaction, PaymentType } from "../../data/DataFunctions";

const AddTransactions = (): JSX.Element => {
  const formReducer = (
    state: PaymentType,
    data: { field: string; value: string }
  ): PaymentType => {
    return { ...state, [data.field]: data.value };
  };

  const initialNewTransactionState: PaymentType = {
    id: 0,
    orderId: "",
    date: new Date().toISOString().slice(0, 10),
    amount: 0,
    country: "USA",
    currency: "USD",
    taxCode: 0,
    taxRate: 0.21,
    type: "SALE",
  };

  const [newTransaction, dispatch] = useReducer(
    formReducer,
    initialNewTransactionState
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    dispatch({ field: event.target.id, value: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    console.log(newTransaction);
    setMessage("Saving transaction...");
    const response = addNewTransaction(newTransaction);
    response
      .then((result) => {
        if (result.status === 200) {
          setMessage("Transaction saved");
        } else {
          setMessage("Error saving transaction " + result.statusText);
        }
      })
      .catch((error) => {
        setMessage("Error saving transaction " + error);
      });
  };

  const [message, setMessage] = useState<string>("");

  return (
    <>
      <form className="addTransactionsForm" onSubmit={handleSubmit}>
        <h2>New transaction</h2>
        <label htmlFor="orderId">Order Id</label>
        <input
          type="text"
          id="orderId"
          onChange={handleChange}
          value={newTransaction.orderId}
        />
        <br />
        <label htmlFor="date">Date</label>
        <input
          type="date"
          id="date"
          onChange={handleChange}
          value={newTransaction.date}
        />
        <br />
        <label htmlFor="country">Country</label>
        <input
          type="text"
          id="country"
          onChange={handleChange}
          value={newTransaction.country}
        />
        <br />
        <label htmlFor="currency">Currency</label>
        <input
          type="text"
          id="currency"
          onChange={handleChange}
          value={newTransaction.currency}
        />
        <br />
        <label htmlFor="amount">Amount</label>
        <input
          type="text"
          id="amount"
          onChange={handleChange}
          value={newTransaction.amount}
        />
        <br />
        <label htmlFor="taxCode">Tax Code</label>
        <input
          type="text"
          id="taxCode"
          onChange={handleChange}
          value={newTransaction.taxCode}
        />
        <br />
        <label htmlFor="taxRate">Tax Rate</label>
        <input
          type="text"
          id="taxRate"
          onChange={handleChange}
          value={newTransaction.taxRate}
        />
        <br />
        <label htmlFor="type">Type</label>
        <input
          type="text"
          id="type"
          onChange={handleChange}
          value={newTransaction.type}
        />
        <br />
        <button type="submit">Save</button>
      </form>
      <div>{message}</div>
    </>
  );
};

export default AddTransactions;
