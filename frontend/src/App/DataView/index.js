import React from 'react';

import { useAPI } from 'enhancers/useAPI';

import LoadingText from 'components/Loaders/LoadingText';
import Graph from './Graph';
import DataTable from './DataTable';

const DataView = () => {
  const { loading, isFetching, weightData } = useAPI();

  if (loading) {
    return <LoadingText>Loading</LoadingText>;
  }

  if (!weightData.length) {
    return <p>Add weight to show history.</p>;
  }

  return (
    <>
      <LoadingText visible={isFetching}>Getting latest data</LoadingText>
      <Graph height={300} width={500} />
      <DataTable />
    </>
  );
};

export default DataView;
