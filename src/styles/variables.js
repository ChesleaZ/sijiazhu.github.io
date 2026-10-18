import { css } from 'styled-components';

const variables = css`
  :root {
    color-scheme: dark;
    --dark-navy: #080e19;
    --navy: #0b1220;
    --surface: #111d2e;
    --light-navy: #111d2e;
    --lightest-navy: #26394b;
    --navy-shadow: rgba(0, 0, 0, 0.45);
    --dark-slate: #778da5;
    --slate: #b2c0d0;
    --light-slate: #9dadc1;
    --lightest-slate: #e6edf4;
    --white: #f3f6fa;
    --green: #7ad8c7;
    --green-tint: rgba(122, 216, 199, 0.12);
    --pink: #e5a2b5;
    --blue: #8ebef0;

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
