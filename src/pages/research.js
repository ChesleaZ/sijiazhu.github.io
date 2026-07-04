import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Layout, Jobs, Featured } from '@components';

const StyledMainContainer = styled.main`
  counter-reset: section;
`;

const ResearchPage = ({ location }) => (
  <Layout location={location}>
    <StyledMainContainer>
      <Jobs />
      <Featured />
    </StyledMainContainer>
  </Layout>
);

ResearchPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default ResearchPage;
