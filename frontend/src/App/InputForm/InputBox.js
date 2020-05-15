import React from 'react';
import styled from 'styled-components';
import { InputWrapper, InputBox as Input } from 'components/Inputs/Input';
import { device } from 'constants/theme';

const StyledWrapper = styled(InputWrapper)`
  height: 2em;
  width: 5.5em;
  @media ${device.mobile} {
    width: 7em;
  }
`;

const StyledInput = styled(Input)`
  font-size: 1.2em;
  text-align: center;
  padding-left: 0;
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
      ...otherProps
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
          {...otherProps}
        />
      </StyledWrapper>
    );
  }
}

export default InputBox;
