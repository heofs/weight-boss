import React, { createContext, useState, useEffect } from 'react';
import { useAuth } from 'enhancers/useAuth';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const data = useFirestoreDb();
  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};

const mode = 'cors';
const baseUrl = process.env.REACT_APP_API_URL;

function useFirestoreDb() {
  const { user } = useAuth();
  const [weightData, setWeightData] = useState([]);

  const addWeight = async (weight, dateTime) => {
    const token = await user.getIdToken();
    const addWeightUrl = baseUrl + '/addWeight';
    const bodyData = { weight, dateTime };

    fetch(addWeightUrl, {
      method: 'POST',
      mode,
      headers: new Headers({
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(bodyData),
    }).then(async (res) => {
      const json = await res.json();
      setWeightData([...weightData, json]);
    });
  };

  const deleteWeight = async (id) => {
    const token = await user.getIdToken();
    const deleteWeightUrl = baseUrl + '/deleteWeight';
    const rawResponse = await fetch(deleteWeightUrl, {
      method: 'DELETE',
      mode,
      headers: new Headers({
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({ id }),
    });
    const newWeightData = weightData.filter((row) => row.id !== id);
    setWeightData(newWeightData);
    const data = await rawResponse.json();
    return data;
  };

  useEffect(() => {
    if (user) {
      console.log('Getting new table data..');
      (async () => {
        const token = await user.getIdToken();
        const getDataUrl = baseUrl + '/getData';
        const rawResponse = await fetch(getDataUrl, {
          method: 'GET',
          mode,
          headers: new Headers({
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
          }),
        });
        const data = await rawResponse.json();
        setWeightData(data);
      })();
    }
  }, [user]);

  return {
    weightData,
    addWeight,
    deleteWeight,
  };
}
