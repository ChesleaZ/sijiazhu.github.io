const { test } = require('node:test');
const assert = require('node:assert/strict');
const model = require('../static/editor/site-model.js');

test('Older drafts gain advisors for the matching institution without changing other content', () => {
  const old = model.clone(model.defaults);
  old.home.backgroundOpacity = 36;
  old.paper.status = 'Submitted to Cell';
  for (const group of old.about.backgroundGroups) {
    delete group.advisorLabel;
    delete group.advisors;
  }
  const snapshot = model.clone(old);
  const result = model.normalize(old);
  assert.deepEqual(result.about.backgroundGroups.map(g => g.advisors.map(a => a.name)), [
    ['Prof. Yanxun Xu'], ['Prof. Rong Ma', 'Prof. Allon Klein'],
    ['Prof. Kenneth Westerman', 'Prof. Miriam Udler'],
  ]);
  assert.equal(result.home.backgroundOpacity, 36);
  assert.equal(result.paper.status, 'Submitted to Cell');
  assert.deepEqual(old, snapshot);
});

test('Unknown institutions and explicitly empty advisor lists stay unassigned', () => {
  const old = model.clone(model.defaults);
  old.about.backgroundGroups = [
    { institution: 'Another institution', details: ['Research Assistant'] },
    { ...old.about.backgroundGroups[1], advisors: [] },
  ];
  const result = model.normalize(old);
  assert.deepEqual(result.about.backgroundGroups.map(g => g.advisors), [[], []]);
});

test('All five advisor URLs survive editor export and normalization', () => {
  const result = model.normalize(JSON.parse(JSON.stringify(model.defaults)));
  assert.deepEqual(result.about.backgroundGroups.flatMap(g => g.advisors.map(a => a.url)), [
    'https://www.ams.jhu.edu/~yxu70/',
    'https://sites.google.com/site/rongmastat/home',
    'https://kleinlab.bio/',
    'https://westerman-lab.github.io/',
    'https://www.udlerlab.org/',
  ]);
});
