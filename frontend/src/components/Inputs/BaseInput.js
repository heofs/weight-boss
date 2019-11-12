import styled from 'styled-components';
import { sizes, colors } from 'constants/theme';

export default styled.input`
  width: 4.9em;
  margin: 1em 0;
  padding: 0.375em 0.5em;
  font-size: ${sizes.textSize};
  font-weight: 400;
  color: ${colors.dark};
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
`;
