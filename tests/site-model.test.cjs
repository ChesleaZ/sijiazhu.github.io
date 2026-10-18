const { test } = require('node:test');
const assert = require('node:assert/strict');
const model = require('../static/editor/site-model.js');
test('Keeps all existing publications, research entries, and manuscript status unchanged', () => {
  const site = model.normalize(model.defaults);
  assert.deepEqual(site, model.defaults);
  assert.equal(site.publications.items.length, 15);
  assert.equal(site.research.items.length, 4);
  assert.equal(site.paper.status, 'Manuscript under review');
});
test('Editing About does not modify the home page or publication records', () => {
  const site = model.clone(model.defaults);
  model.setPath(site, 'about.paragraphs.0', 'An updated biography.');
  const normalized = model.normalize(site);
  assert.equal(normalized.about.paragraphs[0], 'An updated biography.');
  assert.deepEqual(normalized.home, model.defaults.home);
  assert.deepEqual(normalized.publications, model.defaults.publications);
});
test('Preserves list additions, ordering, deletion, and empty lists', () => {
  const site = model.clone(model.defaults);
  site.publications.items.reverse();
  site.research.items = [];
  site.contact.links.push({ label: 'Website', url: 'https://example.com', icon: 'email' });
  const normalized = model.normalize(site);
  assert.equal(normalized.publications.items[0].title, model.defaults.publications.items.at(-1).title);
  assert.deepEqual(normalized.research.items, []);
  assert.equal(normalized.contact.links.at(-1).url, 'https://example.com');
});
test('Blocks script URLs, prototype paths, and out-of-range styling', () => {
  const site = model.clone(model.defaults);
  site.contact.links[0].url = 'javascript:alert(1)';
  site.paper.preprintURL = 'data:text/html,example';
  site.theme.background = 'url(https://example.com)';
  site.theme.fontSize = 999;
  const normalized = model.normalize(site);
  assert.equal(normalized.contact.links[0].url, model.defaults.contact.links[0].url);
  assert.equal(normalized.paper.preprintURL, '');
  assert.equal(normalized.theme.background, model.defaults.theme.background);
  assert.equal(normalized.theme.fontSize, 24);
  assert.throws(() => model.setPath(site, '__proto__.polluted', true));
  assert.equal({}.polluted, undefined);
});
test('Recovers malformed configuration without losing safe default content', () => {
  assert.deepEqual(model.normalize(null), model.defaults);
  const site = model.normalize({ home: { topics: [] }, publications: { items: [] } });
  assert.deepEqual(site.home.topics, model.defaults.home.topics);
  assert.deepEqual(site.publications.items, []);
});
test('Background controls survive round trips, including disabled and zero intensity', () => {
  const site = model.clone(model.defaults);
  site.home.backgroundEnabled = false;
  site.home.backgroundOpacity = 0;
  site.home.backgroundAnimated = false;
  const normalized = model.normalize(JSON.parse(JSON.stringify(site)));
  assert.equal(normalized.home.backgroundEnabled, false);
  assert.equal(normalized.home.backgroundOpacity, 0);
  assert.equal(normalized.home.backgroundAnimated, false);
  site.home.backgroundOpacity = 900;
  assert.equal(model.normalize(site).home.backgroundOpacity, 40);
});
test('Older site configs gain background defaults without changing existing content', () => {
  const old = model.clone(model.defaults);
  delete old.home.backgroundEnabled;
  delete old.home.backgroundOpacity;
  delete old.home.backgroundAnimated;
  assert.deepEqual(model.normalize(old), model.defaults);
  old.about.title = 'An actual concurrent edit';
  assert.notDeepEqual(model.normalize(old), model.defaults);
});
