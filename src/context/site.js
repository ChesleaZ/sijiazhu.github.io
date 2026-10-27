import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withPrefix } from 'gatsby';
import { createGlobalStyle } from 'styled-components';
import model from '../../static/editor/site-model';
import publishedContent from '../../static/site-config.json';

const initialContent = model.normalize(publishedContent);
const Context = createContext({ config: initialContent, preview: false, edit: () => ({}) });
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
  html[data-theme='light']:root {
    color-scheme: light;
    --dark-navy: #eef2f6;
    --navy: #f7f9fb;
    --surface: #ffffff;
    --light-navy: #ffffff;
    --lightest-navy: #d6dfe7;
    --navy-shadow: rgba(24, 44, 66, 0.12);
    --dark-slate: #6b7c8e;
    --slate: #4a5a6b;
    --light-slate: #55657a;
    --lightest-slate: #142030;
    --white: #0f1a28;
    --green: #0d8574;
    --green-tint: rgba(13, 133, 116, 0.1);
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
  const [config, setConfig] = useState(initialContent);
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
      if (link.origin === window.location.origin) {
        const section = link.hash.slice(1);
        const target = section && document.getElementById(section);
        if (target && link.pathname === window.location.pathname) {
          target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
          return;
        }
        const sectionPages = { home: 'home', about: 'about', research: 'research', publications: 'publications', contact: 'contact' };
        window.parent.postMessage({ type: 'site-navigate', page: sectionPages[section] || pageForPath(link.pathname) }, window.location.origin);
      }
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

