import React from 'react';
import { useAuth } from 'enhancers/useAuth';

import StyledButton from './Button';
import LinkButton from './LinkButton';
import Form from './Form';
import Input from '../Inputs/Input';
import ErrorMessage from './ErrorMessage';

const RegistrationForm = ({ state, dispatch }) => {
  const { signup } = useAuth();

  return (
    <>
      <Form>
        {state.message && <ErrorMessage>{state.message}</ErrorMessage>}
        <Input
          type="email"
          name="email"
          id="email-id"
          value={state.email.value}
          placeholder="Email address"
          invalid={!state.email.valid}
          onChange={(e) =>
            dispatch({ type: 'setEmail', payload: { value: e.target.value } })
          }
        />
        <Input
          type="password"
          name="password"
          id="password-id"
          placeholder="Password"
          invalid={!state.password.valid}
          onChange={(e) =>
            dispatch({
              type: 'setPassword',
              payload: { value: e.target.value },
            })
          }
        />
        <Input
          type="password"
          name="password2"
          id="password2-id"
          placeholder="Confirm password"
          invalid={!state.password.valid}
          onChange={(e) =>
            dispatch({
              type: 'setPassword2',
              payload: { value: e.target.value },
            })
          }
        />

        <StyledButton
          color="success"
          onClick={(e) => {
            e.preventDefault();

            dispatch({ type: 'setMessage', payload: false });
            if (!state.email.value || !state.password.value) {
              dispatch({
                type: 'setMessage',
                payload: 'You must set an email and password.',
              });
              return;
            }
            if (state.password.value !== state.password2.value) {
              dispatch({
                type: 'setMessage',
                payload: 'Passwords dont match.',
              });
              return;
            }
            signup(state.email.value, state.password.value)
              .then((e) => {
                console.log('Success: ', e);
              })
              .catch((e) => {
                if (e.code.includes('email-already-in-use')) {
                  dispatch({
                    type: 'setMessage',
                    payload: 'Email is already in use.',
                  });
                } else if (e.code.includes('weak-password')) {
                  dispatch({
                    type: 'setMessage',
                    payload: 'Password too weak.',
                  });
                } else if (e.code.includes('invalid-email')) {
                  dispatch({
                    type: 'setMessage',
                    payload: 'Invalid email address.',
                  });
                }
              });
          }}
        >
          Create account
        </StyledButton>
      </Form>
      <LinkButton
        color="link"
        onClick={() => dispatch({ type: 'setSelection', payload: 'login' })}
      >
        Back to login
      </LinkButton>
    </>
  );
};

export default RegistrationForm;
