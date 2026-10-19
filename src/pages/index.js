import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Layout, Hero } from '@components';

const StyledMainContainer = styled.main`
  counter-reset: section;
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;

  &.fillHeight { padding: 104px clamp(28px, 6vw, 110px) 16px; }
  #home { flex: 1; min-height: 0; width: 100%; padding: 0; }

  @media (min-width: 900px) {
    #home {
      max-width: 1180px;
      grid-template-columns: minmax(0, 1.6fr) minmax(220px, .9fr);
      gap: clamp(32px, 4vw, 64px);
    }
    #home .hero-content { width: 100%; max-width: none; justify-self: start; }
    #home .hero-photo-slot { order: 0; justify-self: center; }
    #home .hero-photo { width: min(var(--hero-photo-width, 340px), 31vw, calc(100svh - 220px)); }
    #home.photo-left { grid-template-columns: minmax(220px, .9fr) minmax(0, 1.6fr); }
    #home.photo-left .hero-photo-slot { order: -1; }
  }
  @media (max-width: 899px) {
    &.fillHeight { padding: 96px 32px 16px; }
    #home { gap: 20px; }
    #home .hero-photo { width: min(240px, 48vw); }
  }
  @media (max-width: 480px) {
    &.fillHeight { padding: 94px 25px 12px; }
    #home { gap: 18px; }
    #home .hero-photo { width: min(200px, 52vw); }
    #home h1 { margin-bottom: 18px; }
  }
  @media (min-width: 900px) and (max-height: 680px) {
    &.fillHeight { padding-top: 94px; padding-bottom: 12px; }
    #home h1 { margin-bottom: 18px; font-size: 20px; }
    #home h2.big-heading { font-size: min(var(--hero-name-size), 54px); }
    #home h3 { font-size: min(var(--hero-topic-size), 36px); }
  }
`;

const IndexPage = ({ location }) => (
  <Layout location={location}>
    <StyledMainContainer className="fillHeight">
      <Hero />
    </StyledMainContainer>
  </Layout>
);

IndexPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default IndexPage;
