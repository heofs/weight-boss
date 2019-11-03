import React, { createContext, useState, useEffect, useContext } from 'react';
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
  const [token, setToken] = useState();

  const headers = new Headers({
    Accept: 'application/json',
    Authorization: 'Bearer ' + token,
    'Content-Type': 'application/json',
  });

  const addWeight = async (weight, dateTime) => {
    const addWeightUrl = baseUrl + '/addWeight';
    const bodyData = { weight, dateTime };

    const rawResponse = await fetch(addWeightUrl, {
      method: 'POST',
      mode,
      headers,
      body: JSON.stringify(bodyData),
    });
    setWeightData([...weightData, content]);
    const content = await rawResponse.json();
    return content;
  };

  const deleteWeight = async id => {
    const deleteWeightUrl = baseUrl + '/deleteWeight';
    const rawResponse = await fetch(deleteWeightUrl, {
      method: 'DELETE',
      mode,
      headers,
      body: JSON.stringify({ id }),
    });
    const newWeightData = weightData.filter(row => row.id !== id);
    setWeightData(newWeightData);
    const data = await rawResponse.json();
    return data;
  };

  useEffect(() => {
    setToken(user && user.ma);
    if (token) {
      (async () => {
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
  }, [user, token]);

  return {
    weightData,
    addWeight,
    deleteWeight,
  };
}

export const useFirestore = () => useContext(DataContext);
