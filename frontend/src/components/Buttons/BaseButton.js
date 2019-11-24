import styled from 'styled-components';
import { colors, animations, sizes } from 'constants/theme';

export default styled.button`
  color: ${colors.text};
  background: ${colors.primary};
  font-size: ${sizes.textSize};
  text-decoration: none;
  border-radius: ${sizes.cornerRadius};
  display: inline-block;
  border: none;
  transition: all ${animations.speed} ease 0s;
  :hover {
    background: #434343;
    /* letter-spacing: 1px; */
    -webkit-box-shadow: 0px 5px 40px -10px rgba(0, 0, 0, 0.57);
    -moz-box-shadow: 0px 5px 40px -10px rgba(0, 0, 0, 0.57);
    box-shadow: 5px 40px -10px rgba(0, 0, 0, 0.57);
    transition: all ${animations.speed} ease 0s;
  }
  :focus {
    outline: none;
    box-shadow: 0 0 2pt 1pt ${colors.focus};
  }
`;
