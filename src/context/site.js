import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withPrefix } from 'gatsby';
import { createGlobalStyle } from 'styled-components';
import model from '../../static/editor/site-model';

const Context = createContext({ config: model.defaults, preview: false, edit: () => ({}) });
const SiteStyle = createGlobalStyle`
  html:root {
    --navy: ${p => p.content.theme.background};
    --dark-navy: ${p => p.content.theme.background};
    --surface: ${p => p.content.theme.surface};
    --light-navy: ${p => p.content.theme.surface};
    --green: ${p => p.content.theme.accent};
    --lightest-slate: ${p => p.content.theme.text};
    --white: ${p => p.content.theme.text};
    --slate: ${p => p.content.theme.muted};
    --light-slate: ${p => p.content.theme.muted};
    --border-radius: ${p => p.content.theme.cardRadius}px;
  }
  html body { font-size: ${p => p.content.theme.fontSize}px; }
  #about { max-width: ${p => p.content.about.width}px; }
  #research { max-width: ${p => p.content.research.width}px; }
  #publications, #publication-archive { max-width: ${p => p.content.publications.width}px; margin-left: auto; margin-right: auto; }
  #contact { max-width: ${p => p.content.contact.width}px; }
  #research .research-card, #research .academic-card, #publications .project-inner, #contact .contact-card {
    border-radius: ${p => p.content.theme.cardRadius}px;
  }
  @media (min-width: 1000px) {
    #publications .projects-grid { grid-template-columns: repeat(${p => p.content.publications.columns}, minmax(0, 1fr)); }
    #about .inner { grid-template-columns: ${p => !p.content.about.photoVisible ? '1fr' : p.content.about.photoSide === 'left' ? '2fr 3fr' : '3fr 2fr'}; }
    #about .about-photo { order: ${p => p.content.about.photoSide === 'left' ? -1 : 0}; }
  }
  #about .about-photo { display: ${p => p.content.about.photoVisible ? 'block' : 'none'}; }
  html.site-preview [data-sr-id] { visibility: visible !important; opacity: 1 !important; transform: none !important; }
  [data-edit-path][contenteditable='true']:hover { outline: 1px dashed var(--green); outline-offset: 4px; }
  [data-edit-path][contenteditable='true']:focus { outline: 1px solid var(--green); outline-offset: 4px; }
  .site-edit-entry { display: block; width: fit-content; margin: 0 auto 24px; font: 11px var(--font-mono); color: var(--slate); opacity: .7; }
`;

export const pageForPath = path => {
  if (path.includes('/papers/')) return 'paper';
  if (path.includes('/archive')) return 'archive';
  if (path.includes('/publications')) return 'publications';
  if (path.includes('/research')) return 'research';
  if (path.includes('/about')) return 'about';
  if (path.includes('/contact')) return 'contact';
  return 'home';
};

export const SiteProvider = ({ children }) => {
  const [config, setConfig] = useState(model.defaults);
  const [preview, setPreview] = useState(false);
  useEffect(() => {
    let cancelled = false;
    const editing = new URLSearchParams(window.location.search).get('preview') === '1' && window.parent !== window;
    setPreview(editing);
    if (editing) document.documentElement.classList.add('site-preview');
    const receive = event => {
      if (editing && event.origin === window.location.origin && event.source === window.parent && event.data?.type === 'site-config') {
        setConfig(model.normalize(event.data.settings));
      }
    };
    const navigate = event => {
      if (!editing) return;
      const link = event.target.closest('a');
      if (!link) return;
      event.preventDefault();
      if (event.target.closest('[contenteditable=true]')) return;
      if (link.origin === window.location.origin) window.parent.postMessage({ type: 'site-navigate', page: pageForPath(link.pathname) }, window.location.origin);
    };
    window.addEventListener('message', receive);
    document.addEventListener('click', navigate, true);
    if (editing) window.parent.postMessage({ type: 'site-preview-ready' }, window.location.origin);
    else fetch(withPrefix('/site-config.json'), { cache: 'no-store' }).then(r => r.ok ? r.json() : null).then(value => {
      if (!cancelled && value) setConfig(model.normalize(value));
    }).catch(() => {});
    return () => {
      cancelled = true;
      document.documentElement.classList.remove('site-preview');
      window.removeEventListener('message', receive);
      document.removeEventListener('click', navigate, true);
    };
  }, []);
  const edit = path => ({
    'data-edit-path': path,
    ...(preview ? {
      contentEditable: true, suppressContentEditableWarning: true,
      onBlur: event => window.parent.postMessage({ type: 'site-text-edit', path, value: event.currentTarget.textContent }, window.location.origin),
    } : {}),
  });
  return <Context.Provider value={{ config, preview, edit }}><SiteStyle content={config} />{children}</Context.Provider>;
};
SiteProvider.propTypes = { children: PropTypes.node.isRequired };
export const useSite = () => useContext(Context);

export const EditPageLink = ({ page }) => (
  <a className="site-edit-entry" href={withPrefix('/editor/?page=' + encodeURIComponent(page))}>编辑本页 · Edit this page</a>
);
EditPageLink.propTypes = { page: PropTypes.string.isRequired };
