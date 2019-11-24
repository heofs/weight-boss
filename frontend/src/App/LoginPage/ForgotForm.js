import React from 'react';
import { useAuth } from 'enhancers/useAuth';
import Button from './Button';
import LinkButton from './LinkButton';
import Form from './Form';
import Input from 'components/Inputs/Input';
import ErrorMessage from './ErrorMessage';

const ForgotForm = ({ state, dispatch }) => {
  const { sendPasswordResetEmail } = useAuth();

  const sendEmail = (e) => {
    e.preventDefault();
    sendPasswordResetEmail(state.email.value)
      .then(() =>
        dispatch({
          type: 'setSelection',
          payload: {
            selection: 'login',
            message: 'Instructions has been sent to your email.',
          },
        })
      )
      .catch((e) => dispatch({ type: 'setMessage', payload: e.message }));
  };

  return (
    <Form>
      {state.message && <ErrorMessage>{state.message}</ErrorMessage>}
      <Input
        type="email"
        name="email"
        id="email-id"
        value={state.email.value}
        placeholder="Email address"
        onChange={(e) =>
          dispatch({
            type: 'setEmail',
            payload: { value: e.target.value },
          })
        }
      />
      <Button onClick={(e) => sendEmail(e)}>Send email</Button>
      <LinkButton
        onClick={(e) => {
          e.preventDefault();
          dispatch({ type: 'setSelection', payload: 'login' });
        }}
      >
        Back to login
      </LinkButton>
    </Form>
  );
};

export default ForgotForm;
