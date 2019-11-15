import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { sizes, colors, animations } from 'constants/theme';

export const InputWrapper = styled.div`
  height: 3rem;
  display: flex;
  width: 100%;
  margin-bottom: ${sizes.varticalMargin};
  svg {
    border-left: ${sizes.borderSize} solid ${colors.border};
    border-top: ${sizes.borderSize} solid ${colors.border};
    border-bottom: ${sizes.borderSize} solid ${colors.border};
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
    background: white;
    color: white;
    width: 2.5em;
    padding: 5px;
    text-align: center;
  }
  /* Set borders and corners if no icon */
  input {
    ${({ hasIcon }) => {
      if (!hasIcon) {
        return `
          border-left:  ${sizes.borderSize} solid ${colors.border};
          border-radius:  ${sizes.cornerRadius};
          padding-left: 1rem;
          `;
      }
    }}
  }
  /* When input has focus */
  :focus-within {
    svg {
      transition: all ${animations.speed} ease 0s;
      border-left: ${sizes.borderSize} solid ${colors.inputFocus};
      border-top: ${sizes.borderSize} solid ${colors.inputFocus};
      border-bottom: ${sizes.borderSize} solid ${colors.inputFocus};
    }
    input {
      transition: all ${animations.speed} ease 0s;
      border-right: ${sizes.borderSize} solid ${colors.inputFocus};
      border-top: ${sizes.borderSize} solid ${colors.inputFocus};
      border-bottom: ${sizes.borderSize} solid ${colors.inputFocus};
      /* Focus border on left side if no icon */
      ${({ hasIcon }) =>
        !hasIcon &&
        `border-left: ${sizes.borderSize} solid ${colors.inputFocus}`}
    }
  }
`;

export const InputBox = styled.input`
  width: 100%;
  /* font-size: ${sizes.textSize}; */
  /* padding: 0 0.6em; */
  outline: none;
  border: none;
  -webkit-box-shadow: none;
  box-shadow: none;
  border-top-right-radius: ${sizes.cornerRadius};
  border-bottom-right-radius: ${sizes.cornerRadius};
  border-right: ${sizes.borderSize} solid ${colors.border};
  border-top: ${sizes.borderSize} solid ${colors.border};
  border-bottom: ${sizes.borderSize} solid ${colors.border};
  ::placeholder { 
    color: grey;
    opacity: 1; /* Firefox */
  }
`;

const Input = (props) => {
  const {
    icon: Icon,
    type,
    name,
    id,
    value,
    required,
    placeholder,
    invalid,
    onChange,
    ...otherProps
  } = props;

  return (
    <InputWrapper hasIcon={Boolean(Icon)}>
      {Icon && <Icon />}
      <InputBox
        id={id}
        type={type}
        name={name}
        value={value}
        required={required}
        placeholder={placeholder}
        invalid={invalid}
        onChange={onChange}
        {...otherProps}
      />
    </InputWrapper>
  );
};

Input.propTypes = {};

export default Input;
