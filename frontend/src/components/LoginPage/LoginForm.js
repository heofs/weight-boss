import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from 'enhancers/useAuth';
import { sizes } from 'constants/theme';
import StyledButton from './Button';
import LinkButton from './LinkButton';
import Form from './Form';
import FormGroup from './FormGroup';
import Input from './Input';
import ErrorMessage from './ErrorMessage';
import { ReactComponent as GoogleLogo } from 'images/google-logo.svg';
import { ReactComponent as TestIcon } from 'images/icon-clock.svg';

const Label = styled.label`
  font-size: ${sizes.smallerText};
`;

const CheckBox = styled.input`
  background-color: white;
  margin: 0.5em 0.5em 0.5em 0;
`;

const InputContainer = styled.div`
  height: 2rem;
  display: flex;
  width: 100%;
  margin-bottom: 15px;
  svg {
    border-left: 1px solid #ced4da;
    border-top: 1px solid #ced4da;
    border-bottom: 1px solid #ced4da;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
    background: white;
    color: white;
    width: 2.5em;
    padding: 5px;
    text-align: center;
  }
  :focus-within {
    svg {
      border-left: 1px solid dodgerblue;
      border-top: 1px solid dodgerblue;
      border-bottom: 1px solid dodgerblue;
    }
    input {
      border-right: 1px solid dodgerblue;
      border-top: 1px solid dodgerblue;
      border-bottom: 1px solid dodgerblue;
    }
  }
`;

const IconInput = styled.input`
  width: 100%;
  padding: 0 0.6em;
  outline: none;
  border: none;
  -webkit-box-shadow: none;
  box-shadow: none;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
  border-right: 1px solid #ced4da;
  border-top: 1px solid #ced4da;
  border-bottom: 1px solid #ced4da;
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
        <InputContainer>
          <TestIcon />
          <IconInput
            type="email"
            name="email"
            id="email2"
            placeholder="Your mail"
          />
        </InputContainer>
        <FormGroup>
          <Input
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
        </FormGroup>
        <FormGroup>
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
        </FormGroup>
        <FormGroup>
          <CheckBox
            type="checkbox"
            id="remember-id"
            checked={rememberSignin}
            onChange={() => setRememberSignin(!rememberSignin)}
          />
          <Label htmlFor="remember-id">Remember login</Label>
        </FormGroup>
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
