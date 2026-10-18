'use strict';
const model = window.SiteContentModel;
const publisher = window.HomepagePublishing.createPublisher();
const el = id => document.getElementById(id);
const frame = el('preview');
const rootURL = new URL('../', location.href);
const key = 'sijia-site-draft-v2';
const pages = { home: ['', '首页'], about: ['about/', 'About'], research: ['research/', 'Experience'], publications: ['publications/', '精选论文'], archive: ['archive/', '完整论文列表'], contact: ['contact/', 'Contact'], paper: ['papers/single-cell-scaling/', '论文介绍'] };
const labels = { greeting: '问候语', name: '姓名', prefix: '研究引导语', topics: '轮播主题 · 每行一项', photoSide: '照片位置', photoWidth: '照片宽度', titleSize: '姓名字号', topicSize: '轮播字号', title: '标题', paragraphs: '正文段落 · 空行分段', skillsLabel: '技能列表引导语', skills: '技能与主题 · 每行一项', width: '页面内容宽度', photoVisible: '显示照片', heading: '研究部分标题', academicHeading: '学术服务部分标题', items: '条目', academicItems: '教学与学术服务', institution: '机构', role: '角色', topic: '研究课题', tags: '标签 · 每行一项', bullets: '研究内容 · 每行一项', details: '内容 · 每行一项', archiveLabel: '完整列表按钮', archiveTitle: '完整列表标题', archiveDescription: '完整列表简介', columns: '桌面论文列数', year: '年份', authors: '作者', venue: '期刊 / 会议 / 稿件状态', status: '论文状态', keywords: '关键词 · 每行一项', url: '链接', selected: '显示在精选论文中（最多前六篇）', intro: '简介', links: '联系链接', label: '显示名称', icon: '图标', eyebrow: '页面上方标签', overviewTitle: '研究概述标题', availabilityTitle: '稿件可用性标题', availabilityText: '稿件可用性说明', preprintLabel: '预印本链接文字', preprintURL: '预印本链接 · 未上线可留空', background: '背景颜色', text: '标题文字', muted: '正文文字', accent: '强调色', surface: '卡片背景', fontSize: '正文字号', cardRadius: '卡片圆角' };
const ranges = { width: [520, 1200, 20], photoWidth: [240, 400, 10], titleSize: [46, 80, 1], topicSize: [26, 46, 1], columns: [1, 3, 1], fontSize: [16, 24, 1], cardRadius: [0, 24, 1] };
let config = model.clone(model.defaults), published = model.clone(model.defaults), baseSha = null;
let page = new URLSearchParams(location.search).get('page') || 'home';
if (!pages[page] && page !== 'theme') page = 'home';
let previewPage = page === 'theme' ? 'home' : page;
let ready = false, dirty = false, mobile = false, version = 0, publishing = false;
let watchTimer, watchId = 0, lastPublish;
const undoHistory = [];
function status(text) { el('status').textContent = text; }
function datasetPage() { return page === 'archive' ? 'publications' : page; }
function send() { if (ready) frame.contentWindow.postMessage({ type: 'site-config', settings: model.normalize(config) }, location.origin); }
function checkpoint() { undoHistory.push(model.clone(config)); if (undoHistory.length > 30) undoHistory.shift(); }
function changed() { dirty = true; version++; status('有未保存的全站修改'); send(); }
function update(path, value) { checkpoint(); model.setPath(config, path, value); changed(); }
function showPublish(text, state = 'pending') { el('publish-panel').hidden = false; el('publish-panel').dataset.state = state; el('publish-message').textContent = text; }
function setPublishing(value) { publishing = value; el('publish').disabled = value; el('connect').disabled = value; el('publish').textContent = value ? '正在发布…' : '发布全站修改'; }
function syncConnection() { el('connect').textContent = publisher.isConnected() ? '断开 GitHub' : '连接 GitHub'; }
function blank(template) {
  if (Array.isArray(template)) return [];
  if (template && typeof template === 'object') return Object.fromEntries(Object.entries(template).map(([k, v]) => [k, k === 'year' ? new Date().getFullYear() : k === 'icon' ? 'email' : blank(v)]));
  if (typeof template === 'boolean') return false;
  if (typeof template === 'number') return template;
  return '';
}
function createField(path, template) {
  const value = model.getPath(config, path), fieldKey = path.split('.').pop();
  const box = document.createElement('div'); box.className = 'field';
  if (Array.isArray(template) && template[0] && typeof template[0] === 'object') {
    box.className = 'list-editor';
    const heading = document.createElement('div'); heading.className = 'list-heading';
    const title = document.createElement('h3'); title.textContent = path === 'research.items' ? '研究经历' : path === 'publications.items' ? '论文列表（顺序即展示顺序）' : labels[fieldKey] || fieldKey;
    const add = document.createElement('button'); add.type = 'button'; add.textContent = '+ 添加'; add.setAttribute('aria-label', '添加 ' + title.textContent);
    add.onclick = () => { checkpoint(); model.getPath(config, path).push(blank(template[0])); changed(); renderControls(); };
    heading.append(title, add); box.appendChild(heading);
    value.forEach((item, index) => {
      const details = document.createElement('details'); details.className = 'item-editor'; details.dataset.itemPath = path + '.' + index;
      const summary = document.createElement('summary'); summary.textContent = (index + 1) + '. ' + (item.topic || item.title || item.label || item.institution || '新条目');
      const actions = document.createElement('div'); actions.className = 'item-actions';
      [['↑ 上移', -1], ['↓ 下移', 1], ['删除', 0]].forEach(([label, direction]) => {
        const button = document.createElement('button'); button.type = 'button'; button.textContent = label; button.setAttribute('aria-label', label + '第 ' + (index + 1) + ' 条');
        button.disabled = direction === -1 && index === 0 || direction === 1 && index === value.length - 1;
        button.onclick = () => { checkpoint(); const list = model.getPath(config, path); if (!direction) list.splice(index, 1); else [list[index], list[index + direction]] = [list[index + direction], list[index]]; changed(); renderControls(); };
        actions.appendChild(button);
      });
      const fields = document.createElement('div'); fields.className = 'item-fields';
      Object.keys(template[0]).forEach(k => fields.appendChild(createField(path + '.' + index + '.' + k, template[0][k])));
      details.append(summary, actions, fields); box.appendChild(details);
    });
    return box;
  }
  const label = document.createElement('label'); const id = 'field-' + path.replaceAll('.', '-'); label.htmlFor = id; label.textContent = labels[fieldKey] || fieldKey;
  let input;
  if (Array.isArray(template)) {
    input = document.createElement('textarea'); input.value = value.join(fieldKey === 'paragraphs' ? '\n\n' : '\n');
    input.oninput = () => update(path, input.value.split(fieldKey === 'paragraphs' ? /\n\s*\n/ : /\n/).map(x => x.trim()).filter(Boolean));
  } else if (typeof template === 'boolean') {
    input = document.createElement('input'); input.type = 'checkbox'; input.checked = value; input.onchange = () => update(path, input.checked);
  } else if (typeof template === 'number') {
    input = document.createElement('input'); input.type = fieldKey === 'year' ? 'number' : 'range';
    const range = ranges[fieldKey] || [1900, 2200, 1]; [input.min, input.max, input.step] = range;
    input.value = value; const output = document.createElement('output'); output.textContent = String(value) + (['columns', 'year'].includes(fieldKey) ? '' : 'px');
    input.oninput = () => { if (input.value === '') return; const number = Number(input.value); if (!Number.isFinite(number)) return; output.textContent = String(number) + (['columns', 'year'].includes(fieldKey) ? '' : 'px'); update(path, number); }; label.appendChild(output);
  } else if (fieldKey === 'photoSide' || fieldKey === 'icon') {
    input = document.createElement('select'); input.className = 'field-input';
    const options = fieldKey === 'photoSide' ? [['left', '左侧'], ['right', '右侧']] : [['email', 'Email'], ['linkedin', 'LinkedIn'], ['scholar', 'Google Scholar']];
    options.forEach(([v, name]) => { const option = document.createElement('option'); option.value = v; option.textContent = name; input.appendChild(option); }); input.value = value; input.onchange = () => update(path, input.value);
  } else if (path.startsWith('theme.') && typeof template === 'string') {
    input = document.createElement('input'); input.type = 'color'; input.value = value; const output = document.createElement('output'); output.textContent = value; label.appendChild(output); input.oninput = () => { output.textContent = input.value; update(path, input.value); };
  } else {
    input = document.createElement(template.length > 120 || ['intro', 'availabilityText', 'authors'].includes(fieldKey) ? 'textarea' : 'input');
    if (input.tagName === 'INPUT') input.type = 'text'; input.value = value; input.maxLength = 12000; input.oninput = () => update(path, input.value);
  }
  input.id = id; input.dataset.path = path; input.spellcheck = false;
  box.append(label, input); return box;
}
function renderControls() {
  const open = new Set(Array.from(el('controls').querySelectorAll('details[open]')).map(node => node.dataset.itemPath));
  const scrollTop = el('controls').parentElement.scrollTop;
  el('controls').replaceChildren();
  const dataPage = datasetPage(), template = model.defaults[dataPage];
  Object.keys(template).forEach(field => el('controls').appendChild(createField(dataPage + '.' + field, template[field])));
  el('controls').querySelectorAll('details').forEach(node => { node.open = open.has(node.dataset.itemPath); });
  el('controls').parentElement.scrollTop = scrollTop;
  el('page').value = page;
  el('page-note').textContent = page === 'theme' ? '这些设置同时作用于所有页面。右侧保留当前页面预览。' : page === 'archive' || page === 'publications' ? '精选论文和完整列表共用数据；勾选精选后，前六篇显示为卡片。可展开条目修改链接、作者和状态。' : '可点击预览中的文字直接编辑，也可在下方修改内容。保存草稿包含所有页面。';
}
function navigate(next) {
  if (!pages[next] && next !== 'theme') return;
  page = next; renderControls();
  const url = new URL(location.href); url.searchParams.set('page', page); window.history.replaceState(null, '', url);
  if (page !== 'theme') {
    previewPage = page; ready = false;
    const target = new URL(pages[page][0], rootURL); target.searchParams.set('preview', '1'); frame.src = target.href;
  }
  el('preview-name').textContent = '实时预览 · ' + pages[previewPage][1];
  el('open-page').href = new URL(pages[previewPage][0], rootURL).href;
}
el('page').onchange = () => navigate(el('page').value);
function saveDraft() { localStorage.setItem(key, JSON.stringify({ config: model.normalize(config), baseSha })); dirty = false; }
el('save').onclick = () => { try { saveDraft(); status('全站草稿已保存到本浏览器'); } catch (error) { status('无法保存，请导出配置备份'); } };
el('undo').onclick = () => { if (!undoHistory.length) { status('没有可撤销的修改'); return; } config = undoHistory.pop(); changed(); renderControls(); };
el('reset-page').onclick = () => { checkpoint(); config[datasetPage()] = model.clone(published[datasetPage()]); changed(); renderControls(); };
el('reset-all').onclick = async () => { try { const latest = await publisher.readLatest(); checkpoint(); config = model.normalize(latest.config); published = model.clone(config); baseSha = latest.sha; changed(); renderControls(); status('已读取全部官网内容 · 可撤销'); } catch (error) { status('读取失败，当前草稿已保留'); } };
el('export').onclick = () => { const blob = new Blob([JSON.stringify(model.normalize(config), null, 2) + '\n'], { type: 'application/json' }), url = URL.createObjectURL(blob), a = document.createElement('a'); a.href = url; a.download = 'site-config.json'; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000); status('已导出全站配置备份'); };
el('import').onclick = () => el('file').click();
el('file').onchange = async () => { const file = el('file').files[0]; if (!file) return; try { if (file.size > 2000000) throw Error(); const data = JSON.parse(await file.text()); if (!data || typeof data !== 'object' || Array.isArray(data)) throw Error(); checkpoint(); if (data.home && data.theme) config = model.normalize(data); else { config.home = { ...config.home, ...data }; config = model.normalize(config); } changed(); renderControls(); status('已导入配置 · 尚未保存'); } catch (error) { status('无法导入，请选择有效的配置 JSON'); } el('file').value = ''; };
function resizePreview() { const wrap = el('stage').parentElement, width = mobile ? 390 : 1280, available = Math.max(200, wrap.clientWidth - 32), scale = Math.min(1, available / width), height = Math.max(500, (wrap.clientHeight - 16) / scale); frame.style.width = width + 'px'; frame.style.height = height + 'px'; frame.style.transform = 'scale(' + scale + ')'; el('stage').style.width = width * scale + 'px'; el('stage').style.height = height * scale + 'px'; }
new ResizeObserver(resizePreview).observe(el('stage').parentElement);
el('viewport').onclick = () => { mobile = !mobile; el('viewport').textContent = mobile ? '切换桌面预览' : '切换手机预览'; resizePreview(); };
window.addEventListener('message', event => {
  if (event.origin !== location.origin || event.source !== frame.contentWindow) return;
  if (event.data?.type === 'site-preview-ready') { ready = true; send(); }
  else if (event.data?.type === 'site-navigate') navigate(event.data.page);
  else if (event.data?.type === 'site-text-edit' && typeof event.data.value === 'string' && typeof event.data.path === 'string' && typeof model.getPath(config, event.data.path) === 'string') {
    try { update(event.data.path, event.data.value); renderControls(); } catch (error) { status('此字段不能直接编辑'); }
  }
});
window.addEventListener('beforeunload', event => { if (dirty || publishing) { event.preventDefault(); event.returnValue = ''; } });
el('connect').onclick = () => { if (publisher.isConnected()) { publisher.disconnect(); syncConnection(); status('已断开 GitHub'); return; } el('github-error').textContent = ''; el('github-dialog').showModal(); el('github-token').focus(); };
el('close-github').onclick = () => el('github-dialog').close();
el('github-dialog').addEventListener('close', () => { el('github-token').value = ''; });
el('github-form').onsubmit = async event => {
  event.preventDefault(); let value = el('github-token').value; el('github-token').value = ''; el('confirm-github').disabled = true; el('github-error').textContent = '正在连接…';
  try { const latest = await publisher.connect(value); if (!baseSha && window.HomepagePublishing.same(model.normalize(latest.config), published)) baseSha = latest.sha; syncConnection(); el('github-dialog').close(); status('GitHub 已连接 · 可发布全站修改'); }
  catch (error) { el('github-error').textContent = error.publishError ? error.message : '连接失败，请检查网络后重试。'; syncConnection(); }
  finally { value = ''; el('confirm-github').disabled = false; }
};
async function watchPublication(record) {
  const current = ++watchId; clearTimeout(watchTimer); el('check-publish').hidden = true; let attempts = 0;
  async function tick() {
    if (current !== watchId) return; attempts++;
    try { const response = await fetch('../site-config.json?published=' + encodeURIComponent(record.commit || record.fileSha) + '&t=' + Date.now(), { cache: 'no-store' }); if (response.ok && window.HomepagePublishing.same(model.normalize(await response.json()), record.config)) { showPublish('官网已更新。所有页面已使用本次发布的配置。', 'success'); status('官网已更新'); setPublishing(false); return; } } catch (ignored) {}
    if (current !== watchId) return;
    if (attempts % 2 === 1) { try { const build = await publisher.buildState(record.commit); showPublish(build?.conclusion === 'success' ? '网站构建已完成，正在等待 GitHub Pages 更新…' : '全站配置已提交，GitHub 正在构建和发布…'); } catch (error) { if (error.code === 'BUILD') { showPublish(error.message, 'error'); setPublishing(false); return; } } }
    if (current !== watchId) return;
    if (attempts >= 24) { showPublish('全站配置已提交，但暂未确认官网更新。可查看发布记录，稍后继续检查。'); el('check-publish').hidden = false; setPublishing(false); return; }
    watchTimer = setTimeout(tick, 20000);
  }
  await tick();
}
el('check-publish').onclick = () => { if (lastPublish) { setPublishing(true); watchPublication(lastPublish); } };
el('publish').onclick = async () => {
  if (!publisher.isConnected()) { el('connect').click(); return; }
  const snapshot = model.normalize(config), startVersion = version;
  setPublishing(true); showPublish('正在提交全部页面与外观设置…');
  try { const result = await publisher.publish(snapshot, baseSha); baseSha = result.fileSha; published = snapshot; if (version === startVersion) { try { saveDraft(); } catch (ignored) { dirty = false; } } lastPublish = { ...result, config: snapshot }; await watchPublication(lastPublish); }
  catch (error) { showPublish(error.publishError ? error.message : '网络连接失败，请稍后重试。', 'error'); status('发布未完成'); setPublishing(false); syncConnection(); }
};
(async function init() {
  let latestSha = null;
  try { const latest = await publisher.readLatest(); latestSha = latest.sha; published = model.normalize(latest.config); }
  catch (error) { try { const response = await fetch('../site-config.json', { cache: 'no-store' }); if (response.ok) published = model.normalize(await response.json()); } catch (ignored) {} }
  config = model.clone(published); baseSha = latestSha;
  try {
    const saved = localStorage.getItem(key), legacy = localStorage.getItem('sijia-homepage-draft-v1');
    if (saved) {
      const draft = JSON.parse(saved); config = model.normalize(draft.config || draft);
      if (draft.baseSha && latestSha && draft.baseSha !== latestSha) { baseSha = draft.baseSha; showPublish('网站配置已有更新，已保留你的旧草稿。请先比较或导出备份，再读取官网内容；未确认前不会覆盖新版。', 'error'); }
      status('已载入本浏览器全站草稿');
    } else if (legacy) {
      const home = JSON.parse(legacy); config.home = { ...config.home, ...home }; ['background', 'text', 'accent'].forEach(k => { if (home[k]) config.theme[k] = home[k]; }); config = model.normalize(config); status('已迁移原有首页草稿');
    } else status('已载入正式网站配置');
  } catch (error) { status('已载入正式网站配置'); }
  renderControls(); el('controls').disabled = false;
  if (page === 'theme') { const target = new URL(pages.home[0], rootURL); target.searchParams.set('preview', '1'); frame.src = target.href; }
  navigate(page);
})();
