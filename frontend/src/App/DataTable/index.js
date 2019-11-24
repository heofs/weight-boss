import React from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import ReactTable from 'react-table';

import { useFirestore } from 'enhancers/useFirestore';

import ButtonDelete from './ButtonDelete';

import 'react-table/react-table.css';
import 'styles/data-table.scss';

const Table = styled(ReactTable)`
  width: 100%;
  margin: 2rem 0;
`;

const DataTable = (props) => {
  const { weightData, deleteWeight } = useFirestore();

  if (!weightData || weightData.length < 1 || weightData.length === undefined) {
    return <p>Add weight to show history.</p>;
  }

  const columns = [
    {
      Header: 'Weight',
      accessor: 'weight',
      width: 100,
    },
    {
      Header: 'Time',
      accessor: 'dateTime',
      minWidth: 150,
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
    <Table
      data={weightData}
      columns={columns}
      minRows={1}
      showPagination={false}
      defaultSorted={[
        {
          id: 'dateTime',
          desc: true,
        },
      ]}
    />
  );
};

DataTable.propTypes = {};

export default DataTable;
