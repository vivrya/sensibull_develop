import React, { useState } from "react";
import { useTable, useGlobalFilter } from "react-table";
import "../css/table.css"

export default function Table({ columns, data }) {
  const [filterInput, setFilterInput] = useState("");

  // Use the useTable Hook to send the columns and data to build the table
  const {
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    headerGroups, // headerGroups, if your table has groupings
    rows, // rows for the table based on the data passed
    prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter
  );

  /* 
    Render the UI for your table
    - react-table doesn't have UI, it's headless. We just need to put the react-table props from the Hooks, and it will do its magic automatically
  */
  const handleFilterChange = (e) => {
    const value = e.target.value || undefined;
    setGlobalFilter(value); // Update the show.name filter. Now our table will filter and show only the rows which have a matching value
    setFilterInput(value);
  };
  return (
    <div className="container">
      <input
        className="search_bar"
        placeholder={"Type stock symbol or name"}
        value={filterInput}
        onChange={handleFilterChange}
      />

      <table className="table table-striped mr-auto" {...getTableProps()}>
        <thead className="thead">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows?.length===0?<h3 className="data-not-found">Data not found</h3>:rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td className="tr" {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
