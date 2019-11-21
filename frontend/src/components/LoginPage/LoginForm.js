import React, { useReducer } from 'react';
import styled from 'styled-components';
import { useAuth } from 'enhancers/useAuth';
import { sizes } from 'constants/theme';
import StyledButton from './Button';
import LinkButton from './LinkButton';
import Form from './Form';
import Input from '../Inputs/Input';
import ErrorMessage from './ErrorMessage';
import { ReactComponent as GoogleLogo } from 'images/google-logo.svg';
import { ReactComponent as KeyIcon } from 'images/icon-key.svg';
import { ReactComponent as EnvelopeIcon } from 'images/icon-envelope.svg';

const CheckBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: ${sizes.varticalMargin} 0;
  label {
    font-size: ${sizes.smallerText};
  }
  input {
    background-color: white;
    margin: 0 0.5rem 0 0;
  }
`;

const initialState = {
  remember: false,
  message: false,
  passwordValid: true,
  emailValid: true,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'remember':
      return { ...state, remember: !state.remember };
    case 'message':
      return { ...state, message: action.payload };
    case 'passwordValid':
      return { ...state, passwordValid: action.payload };
    case 'emailValid':
      return { ...state, emailValid: action.payload };
    case 'allValid':
      return {
        ...state,
        passwordValid: action.payload,
        emailValid: action.payload,
      };
    default:
      return state;
  }
};

const LoginForm = ({ inputs, handleInputChange, setSelection }) => {
  const { signin, persistSignin, signinGoogle } = useAuth();
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <Form>
        {state.message && (
          <ErrorMessage>Username or password is wrong</ErrorMessage>
        )}
        <Input
          icon={EnvelopeIcon}
          type="email"
          name="email"
          id="email-id"
          value={inputs.email}
          required
          placeholder="Email address"
          invalid={!state.emailValid}
          onChange={(e) => {
            handleInputChange(e);
            dispatch({ type: 'emailValid', payload: true });
          }}
        />
        <Input
          icon={KeyIcon}
          type="password"
          name="password"
          id="password-id"
          placeholder="Password"
          invalid={!state.passwordValid}
          onChange={(e) => {
            handleInputChange(e);
            dispatch({ type: 'passwordValid', payload: true });
          }}
        />
        <CheckBox>
          <input
            type="checkbox"
            id="remember-id"
            checked={state.remember}
            onChange={() => dispatch({ type: 'remember' })}
          />
          <label htmlFor="remember-id">Remember login</label>
        </CheckBox>
        <StyledButton
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            dispatch({ type: 'message', payload: false });
            if (state.remember === true) {
              persistSignin(inputs.email, inputs.password);
            }
            signin(inputs.email, inputs.password).catch(({ code }) => {
              if (
                code.includes('invalid-email') ||
                code.includes('wrong-password')
              ) {
                dispatch({ type: 'allValid', payload: false });
                dispatch({
                  type: 'message',
                  payload: 'Wrong username or password',
                });
              }
              if (code.includes('user-not-found')) {
                dispatch({ type: 'allValid', payload: false });
                dispatch({ type: 'message', payload: 'User not found' });
              }
            });
          }}
        >
          Sign in
        </StyledButton>
        <StyledButton
          onClick={(e) => {
            e.preventDefault();
            signinGoogle();
          }}
          icon={GoogleLogo}
        >
          Sign in with Google
        </StyledButton>
      </Form>
      <LinkButton
        onClick={(e) => {
          e.preventDefault();
          dispatch({ type: 'message', payload: false });
          setSelection('forgotpw');
        }}
      >
        Forgot your password?
      </LinkButton>
      <LinkButton
        onClick={(e) => {
          e.preventDefault();
          dispatch({ type: 'message', payload: false });
          setSelection('register');
        }}
      >
        Create an account
      </LinkButton>
    </>
  );
};

export default LoginForm;
