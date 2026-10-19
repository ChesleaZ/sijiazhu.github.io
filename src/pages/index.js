import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Layout, Hero, About, Research, Projects, Contact } from '@components';
import scrollToSection from '../utils/scroll-to-section';

const StyledMainContainer = styled.main`
  counter-reset: section;

  .home-intro { position: relative; }
  .scroll-cue {
    position: absolute;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    gap: 12px;
    white-space: nowrap;
    color: var(--slate);
    font: 12px var(--font-mono);
  }
  .scroll-cue span { color: var(--green); font-size: 22px; }
  .scroll-cue:hover, .scroll-cue:focus { color: var(--green); }
  @media (max-width: 480px) { .scroll-cue { bottom: 16px; font-size: 11px; } }
`;

const IndexPage = ({ location }) => (
  <Layout location={location}>
    <StyledMainContainer className="fillHeight home-sections">
      <div className="home-intro">
        <Hero />
        <a className="scroll-cue" href="#about" onClick={scrollToSection}>
          Scroll to explore <span aria-hidden="true">↓</span>
        </a>
      </div>
      <About />
      <Research />
      <Projects />
      <Contact />
    </StyledMainContainer>
  </Layout>
);

IndexPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default IndexPage;
