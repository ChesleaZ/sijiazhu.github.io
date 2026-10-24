import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Layout, Projects } from '@components';

const StyledMainContainer = styled.main`
  counter-reset: section;
  padding-top: 130px;

  @media (max-width: 768px) {
    padding-top: 110px;
  }
`;

const PublicationsPage = ({ location }) => (
  <Layout location={location}>
    <StyledMainContainer>
      <Projects />
    </StyledMainContainer>
  </Layout>
);

PublicationsPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default PublicationsPage;
