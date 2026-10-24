import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

// Shared with gatsby-ssr.js and the standalone pages in /static.
export const THEME_KEY = 'sz-theme';

const StyledToggle = styled.button`
  ${({ theme }) => theme.mixins.flexCenter};
  width: 38px;
  height: 38px;
  margin-left: 15px;
  padding: 0;
  border: 1px solid var(--lightest-navy);
  border-radius: 50%;
  background-color: transparent;
  color: var(--green);
  cursor: pointer;
  transition: var(--transition);

  &:hover,
  &:focus-visible {
    border-color: var(--green);
    background-color: var(--green-tint);
    outline: 0;
  }

  svg {
    width: 18px;
    height: 18px;
    fill: none;
    stroke: currentColor;
    stroke-width: 1.8;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  @media (max-width: 768px) {
    margin-left: 0;
    margin-right: 12px;
  }
`;

const Sun = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="4.2" />
    <path d="M12 2.5v2.2M12 19.3v2.2M4.6 4.6l1.6 1.6M17.8 17.8l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.6 19.4l1.6-1.6M17.8 6.2l1.6-1.6" />
  </svg>
);

const Moon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7z" />
  </svg>
);

const ThemeToggle = () => {
  const [mode, setMode] = useState('dark');

  useEffect(() => {
    setMode(document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark');
  }, []);

  const toggle = () => {
    const next = mode === 'light' ? 'dark' : 'light';
    if (next === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    try {
      window.localStorage.setItem(THEME_KEY, next);
    } catch (e) {
      // Storage can be unavailable (private mode); the switch still works for this page.
    }
    setMode(next);
  };

  const label = mode === 'light' ? 'Switch to dark mode' : 'Switch to light mode';
  return (
    <StyledToggle type="button" className="theme-toggle" onClick={toggle} aria-label={label} title={label}>
      {mode === 'light' ? <Moon /> : <Sun />}
    </StyledToggle>
  );
};

export default ThemeToggle;
