import React from "react";
// import PropTypes from "prop-types";
import styled from "styled-components";

const Button = styled.button`
  margin: 2em;
  padding: 0.5em;
`;

const LogOutButton = props => {
  return <Button {...props}>Sign out</Button>;
};

LogOutButton.propTypes = {};

export default LogOutButton;
