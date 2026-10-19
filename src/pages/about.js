import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Layout, About } from '@components';

const StyledMainContainer = styled.main`
  counter-reset: section;
  flex: 1;
  min-height: 0;
  padding: 104px clamp(28px, 6vw, 110px) 20px;

  #about {
    padding: 0;
    .numbered-heading { margin: 0 0 22px; font-size: 30px; }
    &.text-only .about-text {
      display: grid;
      grid-template-columns: minmax(0, .95fr) minmax(0, 1.05fr);
      gap: 44px;
      font-size: 18px;
      line-height: 1.5;
    }
    .about-block + .about-block { margin: 0; padding: 0; border: 0; }
    .about-block h3 { font-size: 22px; margin: 0 0 16px; }
    .background-group + .background-group { margin-top: 16px; }
    .background-group h4 { font-size: 18px; margin: 0 0 8px; line-height: 1.4; }
    .background-list li { margin-bottom: 6px; padding-left: 18px; line-height: 1.5; }
    &.text-only .about-text p { margin: 0 0 18px; }
    .interest-item:last-child { margin-bottom: 0; }
  }

  @media (max-width: 999px) {
    padding: 104px 32px 24px;
    #about.text-only .about-text { grid-template-columns: minmax(0, 1fr); gap: 28px; }
  }
  @media (max-width: 480px) {
    padding: 100px 25px 24px;
    #about .numbered-heading { font-size: 28px; margin-bottom: 20px; }
  }
  @media (min-width: 1000px) and (max-height: 680px) {
    padding-top: 94px;
    padding-bottom: 12px;
    #about {
      .numbered-heading { margin-bottom: 16px; font-size: 28px; }
      &.text-only .about-text { font-size: 17px; line-height: 1.45; gap: 36px; }
      .about-block h3 { font-size: 20px; margin-bottom: 12px; }
      .background-group + .background-group { margin-top: 12px; }
      .background-group h4 { font-size: 17px; margin-bottom: 6px; }
      .background-list li { margin-bottom: 4px; line-height: 1.4; }
    }
  }
`;

const AboutPage = ({ location }) => (
  <Layout location={location}>
    <StyledMainContainer>
      <About />
    </StyledMainContainer>
  </Layout>
);

AboutPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default AboutPage;
