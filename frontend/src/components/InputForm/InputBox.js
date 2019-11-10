import React from 'react';
import styled from 'styled-components';
import { device } from 'constants/theme';

const StyledInput = styled.input`
  width: 4.9em;
  margin: 1em 0;
  text-align: center;
  /* height: calc(1.5em + 0.75rem + 2px); */
  /* display: block; */
  padding: 0.375em 0.5em;
  font-size: 1rem;
  font-weight: 400;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  @media ${device.mobile} {
    width: 7em;
    margin: 1em 0;
    /* display: block; */
    font-size: 1rem;
    font-weight: 400;
  }
`;

class InputBox extends React.Component {
  render() {
    const {
      onChange,
      placeholder,
      value,
      isSecure,
      id,
      onClick,
      type,
      name,
    } = this.props;

    return (
      <StyledInput
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        isSecure={isSecure}
        id={id}
        onClick={onClick}
        type={type}
        name={name}
      />
    );
  }
}

export default InputBox;
