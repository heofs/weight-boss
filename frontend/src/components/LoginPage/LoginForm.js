import React, { useState } from 'react';
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

const LoginForm = ({ inputs, handleInputChange, setSelection }) => {
  const { signin, signinPersist, signinGoogle } = useAuth();
  const [rememberSignin, setRememberSignin] = useState(false);
  const [isPasswordValid, setPasswordValid] = useState(true);
  const [isEmailValid, setEmailValid] = useState(true);
  const [displayMessage, setDisplayMessage] = useState(false);
  return (
    <>
      <Form>
        {displayMessage && (
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
          invalid={!isEmailValid}
          onChange={(e) => {
            handleInputChange(e);
            setEmailValid(true);
          }}
        />
        <Input
          icon={KeyIcon}
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
        <CheckBox>
          <input
            type="checkbox"
            id="remember-id"
            checked={rememberSignin}
            onChange={() => setRememberSignin(!rememberSignin)}
          />
          <label htmlFor="remember-id">Remember login</label>
        </CheckBox>
        <StyledButton
          type="submit"
          onClick={async (e) => {
            e.preventDefault();
            setDisplayMessage(false);
            if (rememberSignin === true) {
              console.log(inputs);
              signinPersist(inputs.email, inputs.password);
            }
            signin(inputs.email, inputs.password).catch(({ code }) => {
              if (
                code.includes('invalid-email') ||
                code.includes('wrong-password')
              ) {
                setEmailValid(false);
                setPasswordValid(false);
                setDisplayMessage('Wrong username or password');
              }
              if (code.includes('user-not-found')) {
                setEmailValid(false);
                setPasswordValid(false);
                setDisplayMessage('User not found');
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
          setSelection('forgotpw');
          setDisplayMessage(false);
        }}
      >
        Forgot your password?
      </LinkButton>
      <LinkButton
        onClick={(e) => {
          e.preventDefault();
          setSelection('register');
          setDisplayMessage(false);
        }}
      >
        Create an account
      </LinkButton>
    </>
  );
};

export default LoginForm;
