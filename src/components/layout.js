import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ScienceBackdrop from './science-backdrop';
import styled, { ThemeProvider } from 'styled-components';
import { Head, Nav, Social, Email, Footer } from '@components';
import { GlobalStyle, theme } from '@styles';
import { SiteProvider, pageForPath } from '../context/site';

const StyledContent = styled.div`
  position: relative;
  isolation: isolate;
  #content { position: relative; z-index: 1; }
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  &.page-home, &.page-about {
    #content { display: flex; flex-direction: column; min-height: 100svh; }
    header { height: 80px; }
    footer { min-height: 40px; padding: 8px 15px; }
    footer a { padding: 6px 10px; }
  }

  /* Homepage entrance: only the background shows at first, then the content fades in.
     Pure CSS, so it also applies to the pre-rendered HTML and nothing flashes. */
  @keyframes sz-fade { from { opacity: 0; } to { opacity: 1; } }
  @keyframes sz-fadeup { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: none; } }
  &.page-home.intro {
    header { animation: sz-fade 0.8s ease 0.2s both; }
    .hero-content > div { animation: sz-fadeup 0.7s cubic-bezier(0.645, 0.045, 0.355, 1) both; }
    .hero-content > div:nth-child(1) { animation-delay: 0.5s; }
    .hero-content > div:nth-child(2) { animation-delay: 0.65s; }
    .hero-content > div:nth-child(3) { animation-delay: 0.8s; }
    .hero-photo-slot { animation: sz-fadeup 0.8s cubic-bezier(0.645, 0.045, 0.355, 1) 1s both; }
    .side-element, footer { animation: sz-fade 0.8s ease 1.4s both; }
  }
  @media (prefers-reduced-motion: reduce) {
    &.page-home.intro * { animation: none !important; }
  }
`;

// The entrance plays on a full page load; later in-site visits to the homepage skip it.
let introDone = false;

const Layout = ({ children, location }) => {
  const page = pageForPath(location.pathname);
  const [intro, setIntro] = useState(!introDone);

  useEffect(() => {
    if (!intro) {
      return undefined;
    }
    const timeout = setTimeout(() => {
      introDone = true;
      setIntro(false);
    }, 2600);
    return () => clearTimeout(timeout);
  }, []);

  // Sets target="_blank" rel="noopener noreferrer" on external links
  const handleExternalLinks = () => {
    const allLinks = Array.from(document.querySelectorAll('a'));
    if (allLinks.length > 0) {
      allLinks.forEach(link => {
        if (link.host !== window.location.host) {
          link.setAttribute('rel', 'noopener noreferrer');
          link.setAttribute('target', '_blank');
        }
      });
    }
  };

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.substring(1); // location.hash without the '#'
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView();
          el.focus();
        }
      }, 0);
    }

    handleExternalLinks();
  }, [location.hash]);

  return (
    <SiteProvider>
      <Head />

      <div id="root">
        <ThemeProvider theme={theme}>
          <GlobalStyle />

          <a className="skip-to-content" href="#content">
            Skip to Content
          </a>

          <StyledContent className={'page-' + page + (intro ? ' intro' : '')}>
            <ScienceBackdrop page={pageForPath(location.pathname)} />
            <Nav isHome={false} />
            <Social isHome={false} />
            <Email isHome={false} />

            <div id="content">
              {children}
              <Footer isHome={page === 'home'} />
            </div>
          </StyledContent>
        </ThemeProvider>
      </div>
    </SiteProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired,
};

export default Layout;

