(function(root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.SciencePositionEditor = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function() {
  'use strict';
  const labels = { network: 'Network', cells: '细胞群', surface: '三维曲面', umap: 'UMAP', objective: '优化目标公式', attention: 'Attention 公式', robot: '机器人', tubes: '试管' };
  const bound = value => Math.round(Math.max(-100, Math.min(100, value)) * 10) / 10;
  function attach(layer) {
    const win = layer.ownerDocument.defaultView;
    if (win.parent === win || new URLSearchParams(win.location.search).get('preview') !== '1') return { destroy() {} };
    let enabled = false, selected = 'network', drag = null;
    const motifs = Array.from(layer.querySelectorAll('[data-artwork]'));
    const post = data => win.parent.postMessage({ ...data, page: layer.dataset.page }, win.location.origin);
    function refresh() {
      layer.dataset.editing = String(enabled);
      layer.setAttribute('aria-hidden', String(!enabled));
      motifs.forEach(node => {
        node.dataset.selected = String(node.dataset.artwork === selected);
        node.dataset.label = labels[node.dataset.artwork];
        node.tabIndex = enabled ? 0 : -1;
        if (enabled) { node.setAttribute('role', 'button'); node.setAttribute('aria-label', '移动' + labels[node.dataset.artwork] + '；可拖动或使用方向键'); }
        else { node.removeAttribute('role'); node.removeAttribute('aria-label'); }
      });
    }
    function choose(node) {
      selected = node.dataset.artwork; refresh();
      post({ type: 'site-artwork-select', id: selected });
    }
    function paint(node, x, y) {
      node.style.setProperty('--science-dx', x + 'vw'); node.style.setProperty('--science-dy', y + 'vh');
      node.dataset.positionX = x; node.dataset.positionY = y;
    }
    function position(node) { return { x: Number(node.dataset.positionX) || 0, y: Number(node.dataset.positionY) || 0 }; }
    function finish() {
      if (!drag) return;
      const ended = drag; drag = null;
      delete ended.node.dataset.dragging;
      if (ended.started) post({ type: 'site-artwork-move', id: ended.node.dataset.artwork, ...position(ended.node), phase: 'end' });
      try { ended.node.releasePointerCapture(ended.pointerId); } catch (ignored) {}
    }
    function mode(event) {
      if (event.origin !== win.location.origin || event.source !== win.parent || event.data?.type !== 'site-artwork-mode') return;
      if (!event.data.enabled) finish();
      enabled = event.data.enabled === true;
      if (Object.hasOwnProperty.call(labels, event.data.selected)) selected = event.data.selected;
      refresh();
    }
    function down(event) {
      const node = event.target.closest('[data-artwork]');
      if (!enabled || !node || !layer.contains(node) || event.button !== 0) return;
      event.preventDefault(); event.stopPropagation(); choose(node); node.focus();
      drag = { node, pointerId: event.pointerId, startX: event.clientX, startY: event.clientY, ...position(node), started: false };
      node.dataset.dragging = 'true'; node.setPointerCapture(event.pointerId);
    }
    function move(event) {
      if (!drag || event.pointerId !== drag.pointerId) return;
      event.preventDefault(); event.stopPropagation();
      const x = bound(drag.x + (event.clientX - drag.startX) / win.innerWidth * 100);
      const y = bound(drag.y + (event.clientY - drag.startY) / win.innerHeight * 100);
      if (!drag.started && Math.abs(event.clientX - drag.startX) + Math.abs(event.clientY - drag.startY) < 2) return;
      if (!drag.started) { drag.started = true; post({ type: 'site-artwork-drag-start', id: drag.node.dataset.artwork }); }
      paint(drag.node, x, y);
      post({ type: 'site-artwork-move', id: drag.node.dataset.artwork, x, y, phase: 'preview' });
    }
    function up(event) { if (drag && event.pointerId === drag.pointerId) { event.preventDefault(); event.stopPropagation(); finish(); } }
    function key(event) {
      const node = event.target.closest('[data-artwork]');
      if (!enabled || !node || !['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(event.key)) return;
      event.preventDefault(); event.stopPropagation(); choose(node);
      const old = position(node), delta = event.shiftKey ? 5 : event.altKey ? .1 : 1;
      const x = bound(old.x + (event.key === 'ArrowRight' ? delta : event.key === 'ArrowLeft' ? -delta : 0));
      const y = bound(old.y + (event.key === 'ArrowDown' ? delta : event.key === 'ArrowUp' ? -delta : 0));
      paint(node, x, y); post({ type: 'site-artwork-move', id: node.dataset.artwork, x, y, phase: 'commit' });
    }
    win.addEventListener('message', mode);
    layer.addEventListener('pointerdown', down); layer.addEventListener('pointermove', move);
    layer.addEventListener('pointerup', up); layer.addEventListener('pointercancel', up);
    layer.addEventListener('lostpointercapture', finish); layer.addEventListener('keydown', key);
    refresh(); post({ type: 'site-artwork-ready' });
    return { destroy() {
      finish(); win.removeEventListener('message', mode);
      layer.removeEventListener('pointerdown', down); layer.removeEventListener('pointermove', move);
      layer.removeEventListener('pointerup', up); layer.removeEventListener('pointercancel', up);
      layer.removeEventListener('lostpointercapture', finish); layer.removeEventListener('keydown', key);
    } };
  }
  return { attach, labels };
});
