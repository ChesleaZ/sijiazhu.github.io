const { test } = require('node:test');
const assert = require('node:assert/strict');
const { createPublisher, encode, same } = require('../static/editor/publisher.js');
const original = { greeting: 'Hello', topics: ['AI for biology'], background: '#0b1220' };
const changed = { ...original, greeting: '你好 · Sijia' };
const fakeToken = 'github_pat_TEST_ONLY_NOT_A_REAL_CREDENTIAL';
const file = (config = original, sha = 'base') => ({ sha, encoding: 'base64', content: encode(JSON.stringify(config)) });
function transport(sequence) {
  const calls = [];
  return {
    calls,
    fetchImpl: async (url, init) => {
      calls.push({ url, init });
      assert.ok(url.startsWith('https://api.github.com/repos/ChesleaZ/sijiazhu.github.io/'));
      const next = sequence.shift();
      assert.ok(next, 'No unexpected extra requests');
      if (next instanceof Error) throw next;
      const [status, body] = next;
      return { ok: status >= 200 && status < 300, status, json: async () => body };
    },
  };
}
test('Publishes Unicode configuration using current SHA, without altering other files', async () => {
  const io = transport([[200, file()], [200, file()], [200, { content: { sha: 'new-file' }, commit: { sha: 'new-commit' } }]]);
  const p = createPublisher(io);
  const base = await p.connect(fakeToken);
  const result = await p.publish(changed, base.sha);
  assert.equal(result.commit, 'new-commit');
  const writes = io.calls.filter(c => c.init.method === 'PUT');
  assert.equal(writes.length, 1);
  assert.equal(writes[0].url, 'https://api.github.com/repos/ChesleaZ/sijiazhu.github.io/contents/static/site-config.json');
  const body = JSON.parse(writes[0].init.body);
  assert.equal(body.branch, 'main');
  assert.equal(body.sha, 'base');
  assert.deepEqual(JSON.parse(Buffer.from(body.content, 'base64').toString('utf8')), changed);
  assert.equal(writes[0].init.headers.Authorization, 'Bearer ' + fakeToken);
  assert.ok(!JSON.stringify(result).includes(fakeToken));
  p.disconnect();
  assert.equal(p.isConnected(), false);
});
test('Stops before writing when another editor changed the configuration', async () => {
  const io = transport([[200, file()], [200, file(original, 'concurrent-sha')]]);
  const p = createPublisher(io); await p.connect(fakeToken);
  await assert.rejects(p.publish(changed, 'base'), e => e.code === 'CONFLICT');
  assert.equal(io.calls.filter(c => c.init.method === 'PUT').length, 0);
});
test('Recovers a lost successful PUT response without issuing a second PUT', async () => {
  const error = Object.assign(new Error('timeout'), { code: 20 });
  const io = transport([[200, file()], [200, file()], error, [200, file(changed, 'new-file')]]);
  const p = createPublisher(io); await p.connect(fakeToken);
  const result = await p.publish(changed, 'base');
  assert.equal(result.recovered, true);
  assert.equal(io.calls.filter(c => c.init.method === 'PUT').length, 1);
});
test('Does not claim failure or automatically resubmit an uncertain write', async () => {
  const io = transport([[200, file()], [200, file()], new Error('lost connection'), [200, file()]]);
  const p = createPublisher(io); await p.connect(fakeToken);
  await assert.rejects(p.publish(changed, 'base'), e => e.code === 'UNCERTAIN');
  assert.equal(io.calls.filter(c => c.init.method === 'PUT').length, 1);
});
test('Handles denied write permission and remains retryable', async () => {
  const io = transport([[200, file()], [200, file()], [403, {}]]);
  const p = createPublisher(io); await p.connect(fakeToken);
  await assert.rejects(p.publish(changed, 'base'), e => e.code === 'PERMISSION');
  assert.equal(p.isBusy(), false);
});
test('Forgets rejected credentials and rejects unauthenticated publishing', async () => {
  const io = transport([[401, {}]]);
  const p = createPublisher(io);
  await assert.rejects(p.connect(fakeToken), e => e.code === 'AUTH');
  assert.equal(p.isConnected(), false);
  await assert.rejects(p.publish(changed, 'base'), e => e.code === 'AUTH');
});
test('Avoids a no-op commit even if object key order differs', async () => {
  const reordered = { background: original.background, topics: original.topics, greeting: original.greeting };
  const io = transport([[200, file()], [200, file()]]);
  const p = createPublisher(io); await p.connect(fakeToken);
  const result = await p.publish(reordered, 'base');
  assert.equal(result.unchanged, true);
  assert.equal(same(original, reordered), true);
  assert.equal(io.calls.filter(c => c.init.method === 'PUT').length, 0);
});
test('Reports build failure without sending the token to polling requests', async () => {
  const io = transport([[200, file()], [200, { workflow_runs: [{ name: 'Deploy Gatsby site to GitHub Pages', status: 'completed', conclusion: 'failure' }] }]]);
  const p = createPublisher(io); await p.connect(fakeToken);
  await assert.rejects(p.buildState('commit-id'), e => e.code === 'BUILD');
  assert.equal(io.calls[1].init.headers.Authorization, undefined);
});

test('Compares nested page fields instead of treating different site configurations as equal', () => {
  assert.equal(same({home:{greeting:'A'},about:{paragraphs:['one']}},{about:{paragraphs:['one']},home:{greeting:'A'}}),true);
  assert.equal(same({home:{greeting:'A'}},{home:{greeting:'B'}}),false);
  assert.equal(same({publications:{items:[{title:'A',url:'https://example.com'}]}},{publications:{items:[{title:'B',url:'https://example.com'}]}}),false);
});
