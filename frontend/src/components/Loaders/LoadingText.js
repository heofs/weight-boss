import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
  margin-bottom: 1em;
`;

const LoaderDot = styled.span`
  animation: 1s blink infinite;

  :nth-child(2) {
    animation-delay: 250ms;
  }
  :nth-child(3) {
    animation-delay: 500ms;
  }
`;

const LoadingText = ({ children, visible }) => {
  return (
    <Wrapper visible={visible}>
      {children}
      <LoaderDot>.</LoaderDot>
      <LoaderDot>.</LoaderDot>
      <LoaderDot>.</LoaderDot>
      <LoaderDot>.</LoaderDot>
    </Wrapper>
  );
};

LoadingText.propTypes = {
  children: PropTypes.node.isRequired,
  visible: PropTypes.bool,
};

LoadingText.defaultProps = {
  visible: true,
};

export default LoadingText;
