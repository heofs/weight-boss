import React, { useState } from 'react';
import { useAuth } from 'enhancers/useAuth';
import Button from './Button';
import LinkButton from './LinkButton';
import Form from './Form';
import Input from 'components/Inputs/Input';
import ErrorMessage from './ErrorMessage';

const ForgotForm = ({ inputs, handleInputChange, setSelection }) => {
  const { sendPasswordResetEmail } = useAuth();
  const [displayMessage, setDisplayMessage] = useState(false);
  const sendEmail = (e) => {
    e.preventDefault();
    setDisplayMessage(false);
    sendPasswordResetEmail(inputs.email)
      .then(() => setSelection('login'))
      .catch((e) => setDisplayMessage(e.message));
  };
  return (
    <Form>
      {displayMessage && <ErrorMessage>{displayMessage}</ErrorMessage>}
      <Input
        type="email"
        name="email"
        id="email-id"
        value={inputs.email}
        placeholder="Email address"
        onChange={(e) => handleInputChange(e)}
      />
      <Button onClick={(e) => sendEmail(e)}>Send email</Button>
    </Form>
  );
};

export default ForgotForm;
