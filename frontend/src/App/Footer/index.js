import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.footer`
  margin: 1em 0;
  padding: 0 0;
`;

const Footer = (props) => {
  return (
    <Wrapper>
      <p>Made with &#10084; by Josefine and Henning</p>
    </Wrapper>
  );
};

export default Footer;
