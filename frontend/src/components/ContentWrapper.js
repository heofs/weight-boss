import styled from 'styled-components';
import { device } from 'constants/theme';

const Wrapper = styled.div`
  max-width: 90vw;
  @media ${device.tablet} {
    max-width: 65vw;
  }
  @media ${device.desktop} {
    max-width: 55vw;
  }
  @media ${device.desktopLg} {
    max-width: 40vw;
  }
`;

export default Wrapper;
