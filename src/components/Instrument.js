import React, { useEffect, useState, useMemo } from "react";
import Table from "./Table";
import { Link } from "react-router-dom";
import endPoints from "../endpoint";

const Instrument = () => {
  const modifiedData = [];

  const [csvData, setCsvData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const getInstrumentData = async () => {
    const url = endPoints.instruments;
    const response = await fetch(url);
    const res = await response.text();
    const dataArray = res?.split("\n")?.map((row) => row.split(","));
    setCsvData(dataArray);
    setIsLoading(false);
  };
  console.log("csv from papa parse", csvData);
  const modifyCsvData = () => {
    for (var i = 1; i < csvData.length - 1; i++) {
      let show = {};
      show["Symbol"] = csvData[i][0];
      show["Name"] = csvData[i][1];
      show["Sector"] = csvData[i][2];
      show["ValidTill"] = csvData[i][3];
      modifiedData.push(show);
    }
    return modifiedData;
  };

  useEffect(() => {
    getInstrumentData();
  }, []);

  if (isLoading === false) modifyCsvData();

  const columns = useMemo(() => [
    {
      Header: " ",
      columns: [
        {
          Header: "Symbol",
          accessor: "Symbol",
          Cell: (e) => <Link to={e.value}> {e.value} </Link>,
        },
        {
          Header: "Name",
          accessor: "Name",
        },
        {
          Header: "Sector",
          accessor: "Sector",
          disableGlobalFilter: true,
        },
        {
          Header: "ValidTill",
          accessor: "ValidTill",
          disableGlobalFilter: true,
        },
      ],
    },
  ]);
  return (
    <div className="table_container">
      {isLoading === true ? (
        <h1>Loading...</h1>
      ) : (
        <Table columns={columns} data={modifiedData} />
      )}
    </div>
  );
};

export default Instrument;
