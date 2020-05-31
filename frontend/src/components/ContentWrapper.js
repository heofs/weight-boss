import styled from 'styled-components';
import { device } from 'constants/theme';

export const contentWidthXs = '90vw';
export const contentWidthTablet = '700px';
export const contentWidthDesktop = '750px';
export const contentWidthDesktopLg = '800px';

const Wrapper = styled.div`
  max-width: ${contentWidthXs};
  @media ${device.tablet} {
    width: ${contentWidthTablet};
  }
  @media ${device.desktop} {
    width: ${contentWidthDesktop};
  }
  @media ${device.desktopLg} {
    width: ${contentWidthDesktopLg};
  }
`;

export default Wrapper;
