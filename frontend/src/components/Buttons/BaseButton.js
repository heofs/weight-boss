import styled from 'styled-components';
import { colors, animations, sizes } from 'constants/theme';

export default styled.button`
  color: ${colors.dark};
  background: ${colors.primary};
  font-size: ${sizes.textSize};
  text-decoration: none;
  border-radius: ${sizes.cornerRadius};
  display: inline-block;
  border: none;
  transition: all ${animations.speed} ease 0s;
  :hover {
    background: ${colors.darkPrimary};
    /* letter-spacing: 1px; */
    -webkit-box-shadow: 0px 0px 1px 1px ${colors.darkPrimary};
    -moz-box-shadow: 0px 0px 1px 1px ${colors.darkPrimary};
    box-shadow: 0px 0px 1px 1px ${colors.darkPrimary};
    transition: all ${animations.speed} ease 0s;
  }
  :focus {
    outline: none;
    box-shadow: 0 0 2pt 1pt ${colors.focus};
  }
  :active {
    background-color: #499dab;
  }
  cursor: pointer;
`;
