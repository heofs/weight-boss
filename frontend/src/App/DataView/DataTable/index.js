import React from 'react';
import dayjs from 'dayjs';
import { useTable, useSortBy } from 'react-table';

import { useAPI } from 'enhancers/useAPI';

import Table from './Table';
import ButtonDelete from './ButtonDelete';
import SortIcon from './SortIcon';

const DataTable = () => {
  const { deleteWeight, weightData } = useAPI();

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
    [deleteWeight]
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
                valign="middle"
              >
                {column.render('Header')}
                {column.canSort && !column.isSorted && <SortIcon />}
                {column.canSort && column.isSorted && (
                  <span>
                    {column.isSortedDesc ? (
                      <SortIcon sort="down" />
                    ) : (
                      <SortIcon sort="up" />
                    )}
                  </span>
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
