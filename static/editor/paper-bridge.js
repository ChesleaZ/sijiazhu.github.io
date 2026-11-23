(function() {
  'use strict';
  const model = window.SiteContentModel;
  const preview = new URLSearchParams(location.search).get('preview') === '1' && parent !== window;
  function apply(value) {
    const { paper, theme } = model.normalize(value);
    for (const [name, color] of Object.entries({ '--paper': theme.background, '--ink': theme.text, '--muted': theme.muted, '--accent': theme.accent, '--surface': theme.surface })) document.documentElement.style.setProperty(name, color);
    document.documentElement.style.setProperty('--content-width', paper.width + 'px');
    document.documentElement.style.setProperty('--reader-radius', theme.cardRadius + 'px');
    document.title = paper.title + ' | Sijia Zhu';
  }
  window.addEventListener('message', event => {
    if (preview && event.origin === location.origin && event.source === parent && event.data?.type === 'site-config') apply(event.data.settings);
  });
  apply(model.defaults);
  if (preview) parent.postMessage({ type: 'site-preview-ready' }, location.origin);
  else fetch('../../site-config.json', { cache: 'no-store' }).then(r => r.ok ? r.json() : null).then(value => { if (value) apply(value); }).catch(() => {});
})();
