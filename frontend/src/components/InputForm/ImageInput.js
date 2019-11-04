import React from 'react';
import styled from 'styled-components';

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 10em;
  svg {
    height: 50px;
    margin: 1em;
  }
`;

const ImageInput = ({ icon: Icon, children }) => {
  return (
    <InputGroup>
      <Icon />
      {children}
    </InputGroup>
  );
};

export default ImageInput;
