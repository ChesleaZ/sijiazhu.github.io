(function() {
  'use strict';
  const model = window.SiteContentModel;
  const preview = new URLSearchParams(location.search).get('preview') === '1' && parent !== window;
  const selectors = {
    eyebrow: '.eyebrow', title: '#paper-title', authors: '.authors', status: '.status',
    overviewTitle: '#overview-title', availabilityTitle: '#availability-title', availabilityText: '.availability p',
  };
  const svgNS = 'http://www.w3.org/2000/svg';
  const backdrop = document.createElement('div');
  backdrop.className = 'science-backdrop'; backdrop.dataset.page = 'paper'; backdrop.setAttribute('aria-hidden', 'true');
  [['network','0 0 230 150'], ['cells','0 0 175 145'], ['surface','0 0 245 195'], ['umap','0 0 214 186'], ['objective','0 0 586 86'], ['attention','0 0 566 102'], ['robot','0 0 125 143'], ['tubes','0 0 133 148']].forEach(([id, viewBox]) => {
    const motif = document.createElement('div'); motif.className = 'science-motif science-' + id;
    const svg = document.createElementNS(svgNS, 'svg'); svg.setAttribute('viewBox', viewBox); svg.setAttribute('fill', 'none'); svg.setAttribute('stroke', 'currentColor'); svg.setAttribute('stroke-width', '1.4'); svg.setAttribute('focusable', 'false');
    const use = document.createElementNS(svgNS, 'use'); use.setAttribute('href', '../../science/motifs.svg?v=curves-20261018#' + id);
    svg.appendChild(use); motif.appendChild(svg); backdrop.appendChild(motif);
  });
  document.body.prepend(backdrop);
  function apply(value) {
    const config = model.normalize(value), data = config.paper, theme = config.theme;
    for (const [name, color] of Object.entries({ '--paper': theme.background, '--ink': theme.text, '--muted': theme.muted, '--accent': theme.accent, '--surface': theme.surface })) document.documentElement.style.setProperty(name, color);
    backdrop.hidden = !data.backgroundEnabled;
    backdrop.style.setProperty('--science-opacity', data.backgroundOpacity / 100);
    backdrop.dataset.animated = String(data.backgroundAnimated && data.backgroundOpacity > 0);
    document.body.style.fontSize = theme.fontSize + 'px';
    document.querySelectorAll('header, main, footer').forEach(el => el.style.width = 'min(' + data.width + 'px, calc(100% - 48px))');
    document.querySelector('.availability').style.borderRadius = theme.cardRadius + 'px';
    for (const [field, selector] of Object.entries(selectors)) {
      const node = document.querySelector(selector);
      node.textContent = data[field];
      node.dataset.editPath = 'paper.' + field;
      if (preview) node.contentEditable = 'true';
    }
    const overview = document.querySelector('.overview');
    overview.querySelectorAll('p').forEach(node => node.remove());
    data.paragraphs.forEach((text, index) => {
      const p = document.createElement('p'); p.textContent = text; p.dataset.editPath = 'paper.paragraphs.' + index;
      if (preview) p.contentEditable = 'true';
      overview.appendChild(p);
    });
    const preprint = document.getElementById('preprint-link');
    preprint.hidden = !data.preprintURL;
    preprint.textContent = data.preprintLabel;
    if (data.preprintURL) preprint.href = data.preprintURL; else preprint.removeAttribute('href');
    document.title = data.title + ' | Sijia Zhu';
  }
  window.addEventListener('message', event => {
    if (preview && event.origin === location.origin && event.source === parent && event.data?.type === 'site-config') apply(event.data.settings);
  });
  document.addEventListener('blur', event => {
    if (preview && event.target.dataset.editPath) parent.postMessage({ type: 'site-text-edit', path: event.target.dataset.editPath, value: event.target.textContent }, location.origin);
  }, true);
  document.addEventListener('click', event => {
    if (!preview) return;
    const link = event.target.closest('a'); if (!link) return;
    event.preventDefault();
    if (link.origin === location.origin) parent.postMessage({ type: 'site-navigate', page: link.pathname.includes('/publications') ? 'publications' : 'home' }, location.origin);
  }, true);
  apply(model.defaults);
  if (preview) parent.postMessage({ type: 'site-preview-ready' }, location.origin);
  else fetch('../../site-config.json', { cache: 'no-store' }).then(r => r.ok ? r.json() : null).then(value => { if (value) apply(value); }).catch(() => {});
})();
