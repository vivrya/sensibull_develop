import React, { useEffect, useState } from "react";
import endPoints from "../endpoint";
import { useParams } from "react-router-dom";
import "../css/quotes.css";

const Quotes = () => {
  let { id } = useParams();
  const [sortMethod, setSortMethod] = useState(+1);
  const [quotesData, setQuotesData] = useState([]);

  const getQuotesData = async () => {
    const url = `${endPoints.quotes}${id}`;
    const quotesResponse = await fetch(url);
    const result = await quotesResponse.json();
    let minTimeDiff_temp = Number.MAX_VALUE;
    for (let i = 0; i < result?.payload[id].length; i++) {
      const { valid_till, time } = result.payload[id][i];
      minTimeDiff_temp = Math.min(
        minTimeDiff_temp,
        new Date(valid_till) - new Date(time)
      );
    }
    setTimeout(() => {
      getQuotesData();
    }, minTimeDiff_temp);
    setQuotesData(
      result?.payload[id].sort(
        (a, b) => (new Date(a.time) - new Date(b.time)) * sortMethod
      )
    );
  };

  useEffect(() => {
    getQuotesData();
  }, []);

  useEffect(() => {
    sortData();
  }, [sortMethod]);
  const sortData = () => {
    setQuotesData(
      [...quotesData].sort((a, b) => {
        return (new Date(b.time) - new Date(a.time)) * sortMethod;
      })
    );
  };

  return (
    <div className="container">
      <h1>{id}</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Price</th>
            <th
              className="table-header"
              onClick={() => setSortMethod(-1 * sortMethod)}
              scope="col"
            >
              Time
            </th>
            <th scope="col">Valid Till</th>
          </tr>
        </thead>
        <tbody>
          {quotesData?.map((qt, index) => {
            return (
              <tr key={index}>
                <td>{qt.price}</td>
                <td>{qt.time}</td>
                <td>{qt.valid_till}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Quotes;
