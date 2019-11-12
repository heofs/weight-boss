import React from 'react';
import dayjs from 'dayjs';
import ReactTable from 'react-table';

import { useFirestore } from 'enhancers/useFirestore';

import ButtonDelete from './ButtonDelete';

import 'react-table/react-table.css';

const DataTable = (props) => {
  const { weightData, deleteWeight } = useFirestore();

  if (!weightData || weightData.length < 1 || weightData.length === undefined) {
    return <p>Add weight to show history.</p>;
  }

  const columns = [
    {
      Header: 'Weight',
      accessor: 'weight',
      width: 70,
    },
    {
      Header: 'Time',
      accessor: 'dateTime',
      minWidth: 145,
      Cell: (props) => (
        <span>{dayjs(props.value).format('DD/MM/YYYY - HH:mm')}</span>
      ),
    },
    {
      Header: 'Actions',
      // id: 'click-me-button',
      accessor: 'id',
      sortable: false,
      width: 100,
      Cell: ({ value }) => (
        <div
          style={{
            textAlign: 'center',
          }}
        >
          <ButtonDelete
            onConfirm={() => {
              // const selectedRow =
              //   weightData.find(row => row.id === value) || '';
              deleteWeight(value);
            }}
          />
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
