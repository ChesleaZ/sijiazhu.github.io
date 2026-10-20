import React, { useState, useEffect, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { withPrefix } from 'gatsby';
import ScienceBackdrop from './science-backdrop';
import styled, { ThemeProvider } from 'styled-components';
import { Head, Loader, Nav, Social, Email, Footer } from '@components';
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
`;

// Play the intro logo animation only once per browser session.
const INTRO_KEY = 'sz-intro-played';
let introPlayedThisLoad = false;
const hasPlayedIntro = () => {
  if (introPlayedThisLoad) {
    return true;
  }
  try {
    return window.sessionStorage.getItem(INTRO_KEY) === '1';
  } catch (e) {
    return false;
  }
};
const markIntroPlayed = () => {
  introPlayedThisLoad = true;
  try {
    window.sessionStorage.setItem(INTRO_KEY, '1');
  } catch (e) {
    // Storage can be unavailable (e.g. private mode); the in-memory flag still covers in-site navigation.
  }
};
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const Layout = ({ children, location }) => {
  // The site is served under a path prefix (/sijiazhu.github.io/), so compare against the prefixed root.
  const normalize = path => (path || '/').replace(/\/+$/, '') || '/';
  const isHome = [normalize('/'), normalize(withPrefix('/'))].includes(normalize(location.pathname));
  const page = pageForPath(location.pathname);
  const [isLoading, setIsLoading] = useState(isHome);
  const [animateIntro, setAnimateIntro] = useState(isHome);

  useIsomorphicLayoutEffect(() => {
    if (!isHome) {
      return;
    }
    if (hasPlayedIntro()) {
      setIsLoading(false);
      setAnimateIntro(false);
    } else {
      markIntroPlayed();
    }
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
    if (isLoading) {
      return;
    }

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
  }, [isLoading, location.hash]);

  return (
    <SiteProvider>
      <Head />

      <div id="root">
        <ThemeProvider theme={theme}>
          <GlobalStyle />

          <a className="skip-to-content" href="#content">
            Skip to Content
          </a>

          {isLoading && isHome ? (
            <Loader finishLoading={() => setIsLoading(false)} />
          ) : (
            <StyledContent className={'page-' + page}>
              <ScienceBackdrop page={pageForPath(location.pathname)} />
              <Nav isHome={animateIntro} />
              <Social isHome={animateIntro} />
              <Email isHome={animateIntro} />

              <div id="content">
                {children}
                <Footer isHome={page === 'home'} />
              </div>
            </StyledContent>
          )}
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

