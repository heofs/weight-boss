import React from 'react';

import { useAPI } from 'enhancers/useAPI';

import Graph from './Graph';
import DataTable from './DataTable';

const DataView = () => {
  const { loading, weightData } = useAPI();

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
