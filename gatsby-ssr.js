/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

const React = require('react');

// Apply the visitor's saved light/dark choice before the page paints (dark is the default).
const themeScript = `try{if(localStorage.getItem('sz-theme')==='light')document.documentElement.setAttribute('data-theme','light')}catch(e){}`;

exports.onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    React.createElement('script', { key: 'sz-theme', dangerouslySetInnerHTML: { __html: themeScript } }),
  ]);
};
