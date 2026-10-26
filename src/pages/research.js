import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Layout, Research } from '@components';

const StyledMainContainer = styled.main`
  counter-reset: section;
  padding-top: 130px;

  @media (max-width: 768px) {
    padding-top: 110px;
  }
`;

const ResearchPage = ({ location }) => (
  <Layout location={location}>
    <StyledMainContainer>
      <Research />
    </StyledMainContainer>
  </Layout>
);

ResearchPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default ResearchPage;
