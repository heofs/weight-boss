import React, { useState } from 'react';
import styled from 'styled-components';

import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';
import ForgotForm from './ForgotForm';

import { colors, device } from 'constants/theme';

const Wrapper = styled.div`
  color: ${colors.dark};
  background-color: ${colors.beige};
  width: 15em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  padding: 1em;
  border-radius: 5px;
  @media ${device.mobile} {
    width: 14em;
  }

  @media ${device.tablet} {
    width: 12em;
  }
`;

const LoginPage = () => {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });
  const [selection, setSelection] = useState('login');

  const handleInputChange = (event) => {
    event.persist();
    setInputs((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }));
  };

  const renderSelection = () => {
    if (selection === 'register') {
      return (
        <RegistrationForm
          inputs={inputs}
          setSelection={setSelection}
          handleInputChange={handleInputChange}
        />
      );
    }
    if (selection === 'forgotpw') {
      return (
        <ForgotForm
          inputs={inputs}
          setSelection={setSelection}
          handleInputChange={handleInputChange}
        />
      );
    }
    return (
      <LoginForm
        inputs={inputs}
        setSelection={setSelection}
        handleInputChange={handleInputChange}
      />
    );
  };
  return <Wrapper>{renderSelection()}</Wrapper>;
};

export default LoginPage;
