import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Layout, About } from '@components';

const StyledMainContainer = styled.main`
  counter-reset: section;
  flex: 1;
  min-height: 0;
  padding: 94px clamp(28px, 6vw, 110px) 12px;

  #about {
    padding: 0;
    .numbered-heading { margin: 0 0 16px; font-size: 28px; }
    &.text-only .about-text {
      display: block;
      font-size: 18px;
      line-height: 1.4;
    }
    .about-block + .about-block { margin: 16px 0 0; padding: 0; border: 0; }
    .about-block h3 { font-size: 21px; margin: 0 0 10px; }
    .background-group + .background-group { margin-top: 10px; }
    .background-group h4 { font-size: 18px; margin: 0 0 4px; line-height: 1.35; }
    .background-list li { margin-bottom: 2px; padding-left: 18px; line-height: 1.4; }
    &.text-only .about-text p { margin: 0 0 10px; }
    .interest-item:last-child { margin-bottom: 0; }
  }

  @media (max-width: 999px) {
    padding: 100px 32px 24px;
    #about {
      &.text-only .about-text { line-height: 1.5; }
      .about-block + .about-block { margin-top: 24px; }
      .background-group + .background-group { margin-top: 16px; }
      .background-list li { margin-bottom: 6px; line-height: 1.5; }
      &.text-only .about-text p { margin-bottom: 16px; }
    }
  }
  @media (max-width: 480px) {
    padding: 96px 25px 24px;
    #about .numbered-heading { font-size: 28px; margin-bottom: 20px; }
  }
  @media (min-width: 1000px) and (max-height: 680px) {
    padding-top: 88px;
    padding-bottom: 8px;
    #about {
      .numbered-heading { margin-bottom: 10px; font-size: 27px; }
      &.text-only .about-text { font-size: 16px; line-height: 1.3; }
      .about-block + .about-block { margin-top: 12px; }
      .about-block h3 { font-size: 20px; margin-bottom: 8px; }
      .background-group + .background-group { margin-top: 8px; }
      .background-group h4 { font-size: 16px; margin-bottom: 2px; line-height: 1.3; }
      .background-list li { margin-bottom: 1px; line-height: 1.3; }
      &.text-only .about-text p { margin-bottom: 8px; }
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
