import React from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';

import { useDatabase } from 'enhancers/useDatabase';

import { useTable, useSortBy } from 'react-table';

import ButtonDelete from './ButtonDelete';

const Table = styled.table`
  width: 100%;
  margin: 2rem 0;
  border-spacing: 0;
  border: 1px solid black;

  tr {
    :nth-child(even) {
      background: #545454;
    }
    :last-child {
      td {
        border-bottom: 0;
      }
    }
  }

  th {
    background: #545454;
  }

  th,
  td {
    margin: 0;
    padding: 0.5rem;
    border-bottom: 1px solid black;
    border-right: 1px solid black;

    :last-child {
      border-right: 0;
    }
  }
`;

const DataTable = () => {
  const { deleteWeight, loading } = useDatabase();

  const weightData = React.useMemo(
    () => [
      { weight: 66, dateTime: 1576142670000, id: '1' },
      { weight: 67, dateTime: 1586153327000, id: '2' },
      { weight: 68, dateTime: 1596153327000, id: '3' },
      { weight: 66, dateTime: 1599153327000, id: '4' },
    ],
    []
  );

  const columns = React.useMemo(
    () => [
      {
        Header: 'Weight',
        accessor: 'weight',
      },
      {
        id: 'time',
        Header: 'Time',
        accessor: 'dateTime',
        Cell: (props) => (
          <span>{dayjs(props.cell.value).format('DD/MM/YYYY - HH:mm')}</span>
        ),
      },
      {
        Header: 'Actions',
        accessor: 'id',
        disableSortBy: true,
        Cell: ({ cell }) => (
          <div
            style={{
              textAlign: 'center',
            }}
          >
            <ButtonDelete onConfirm={() => deleteWeight(cell.value)} />
          </div>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data: weightData,
      initialState: { sortBy: [{ id: 'time', desc: true }] },
    },
    useSortBy
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!weightData || weightData.length < 1 || weightData.length === undefined) {
    return <p>Add weight to show history.</p>;
  }

  return (
    <Table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps(column.getSortByToggleProps())}
                onClick={() =>
                  column.canSort &&
                  column.toggleSortBy(!column.isSortedDesc, false)
                }
              >
                {column.render('Header')}

                {column.canSort && !column.isSorted && <span> X</span>}
                {column.canSort && column.isSorted && (
                  <span>{column.isSortedDesc ? ' 🔽' : ' 🔼'}</span>
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default DataTable;
