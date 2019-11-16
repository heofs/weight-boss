import React from 'react';
import styled from 'styled-components';
import { InputWrapper, InputBox as Input } from 'components/Inputs/Input';

const StyledWrapper = styled(InputWrapper)`
  width: 8rem;
`;

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
