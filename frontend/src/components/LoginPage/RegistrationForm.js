import React, { useState } from 'react';
import { useAuth } from 'enhancers/useAuth';

import StyledButton from './Button';
import LinkButton from './LinkButton';
import Form from './Form';
import Input from '../Inputs/Input';
import ErrorMessage from './ErrorMessage';

const RegistrationForm = ({ inputs, handleInputChange, setSelection }) => {
  const { signup } = useAuth();
  const [isPasswordValid, setPasswordValid] = useState(true);
  const [isEmailValid, setEmailValid] = useState(true);
  const [displayMessage, setDisplayMessage] = useState(false);
  return (
    <>
      <Form>
        {displayMessage && <ErrorMessage>{displayMessage}</ErrorMessage>}
        <Input
          type="email"
          name="email"
          id="email-id"
          value={inputs.email}
          placeholder="Email address"
          invalid={!isEmailValid}
          onChange={(e) => {
            handleInputChange(e);
            setEmailValid(true);
          }}
        />
        <Input
          type="password"
          name="password"
          id="password-id"
          placeholder="Password"
          invalid={!isPasswordValid}
          onChange={(e) => {
            handleInputChange(e);
            setPasswordValid(true);
          }}
        />
        <Input
          type="password"
          name="password2"
          id="password2-id"
          placeholder="Confirm password"
          invalid={!isPasswordValid}
          onChange={(e) => {
            handleInputChange(e);
            setPasswordValid(true);
          }}
        />

        <StyledButton
          color="success"
          onClick={(e) => {
            e.preventDefault();
            setDisplayMessage(false);
            if (!inputs.email || !inputs.password) {
              setDisplayMessage('You must set an email and password.');
              return;
            }
            if (inputs.password !== inputs.password2) {
              setDisplayMessage('Passwords dont match.');
              return;
            }
            signup(inputs.email, inputs.password)
              .then((e) => {
                console.log('Success: ', e);
              })
              .catch((e) => {
                if (e.code.includes('email-already-in-use')) {
                  setDisplayMessage('Email is already in use.');
                } else if (e.code.includes('weak-password')) {
                  setDisplayMessage('Password too weak.');
                } else if (e.code.includes('invalid-email')) {
                  setDisplayMessage('Invalid email address.');
                }
              });
          }}
        >
          Create account
        </StyledButton>
      </Form>
      <LinkButton color="link" onClick={() => setSelection('login')}>
        Back to login
      </LinkButton>
    </>
  );
};

export default RegistrationForm;
