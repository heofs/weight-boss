import React from 'react';
import Graph from './Graph';
import DataTable from './DataTable';

const DataView = () => {
  return (
    <>
      <Graph height={300} width={500} />
      <DataTable />
    </>
  );
};

export default DataView;
