import React, { useEffect, useState, useMemo } from "react";
import Papa from "papaparse";
import file from "../../src/instruments.csv";
import "../css/instruments.css";
import Table from "./Table";
import { Link } from "react-router-dom";

const Instrument = () => {
  const modifiedData = [];

  const [csvData, setCsvData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const getInstrumentData = async () => {
    Papa.parse(file, {
      download: true,
      complete: (result) => {
        setCsvData(result.data);
        setIsLoading(false);
      },
    });
  };
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
      Header: "Sensibull",
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
