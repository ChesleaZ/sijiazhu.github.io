import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Layout, About } from '@components';

const StyledMainContainer = styled.main`
  counter-reset: section;
  flex: 1;
  min-height: 0;
  padding: clamp(94px, 10.8vh, 110px) clamp(28px, 6vw, 110px) 18px;

  #about {
    padding: 0;
    .numbered-heading { margin: 0 0 clamp(16px, 2vh, 22px); font-size: clamp(28px, 3.75vh, 36px); }
    &.text-only .about-text { display: block; font-size: clamp(17px, 2.1vh, 20px); line-height: 1.55; }
    .about-block + .about-block { margin: clamp(24px, 3.2vh, 34px) 0 0; padding: 0; border: 0; }
    .about-block h3 { font-size: clamp(22px, 2.6vh, 26px); margin: 0 0 16px; }
    .background-group + .background-group { margin-top: 20px; }
    .background-group h4 { font-size: 1em; margin: 0 0 8px; line-height: 1.45; }
    .background-list > li { margin-bottom: 6px; padding-left: 18px; line-height: 1.5; }
    .advisor-list { margin-top: 6px; margin-bottom: 2px; }
    &.text-only .about-text p { margin: 0 0 20px; }
    .interest-item:last-child { margin-bottom: 0; }
  }

  @media (min-width: 1000px) and (max-height: 800px) {
    padding-top: 94px;
    padding-bottom: 12px;
    #about {
      .numbered-heading { margin-bottom: 14px; font-size: 28px; }
      &.text-only .about-text { font-size: 17px; line-height: 1.42; }
      .about-block + .about-block { margin-top: 22px; }
      .about-block h3 { font-size: 21px; margin-bottom: 12px; }
      .background-group + .background-group { margin-top: 14px; }
      .background-group h4 { margin-bottom: 6px; line-height: 1.4; }
      .background-list > li { margin-bottom: 3px; line-height: 1.42; }
      .advisor-list { margin-top: 3px; }
      .background-list .advisor-list li { line-height: 1.42; }
      &.text-only .about-text p { margin-bottom: 14px; }
    }
  }
  @media (min-width: 1000px) and (max-height: 640px) {
    padding-top: 88px;
    padding-bottom: 8px;
    #about {
      .numbered-heading { font-size: 26px; margin-bottom: 10px; }
      &.text-only .about-text { font-size: 16px; line-height: 1.3; }
      .about-block + .about-block { margin-top: 12px; }
      .about-block h3 { font-size: 20px; margin-bottom: 8px; }
      .background-group + .background-group { margin-top: 8px; }
      .background-group h4 { margin-bottom: 2px; }
      .background-list > li { margin-bottom: 1px; line-height: 1.3; }
      .background-list .advisor-list li { line-height: 1.3; }
      &.text-only .about-text p { margin-bottom: 8px; }
    }
  }
  @media (max-width: 999px) {
    padding: 100px 32px 24px;
    #about {
      &.text-only .about-text { font-size: 18px; line-height: 1.5; }
      .numbered-heading { font-size: 30px; }
      .about-block + .about-block { margin-top: 26px; }
      .background-group + .background-group { margin-top: 20px; }
      .background-list > li { margin-bottom: 6px; line-height: 1.5; }
      .background-list .advisor-list li { line-height: 1.5; }
    }
  }
  @media (max-width: 480px) { padding: 96px 25px 24px; }
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
