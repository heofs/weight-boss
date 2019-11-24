import React from 'react';
import styled from 'styled-components';
import { useAuth } from 'enhancers/useAuth';

import { sizes } from 'constants/theme';

import ActionButton from './Button';
import LinkButton from './LinkButton';
import Form from './Form';
import ErrorMessage from './ErrorMessage';

import Input from 'components/Inputs/Input';

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

const LoginForm = ({ state, dispatch }) => {
  const { signin, persistSignin, signinGoogle } = useAuth();

  return (
    <>
      <Form>
        {state.message && <ErrorMessage>{state.message}</ErrorMessage>}
        <Input
          icon={EnvelopeIcon}
          type="email"
          name="email"
          id="email-id"
          value={state.email.value}
          required
          placeholder="Email address"
          invalid={true}
          // invalid={!state.email.valid}
          onChange={(e) =>
            dispatch({ type: 'setEmail', payload: { value: e.target.value } })
          }
        />
        <Input
          icon={KeyIcon}
          type="password"
          name="password"
          id="password-id"
          placeholder="Password"
          invalid={true}
          onChange={(e) =>
            dispatch({
              type: 'setPassword',
              payload: { value: e.target.value },
            })
          }
        />
        <CheckBox>
          <input
            type="checkbox"
            id="remember-id"
            checked={state.remember}
            onChange={() => dispatch({ type: 'toggleRemember' })}
          />
          <label htmlFor="remember-id">Remember login</label>
        </CheckBox>
        <ActionButton
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            dispatch({ type: 'setMessage', payload: false });
            if (state.remember === true) {
              persistSignin(state.email.value, state.password.value);
            }
            signin(state.email.value, state.password.value).catch(
              ({ code }) => {
                if (
                  code.includes('invalid-email') ||
                  code.includes('wrong-password')
                ) {
                  dispatch({ type: 'allValid', payload: false });
                  dispatch({
                    type: 'setMessage',
                    payload: 'Wrong username or password.',
                  });
                }
                if (code.includes('user-not-found')) {
                  dispatch({ type: 'allValid', payload: false });
                  dispatch({ type: 'setMessage', payload: 'User not found.' });
                }
              }
            );
          }}
        >
          Sign in
        </ActionButton>
        <ActionButton
          onClick={(e) => {
            e.preventDefault();
            signinGoogle();
          }}
          icon={GoogleLogo}
        >
          Sign in with Google
        </ActionButton>
      </Form>
      <LinkButton
        onClick={(e) => {
          e.preventDefault();
          dispatch({ type: 'setSelection', payload: 'forgotpw' });
        }}
      >
        Forgot your password?
      </LinkButton>
      <LinkButton
        onClick={(e) => {
          e.preventDefault();
          dispatch({ type: 'setSelection', payload: 'register' });
        }}
      >
        Create an account
      </LinkButton>
    </>
  );
};

export default LoginForm;
