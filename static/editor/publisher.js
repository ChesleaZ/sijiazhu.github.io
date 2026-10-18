(function(root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.HomepagePublishing = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function() {
  'use strict';
  const REPO = 'ChesleaZ/sijiazhu.github.io';
  const API = 'https://api.github.com/repos/' + REPO;
  const FILE = '/contents/static/homepage-config.json';
  const ACTIONS = 'https://github.com/' + REPO + '/actions';
  const failure = (code, message) => Object.assign(new Error(message), { code, publishError: true });
  const canonical = value => JSON.stringify(value, Object.keys(value).sort());
  const same = (a, b) => canonical(a) === canonical(b);
  const encode = text => {
    const bytes = new TextEncoder().encode(text);
    let binary = '';
    for (const byte of bytes) binary += String.fromCharCode(byte);
    return btoa(binary);
  };
  const decode = text => {
    const binary = atob(text.replace(/\s/g, ''));
    return new TextDecoder('utf-8', { fatal: true }).decode(Uint8Array.from(binary, c => c.charCodeAt(0)));
  };

  function createPublisher(options = {}) {
    const fetcher = options.fetchImpl || fetch;
    let token = '';
    let busy = false;
    async function request(path, { method = 'GET', body, authenticated = true } = {}) {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 25000);
      const headers = { Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28' };
      if (authenticated && token) headers.Authorization = 'Bearer ' + token;
      if (body) headers['Content-Type'] = 'application/json';
      try {
        const response = await fetcher(API + path, {
          method, headers, body: body ? JSON.stringify(body) : undefined,
          credentials: 'omit', cache: 'no-store', redirect: 'error', signal: controller.signal,
        });
        if (!response.ok) {
          if (response.status === 401) { token = ''; throw failure('AUTH', 'GitHub 令牌无效或已过期，请重新连接。'); }
          if (response.status === 403 || response.status === 429) throw failure('PERMISSION', 'GitHub 拒绝请求：请检查令牌的仓库范围、Contents 写入权限，或 API 请求额度。');
          if (response.status === 409) throw failure('CONFLICT', '网站配置在编辑期间已更新。请先保留草稿并刷新，比较最新版本后再发布。');
          if (response.status === 404) throw failure('NOT_FOUND', '无法访问网站仓库或配置，请检查 GitHub 令牌授权范围。');
          if (response.status === 422) throw failure('VALIDATION', 'GitHub 未接受本次提交，请检查仓库规则及配置后重试。');
          throw failure('HTTP', 'GitHub 请求失败（' + response.status + '）。');
        }
        return await response.json();
      } finally { clearTimeout(timeout); }
    }
    async function readLatest() {
      const file = await request(FILE + '?ref=main');
      if (!file.sha || file.encoding !== 'base64' || typeof file.content !== 'string') throw failure('FORMAT', '无法读取网站配置。');
      return { sha: file.sha, config: JSON.parse(decode(file.content)) };
    }
    async function connect(value) {
      if (busy) throw failure('BUSY', '正在发布，请稍候。');
      if (typeof value !== 'string' || !/^github_pat_[A-Za-z0-9_]+$/.test(value.trim())) throw failure('TOKEN_FORMAT', '请使用 GitHub fine-grained personal access token。');
      token = value.trim();
      try { return await readLatest(); }
      catch (error) { token = ''; throw error; }
    }
    async function publish(config, baseSha) {
      if (!token) throw failure('AUTH', '请先连接 GitHub。');
      if (busy) throw failure('BUSY', '正在发布，请稍候。');
      if (!baseSha) throw failure('NO_BASE', '尚未读取网站版本，请刷新页面后重试。');
      busy = true;
      try {
        const latest = await readLatest();
        if (same(latest.config, config)) return { unchanged: true, fileSha: latest.sha };
        if (latest.sha !== baseSha) throw failure('CONFLICT', '网站配置在编辑期间已更新。请先保留草稿并刷新，比较最新版本后再发布。');
        let result;
        try {
          result = await request(FILE, { method: 'PUT', body: {
            branch: 'main', sha: latest.sha, message: 'Update homepage from Homepage Studio',
            content: encode(JSON.stringify(config, null, 2) + '\n'),
          } });
        } catch (error) {
          if (error.publishError) throw error;
          // A lost response does not mean the write failed. Verify before offering another submit.
          try {
            const check = await readLatest();
            if (same(check.config, config)) return { recovered: true, fileSha: check.sha, commit: null };
          } catch (ignored) { /* Preserve an uncertain outcome without repeating the write. */ }
          throw failure('UNCERTAIN', '连接中断，提交状态尚未确认。请先查看发布记录，不要连续重复提交。');
        }
        if (!result.commit?.sha || !result.content?.sha) throw failure('UNCERTAIN', 'GitHub 提交回执不完整，请查看发布记录后确认。');
        return { commit: result.commit.sha, fileSha: result.content.sha };
      } finally { busy = false; }
    }
    async function buildState(commit) {
      if (!commit) return null;
      const data = await request('/actions/runs?head_sha=' + encodeURIComponent(commit) + '&per_page=10', { authenticated: false });
      const run = data.workflow_runs?.find(item => item.name === 'Deploy Gatsby site to GitHub Pages');
      if (run?.status === 'completed' && run.conclusion !== 'success') throw failure('BUILD', 'GitHub 构建未成功，请打开发布记录检查；配置已提交，无需重复发布。');
      return run ? { status: run.status, conclusion: run.conclusion } : null;
    }
    return {
      connect, readLatest, publish, buildState,
      disconnect() { if (!busy) token = ''; },
      isConnected() { return Boolean(token); },
      isBusy() { return busy; },
      actionsURL: ACTIONS,
    };
  }
  return { createPublisher, same, encode, decode };
});
