import React, { useReducer } from 'react';
import styled from 'styled-components';

import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';
import ForgotForm from './ForgotForm';

import { colors, device } from 'constants/theme';

const Wrapper = styled.div`
  color: black;
  background-color: ${colors.beige};
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

const initialState = {
  selection: 'login',
  email: { value: '', valid: true },
  password: { value: '', valid: true },
  password2: { value: '', valid: true },
  remember: false,
  message: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'toggleRemember':
      return { ...state, remember: !state.remember };
    case 'setMessage':
      return { ...state, message: action.payload };
    case 'setEmail':
      return {
        ...state,
        email: {
          value:
            action.payload.value !== undefined
              ? action.payload.value
              : state.email.value,
          valid:
            action.payload.valid !== undefined ? action.payload.valid : true,
        },
      };
    case 'setPassword':
      return {
        ...state,
        password: {
          value:
            action.payload.value !== undefined
              ? action.payload.value
              : state.password.value,
          valid:
            action.payload.valid !== undefined ? action.payload.valid : true,
        },
      };
    case 'setPassword2':
      return {
        ...state,
        password: { ...state.password, valid: true },
        password2: { value: action.payload.value, valid: true },
      };
    case 'allValid':
      return {
        ...state,
        email: { ...state.email, valid: action.payload },
        password: { ...state.password, valid: action.payload },
      };
    case 'setSelection':
      return {
        ...state,
        selection: action.payload.selection || action.payload,
        message:
          action.payload.message !== undefined ? action.payload.message : false,
      };
    case 'reset':
      return initialState;
    default:
      return state;
  }
};

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
