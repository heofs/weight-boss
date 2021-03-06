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
    border-top-left-radius: ${sizes.cornerRadius};
    border-bottom-left-radius: ${sizes.cornerRadius};
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
        `;
      }
    }}
    ${({ type, hasIcon }) => {
      if ((type === 'password' || type === 'email') && !hasIcon) {
        return `padding-left: 1rem;`;
      }
    }}
  }
  /* When input has focus */
  :focus-within {
    svg {
      transition: all ${animations.speed} ease 0s;
      border-left: ${sizes.borderSize} solid ${colors.focus};
      border-top: ${sizes.borderSize} solid ${colors.focus};
      border-bottom: ${sizes.borderSize} solid ${colors.focus};
    }
    input {
      transition: all ${animations.speed} ease 0s;
      border-right: ${sizes.borderSize} solid ${colors.focus};
      border-top: ${sizes.borderSize} solid ${colors.focus};
      border-bottom: ${sizes.borderSize} solid ${colors.focus};
      /* Focus border on left side if no icon */
      ${({ hasIcon }) =>
        !hasIcon && `border-left: ${sizes.borderSize} solid ${colors.focus}`}
    }
  }
`;

export const InputBox = styled.input`
  width: 100%;
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
    id,
    icon: Icon,
    type,
    name,
    value,
    required,
    placeholder,
    invalid,
    onChange,
    ...otherProps
  } = props;

  return (
    <InputWrapper hasIcon={Boolean(Icon)} type={type}>
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

Input.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  icon: PropTypes.object,
  value: PropTypes.string,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  invalid: PropTypes.bool,
};

export default Input;
