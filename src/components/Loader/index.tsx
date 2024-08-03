import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const SpinnerContainer = styled.div`
  margin: 0 auto;
`;

const Spinner = styled.div`
  border: 8px solid rgba(0, 0, 0, 0.1);
  border-top: 8px solid transparent;
  border-radius: 50%;
  width: 64px;
  height: 64px;
  animation: ${spin} 1s linear infinite;
  background-clip: border-box;
  margin: 0 auto;
  margin-top: 24rem;
`;

const Loader: React.FC = () => {
  return (
    <SpinnerContainer>
      <Spinner />
    </SpinnerContainer>
  );
};

export default Loader;
