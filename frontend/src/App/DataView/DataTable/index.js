import React from 'react';

import { useTable, useSortBy } from 'react-table';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useAPI } from 'enhancers/useAPI';
import { useToasts } from 'react-toast-notifications';

import Table from './Table';
import SortIcon from './SortIcon';
import TimeCell from './Cells/TimeCell';
import deleteCell from './Cells/DeleteCell';

const DataTable = () => {
  const { deleteWeight, weightData } = useAPI();
  const { addToast } = useToasts();

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
        Cell: TimeCell,
      },
      {
        Header: 'Actions',
        accessor: 'id',
        disableSortBy: true,
        Cell: deleteCell(deleteWeight, addToast),
      },
    ],
    [deleteWeight, addToast]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data: weightData,
      initialState: { sortBy: [{ id: 'time', desc: true }] },
      autoResetSortBy: false,
    },
    useSortBy
  );

  const displaySortIcon = (column) => {
    if (!column.canSort) {
      return null;
    }
    if (!column.isSorted) {
      return <SortIcon />;
    }
    if (column.isSorted) {
      return (
        <span>
          {column.isSortedDesc ? <SortIcon sort="down" /> : <SortIcon sort="up" />}
        </span>
      );
    }
    return null;
  };

  return (
    <Table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          // eslint-disable-next-line react/jsx-key
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps(column.getSortByToggleProps())}
                onClick={() =>
                  column.canSort && column.toggleSortBy(!column.isSortedDesc, false)
                }
                valign="middle"
                key={column.id}
              >
                {column.render('Header')}
                {displaySortIcon(column)}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        <TransitionGroup component={null}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <CSSTransition
                key={row.original.id}
                timeout={200}
                classNames="rowTransition"
              >
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    // eslint-disable-next-line react/jsx-key
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  ))}
                </tr>
              </CSSTransition>
            );
          })}
        </TransitionGroup>
      </tbody>
    </Table>
  );
};

export default DataTable;
