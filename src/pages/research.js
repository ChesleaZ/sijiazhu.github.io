import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Layout, Research } from '@components';

const StyledMainContainer = styled.main`
  counter-reset: section;
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
