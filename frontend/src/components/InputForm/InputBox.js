import React from 'react';
import styled from 'styled-components';
import { device } from 'constants/theme';
import { InputWrapper, InputBox as Input } from 'components/Inputs/Input';

const StyledWrapper = styled(InputWrapper)`
  width: 8rem;
  /* height: 2rem; */
`;

// const StyledInput = styled(Input)`
/* margin: 1rem 0; */
/* height: calc(1.5em + 0.75rem + 2px); */
/* display: block; */
/* padding: 0.375rem 0.5rem; */
/* @media ${device.mobile} {
    width: 7em;
    margin: 1em 0;
    display: block;
    font-size: 1rem;
    font-weight: 400;
  } */
// `;

const StyledInput = styled(Input)`
  font-size: 1.2rem;
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
      <StyledWrapper>
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
      </StyledWrapper>
    );
  }
}

export default InputBox;
