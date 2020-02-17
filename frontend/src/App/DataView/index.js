import React from 'react';

import Graph from './Graph';
import DataTable from './DataTable';

import { useDatabase } from 'enhancers/useDatabase';

const DataView = () => {
  const { loading, weightData } = useDatabase();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!weightData.length) {
    return <p>Add weight to show history.</p>;
  }

  return (
    <>
      <Graph height={300} width={500} />
      <DataTable />
    </>
  );
};

export default DataView;
