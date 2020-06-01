import React, { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from 'enhancers/useAuth';

import localforage from 'utils/localforage';

const mode = 'cors';
const baseUrl = process.env.REACT_APP_API_URL;

function useFirestoreAPI() {
  const { user } = useAuth();
  const [weightData, setWeightData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFetching, setFetching] = useState(true);

  const createHeader = (token) =>
    new Headers({
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

  const addWeight = async (weight, dateTime) => {
    const token = await user.getIdToken();
    const addWeightUrl = `${baseUrl}/addWeight`;
    const bodyData = { weight, dateTime };

    return fetch(addWeightUrl, {
      method: 'POST',
      mode,
      headers: createHeader(token),
      body: JSON.stringify(bodyData),
    }).then(async (res) => {
      const json = await res.json();
      setWeightData([...weightData, json]);
    });
  };

  const deleteWeight = async (id) => {
    const newWeightData = weightData.filter((row) => row.id !== id);
    setWeightData(newWeightData);
    const token = await user.getIdToken();
    const deleteWeightUrl = `${baseUrl}/deleteWeight`;
    return fetch(deleteWeightUrl, {
      method: 'DELETE',
      mode,
      headers: createHeader(token),
      body: JSON.stringify({ id }),
    });
  };

  useEffect(() => {
    if (user) {
      (async () => {
        // IndexedDB
        const localData = await localforage.getItem('weightData');
        if (localData) {
          setLoading(false);
          setWeightData(localData);
        }

        // API Request
        const token = await user.getIdToken();
        const getDataUrl = `${baseUrl}/getData`;
        const rawResponse = await fetch(getDataUrl, {
          method: 'GET',
          mode,
          headers: createHeader(token),
        });
        const data = await rawResponse.json();

        setWeightData(data);
        setFetching(false);
        setLoading(false);
      })();
    }
  }, [user]);

  useEffect(() => {
    localforage.setItem('weightData', weightData);
  }, [weightData]);

  useEffect(() => {
    localforage.getItem('weightData', (err, data) => {
      setWeightData(data);
    });
  }, []);

  return {
    loading,
    isFetching,
    weightData,
    addWeight,
    deleteWeight,
  };
}

export const DataContext = createContext();

export const useAPI = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const data = useFirestoreAPI();
  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
