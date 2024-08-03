import React from 'react';
import styled from 'styled-components';

import Alert from '../../assets/images/alert.png';

const ErrorWrapper = styled.div`
  text-align: center;
`;

const ErrorWrapperImg = styled.div`
  max-width: 245px;
  margin: 0 auto 6rem;
`;

const ErrorWrapperTitle = styled.h2`
  font-size: 30px;
  color: rgba(255, 255, 255, 0.85);
`;

const ErrorWrapperSubtitle = styled.h3`
  font-size: 20px;
  color: rgba(255, 255, 255, 0.6);
`;

const Error: React.FC = () => {
  return (
    <ErrorWrapper>
      <ErrorWrapperImg>
        <img src={Alert} alt="Error" />
      </ErrorWrapperImg>
      <ErrorWrapperTitle>City not found</ErrorWrapperTitle>
      <ErrorWrapperSubtitle>Did you make a typo?</ErrorWrapperSubtitle>
    </ErrorWrapper>
  );
};

export default Error;
