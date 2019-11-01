import React from "react";
// import PropTypes from "prop-types";
import { useFirestore } from "enhancers/useFirestore";
import ReactTable from "react-table";
import "react-table/react-table.css";

const DataTable = props => {
  const { weightData, deleteWeight } = useFirestore();

  if (!weightData || weightData.length < 1 || weightData.length === undefined) {
    return null;
  }

  const columns = [
    {
      Header: "Weight",
      accessor: "weight" // String-based value accessors!
    },
    {
      Header: "Time",
      accessor: "dateTime",
      Cell: props => <span className="number">{props.value}</span> // Custom cell components!
    },
    {
      Header: "Actions",
      // id: 'click-me-button',
      accessor: "id",
      sortable: false,
      maxWidth: 100,
      Cell: ({ value }) => (
        <div
          style={{
            textAlign: "center"
          }}
        >
          <button
            width={"25%"}
            color={"#dc3545"}
            onClick={e => {
              const selectedRow =
                weightData.find(row => row.id === value) || "";
              const rowWeight = selectedRow.weight;

              deleteWeight(value);
              console.log(rowWeight);
            }}
          >
            ✕
          </button>
        </div>
      )
    }
  ];

  return <ReactTable data={weightData} columns={columns} />;
};

DataTable.propTypes = {};

export default DataTable;
