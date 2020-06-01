import React from 'react';

import { useAPI } from 'enhancers/useAPI';

import LoadingText from 'components/Loaders/LoadingText';
import Graph from './Graph';
import DataTable from './DataTable';

const DataView = () => {
  const { loading, isFetching, weightData } = useAPI();

  const displayGraph = () => {
    if (weightData.length > 1) {
      return <Graph height={300} width={500} />;
    }
    return <p>Add more weight to display graph</p>;
  };

  if (loading) {
    return <LoadingText>Loading</LoadingText>;
  }

  if (!weightData.length) {
    return <p>Add weight to show history.</p>;
  }

  return (
    <>
      <LoadingText visible={isFetching}>Getting latest data</LoadingText>
      {displayGraph()}
      <DataTable />
    </>
  );
};

export default DataView;
