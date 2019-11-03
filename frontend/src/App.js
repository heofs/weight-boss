import React, { useState, useEffect } from "react";
import "styles/index.css";
import { useAuth } from "enhancers/useAuth";
import { useFirestore } from "enhancers/useFirestore";

import styled from "styled-components";

import LoginPage from "components/LoginPage";
import LoadingPage from "components/LoadingPage";
import LogOutButton from "components/Buttons/LogOutButton";
import DataTable from "components/DataTable";

const StyledWrapper = styled.div`
    text-align: center;
`;

const Header = styled.header`
    background-color: #282c34;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    color: white;
    .App-link {
        color: #09d3ac;
    }
`;

const Input = styled.input`
    margin: 1em;
`;

const App = () => {
    const { user, signout } = useAuth();
    const [isLoading, setLoading] = useState(true);
    const { addWeight } = useFirestore();
    const timeNow = () => {
        const now = new Date();
        return (
            now.getFullYear() +
            "-" +
            ("0" + (now.getMonth() + 1)).slice(-2) +
            "-" +
            ("0" + now.getDate()).slice(-2) +
            "T" +
            ("0" + now.getHours()).slice(-2) +
            ":" +
            ("0" + now.getMinutes()).slice(-2)
        );
    };

    const [inputs, setInputs] = useState({
        weight: "",
        dateTime: timeNow()
    });

    const handleInputChange = event => {
        event.persist();
        setInputs(inputs => ({
            ...inputs,
            [event.target.name]: event.target.value
        }));
    };

    useEffect(() => {
        if (user !== null && isLoading) {
            setLoading(false);
        }
    }, [user, isLoading]);

    if (isLoading) {
        return <LoadingPage />;
    }

    if (!user) {
        return <LoginPage />;
    }
    if (window.location.pathname !== "/") {
        window.location.href = "/";
    }

    return (
        <StyledWrapper className="App">
            <Header className="App-header">
                <p>Enter your weight</p>
                <label htmlFor="frmFavChocolate">Your weight</label>
                <Input
                    type="number"
                    name="weight"
                    id="weightId"
                    placeholder="your weight"
                    value={inputs.weight}
                    onChange={handleInputChange}
                />
                <Input
                    type="datetime-local"
                    name="dateTime"
                    id="dateTimeId"
                    value={inputs.dateTime}
                    onChange={handleInputChange}
                />
                <button
                    onClick={() =>
                        setInputs({ ...inputs, dateTime: timeNow() })
                    }
                >
                    Set time now
                </button>
                <button
                    onClick={() => {
                        addWeight(inputs.weight, inputs.dateTime);
                    }}
                >
                    Submit weight
                </button>
                <DataTable />
                <LogOutButton onClick={() => signout()}>log out</LogOutButton>
            </Header>
        </StyledWrapper>
    );
};

export default App;
