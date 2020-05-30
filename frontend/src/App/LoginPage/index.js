import React, { useReducer } from 'react';
import styled from 'styled-components';

import { colors, device } from 'constants/theme';

import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';
import ForgotForm from './ForgotForm';

import { reducer, initialState } from './login-reducer';

const Wrapper = styled.div`
  color: black;
  background-color: ${colors.secondary};
  width: 15em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  padding: 1.5em;
  border-radius: 5px;
  @media ${device.mobile} {
    width: 300px;
  }

  @media ${device.tablet} {
    width: 300px;
  }
`;

const LoginPage = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Wrapper>
      {(() => {
        if (state.selection === 'register') {
          return <RegistrationForm state={state} dispatch={dispatch} />;
        }
        if (state.selection === 'forgotpw') {
          return <ForgotForm state={state} dispatch={dispatch} />;
        }
        return <LoginForm state={state} dispatch={dispatch} />;
      })()}
    </Wrapper>
  );
};

export default LoginPage;
