import React from 'react';
// import PropTypes from "prop-types";
import { useFirestore } from 'enhancers/useFirestore';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

const DataTable = props => {
  const { weightData, deleteWeight } = useFirestore();

  if (!weightData || weightData.length < 1 || weightData.length === undefined) {
    return <p>Add weight to show history.</p>;
  }

  const columns = [
    {
      Header: 'Weight',
      accessor: 'weight', // String-based value accessors!
    },
    {
      Header: 'Time',
      accessor: 'dateTime',
      Cell: props => <span className="number">{props.value}</span>, // Custom cell components!
    },
    {
      Header: 'Actions',
      // id: 'click-me-button',
      accessor: 'id',
      sortable: false,
      maxWidth: 100,
      Cell: ({ value }) => (
        <div
          style={{
            textAlign: 'center',
          }}
        >
          <button
            width={'25%'}
            color={'#dc3545'}
            onClick={e => {
              // const selectedRow =
              //   weightData.find(row => row.id === value) || '';
              deleteWeight(value);
            }}
          >
            ✕
          </button>
        </div>
      ),
    },
  ];

  return (
    <ReactTable
      data={weightData}
      columns={columns}
      minRows={1}
      showPagination={false}
    />
  );
};

DataTable.propTypes = {};

export default DataTable;
