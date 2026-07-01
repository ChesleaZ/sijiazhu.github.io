import { css } from 'styled-components';

const variables = css`
  :root {
    --dark-navy: #d8cdbc;
    --navy: #f7f4ee;
    --light-navy: #ffffff;
    --lightest-navy: #d9e4df;
    --navy-shadow: rgba(63, 56, 45, 0.16);
    --dark-slate: #2e3a3f;
    --slate: #52606d;
    --light-slate: #687782;
    --lightest-slate: #1f2a2e;
    --white: #ffffff;
    --green: #2f6f73;
    --green-tint: rgba(47, 111, 115, 0.09);
    --pink: #9a5a6a;
    --blue: #356d9a;

    --font-sans: 'Calibre', 'Inter', 'San Francisco', 'SF Pro Text', -apple-system, system-ui,
      sans-serif;
    --font-mono: 'SF Mono', 'Fira Code', 'Fira Mono', 'Roboto Mono', monospace;

    --fz-xxs: 12px;
    --fz-xs: 13px;
    --fz-sm: 14px;
    --fz-md: 16px;
    --fz-lg: 18px;
    --fz-xl: 20px;
    --fz-xxl: 22px;
    --fz-heading: 32px;

    --border-radius: 4px;
    --nav-height: 100px;
    --nav-scroll-height: 70px;

    --tab-height: 42px;
    --tab-width: 120px;

    --easing: cubic-bezier(0.645, 0.045, 0.355, 1);
    --transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);

    --hamburger-width: 30px;

    --ham-before: top 0.1s ease-in 0.25s, opacity 0.1s ease-in;
    --ham-before-active: top 0.1s ease-out, opacity 0.1s ease-out 0.12s;
    --ham-after: bottom 0.1s ease-in 0.25s, transform 0.22s cubic-bezier(0.55, 0.055, 0.675, 0.19);
    --ham-after-active: bottom 0.1s ease-out,
      transform 0.22s cubic-bezier(0.215, 0.61, 0.355, 1) 0.12s;
  }
`;

export default variables;
