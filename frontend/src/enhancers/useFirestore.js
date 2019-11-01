import React, { createContext, useState, useEffect, useContext } from "react";
import { useAuth } from "enhancers/useAuth";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const data = useFirestoreDb();
    return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};

function useFirestoreDb() {
    const { user } = useAuth();
    const [weightData, setWeightData] = useState([]);
    const [token, setToken] = useState();
    //   if (token) {
    //     console.log(token);
    //   }
    const headers = new Headers({
        Accept: "application/json",
        Authorization: "Bearer " + token,
        "Content-Type": "application/json"
    });
    const mode = "cors";
    const baseUrl = "http://localhost:8080/api/";

    const addWeight = async (weight, dateTime) => {
        const addWeightUrl = baseUrl + "addWeight";
        const bodyData = { weight, dateTime };

        const rawResponse = await fetch(addWeightUrl, {
            method: "POST",
            mode, // no-cors, *cors, same-origin
            headers: headers,
            body: JSON.stringify(bodyData)
        });
        const content = await rawResponse.json();
        setWeightData([...weightData, content]);
        return content;
    };

    const deleteWeight = async id => {
        const deleteWeightUrl = baseUrl + "deleteWeight";
        const rawResponse = await fetch(deleteWeightUrl, {
            method: "DELETE",
            mode, // no-cors, *cors, same-origin
            headers,
            body: JSON.stringify({ id })
        });
        const data = await rawResponse.json();
        const newWeightData = weightData.filter(row => row.id !== id);
        setWeightData(newWeightData);
        return data;
    };

    useEffect(() => {
        setToken(user && user.ma);
        if (token) {
            (async () => {
                const getDataUrl = baseUrl + "getData";
                const rawResponse = await fetch(getDataUrl, {
                    method: "GET",
                    mode: "cors", // no-cors, *cors, same-origin
                    headers: new Headers({
                        Accept: "application/json",
                        Authorization: "Bearer " + token,
                        "Content-Type": "application/json"
                    })
                });
                const data = await rawResponse.json();
                console.log(data);
                setWeightData(data);
            })();
        }
    }, [user, token]);

    return {
        weightData,
        addWeight,
        deleteWeight
    };
}

export const useFirestore = () => useContext(DataContext);
