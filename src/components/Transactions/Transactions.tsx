import { ChangeEvent, useEffect, useState } from "react";
import {
  getAllPaymentsAxiosVersion,
  PaymentType,
} from "../../data/DataFunctions";
import PaymentTableRow from "../PaymentTableRow/PaymentTableRow";
import "./Transactions.css";
import { useNavigate, useParams } from "react-router-dom";

const Transactions = (): JSX.Element => {
  // const payments = getAllPayments();
  const [payments, setPayments] = useState<PaymentType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedOrderId, setSelectedOrderId] = useState<string>("");

  const navigate = useNavigate();

  const loadData = () => {
    getAllPaymentsAxiosVersion()
      .then((response) => {
        setPayments(response.data);
        setLoading(false);
        setSelectedCountry("Select");
      })
      .catch((error) => console.log("something went wrong ", error));
  };

  useEffect(loadData, []);

  const params = useParams();
  console.log("in transactions component: ", params);
  console.log(params.orderId);
  //   const desiredOrder: string = params.orderId != undefined ? params.orderId : "";
  const desiredOrder: string = params.orderId ?? "";
  //   a setter function should only be called either in a button click, or in useEffect, or inside an if
  if (desiredOrder !== selectedOrderId) {
    setSelectedOrderId(desiredOrder);
  }

  const countries: string[] = payments.map((payment) => payment.country);
  //const uniqueCountries : string[] = countries.filter((country, index) => countries.indexOf(country) === index);
  const uniqueCountries: string[] = Array.from(new Set(countries));

  const countryOptions: JSX.Element[] = uniqueCountries.map((c) => (
    <option key={c} value={c}>
      {c}
    </option>
  ));

  const [selectedCountry, setSelectedCountry] = useState<string>("Select");

  const changeCountry = (e: ChangeEvent<HTMLSelectElement>) => {
    const option = e.target.options.selectedIndex;
    navigate("/find");
    setSelectedCountry(uniqueCountries[option - 1]);
  };

  const countrySelector: JSX.Element = (
    <select id="countrySelector" onChange={changeCountry}>
      {countryOptions}
    </select>
  );

  return (
    <>
      {loading && <p>Loading...</p>}
      <>
        <div className="transactionsCountrySelector">
          Select country: {countrySelector}
        </div>
        <table className="transactionsTable">
          <thead>
            <tr>
              <th>Id</th>
              <th>orderId</th>
              <th>Date</th>
              <th>Country</th>
              <th>Currency</th>
              <th>Amount</th>
            </tr>
          </thead>
          {!loading && (
            <tbody>
              {selectedOrderId !== "" &&
                payments
                  .filter((payment) => payment.orderId === selectedOrderId)
                  .map((payment) => (
                    <PaymentTableRow key={payment.id} {...payment} />
                  ))}
              {selectedOrderId === "" &&
                payments
                  .filter((payment) => payment.country === selectedCountry)
                  .map((payment) => (
                    <PaymentTableRow key={payment.id} {...payment} />
                  ))}
            </tbody>
          )}
        </table>
      </>
    </>
  );
};

export default Transactions;
