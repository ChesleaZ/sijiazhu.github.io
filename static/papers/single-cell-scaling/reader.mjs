const toolbar = document.querySelector('.pdf-toolbar');
const pagesElement = document.getElementById('pdf-pages');
const message = document.getElementById('pdf-message');
const pageNumber = document.getElementById('pdf-page-number');
const previous = document.getElementById('pdf-previous');
const next = document.getElementById('pdf-next');
const zoomOut = document.getElementById('pdf-zoom-out');
const zoomIn = document.getElementById('pdf-zoom-in');
const zoomReset = document.getElementById('pdf-zoom-reset');
const zoomLevels = [1, 1.25, 1.5, 2, 2.5];

async function startReader() {
  const { getDocument, GlobalWorkerOptions, TextLayer } = await import('./pdfjs/pdf.min.mjs');
  GlobalWorkerOptions.workerSrc = new URL('./pdfjs/pdf.worker.min.mjs', import.meta.url).href;
  const pdf = await getDocument({
    url: new URL('./preprint.pdf', import.meta.url).href,
    isEvalSupported: false,
  }).promise;
  const firstPage = await pdf.getPage(1);
  const { width, height } = firstPage.getViewport({ scale: 1 });
  pagesElement.style.setProperty('--pdf-page-ratio', `${width} / ${height}`);

  const sheets = Array.from({ length: pdf.numPages }, (_, index) => {
    const sheet = document.createElement('div');
    const page = document.createElement('div');
    sheet.className = 'pdf-sheet';
    sheet.setAttribute('role', 'group');
    sheet.setAttribute('aria-label', `Page ${index + 1} of ${pdf.numPages}`);
    page.className = 'pdf-page';
    sheet.append(page);
    return { sheet, page, number: index + 1, rendering: null };
  });
  document.getElementById('pdf-page-count').textContent = pdf.numPages;
  pagesElement.append(...sheets.map(({ sheet }) => sheet));
  toolbar.hidden = false;
  message.hidden = true;

  let current = 1;
  let zoomIndex = 0;
  let pageWidth = 0;
  let frame = 0;
  let zoomFrame = 0;

  function updateControls() {
    if (document.activeElement !== pageNumber) pageNumber.value = current;
    previous.disabled = current === 1;
    next.disabled = current === pdf.numPages;
    zoomOut.disabled = zoomIndex === 0;
    zoomIn.disabled = zoomIndex === zoomLevels.length - 1;
    zoomReset.textContent = `${Math.round(zoomLevels[zoomIndex] * 100)}%`;
  }

  function clearPage(record) {
    record.rendering?.canvasTask?.cancel();
    record.rendering?.textLayer?.cancel();
    record.rendering = null;
    record.page.replaceChildren();
  }

  async function renderPage(record) {
    clearPage(record);
    const render = { width: pageWidth };
    record.rendering = render;
    const canvas = document.createElement('canvas');
    canvas.setAttribute('aria-hidden', 'true');
    try {
      const pdfPage = await pdf.getPage(record.number);
      if (record.rendering !== render) return;
      const base = pdfPage.getViewport({ scale: 1 });
      const viewport = pdfPage.getViewport({ scale: render.width / base.width });
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2, 2400 / viewport.width);
      canvas.width = Math.round(viewport.width * pixelRatio);
      canvas.height = Math.round(viewport.height * pixelRatio);
      const text = document.createElement('div');
      text.className = 'textLayer';
      text.style.setProperty('--total-scale-factor', viewport.scale);
      render.canvasTask = pdfPage.render({
        canvas,
        viewport,
        transform: [pixelRatio, 0, 0, pixelRatio, 0, 0],
      });
      await render.canvasTask.promise;
      if (record.rendering !== render) return;
      record.page.append(canvas, text);
      render.textLayer = new TextLayer({
        textContentSource: pdfPage.streamTextContent(),
        container: text,
        viewport,
      });
      await render.textLayer.render();
    } catch (error) {
      if (record.rendering !== render) return;
      if (record.page.contains(canvas)) return;
      const notice = document.createElement('p');
      notice.className = 'pdf-page-error';
      notice.textContent = `Page ${record.number} could not be displayed.`;
      record.page.replaceChildren(notice);
      console.error(error);
    }
  }

  function updateVisiblePages() {
    frame = 0;
    const readingLine = Math.max(0, toolbar.getBoundingClientRect().bottom) + 22;
    current = 1;
    for (const record of sheets) {
      const { top, bottom } = record.sheet.getBoundingClientRect();
      if (top <= readingLine) current = record.number;
      const preloadMargin = 560;
      if (bottom >= -preloadMargin && top <= window.innerHeight + preloadMargin) {
        if (record.rendering?.width !== pageWidth) void renderPage(record);
      } else if (record.rendering) {
        clearPage(record);
      }
    }
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
      current = pdf.numPages;
    }
    updateControls();
  }

  function scheduleUpdate() {
    if (!frame) frame = requestAnimationFrame(updateVisiblePages);
  }

  function resizePages() {
    pageWidth = Math.max(1, Math.floor(pagesElement.clientWidth * zoomLevels[zoomIndex]));
    const scrollbarSpace = zoomIndex === 0 ? 0 : 20;
    pagesElement.style.setProperty('--pdf-page-width', `${pageWidth}px`);
    pagesElement.style.setProperty('--pdf-sheet-height', `${pageWidth * height / width + scrollbarSpace}px`);
    scheduleUpdate();
  }

  function goToPage(number) {
    cancelAnimationFrame(zoomFrame);
    current = Math.min(pdf.numPages, Math.max(1, number));
    pageNumber.value = current;
    sheets[current - 1].sheet.scrollIntoView({ block: 'start', inline: 'nearest' });
    updateControls();
    scheduleUpdate();
  }

  function changeZoom(index) {
    if (index === zoomIndex) return;
    cancelAnimationFrame(zoomFrame);
    const active = sheets[current - 1].page;
    const oldBox = active.getBoundingClientRect();
    const readingLine = toolbar.getBoundingClientRect().bottom + 22;
    const offset = Math.max(0, readingLine - oldBox.top);
    const atEnd = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
    const anchor = atEnd ? readingLine - 8 : oldBox.top + offset;
    zoomIndex = index;
    resizePages();
    const restorePosition = () => {
      const newBox = active.getBoundingClientRect();
      window.scrollTo(0, window.scrollY + newBox.top + (offset / oldBox.height) * newBox.height - anchor);
    };
    restorePosition();
    zoomFrame = requestAnimationFrame(restorePosition);
    updateControls();
  }

  previous.addEventListener('click', () => goToPage(current - 1));
  next.addEventListener('click', () => goToPage(current + 1));
  pageNumber.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
      const value = pageNumber.value.trim();
      if (/^\d+$/.test(value)) goToPage(Number(value));
      else pageNumber.value = current;
      pageNumber.blur();
    }
  });
  pageNumber.addEventListener('blur', () => { pageNumber.value = current; });
  zoomOut.addEventListener('click', () => changeZoom(zoomIndex - 1));
  zoomIn.addEventListener('click', () => changeZoom(zoomIndex + 1));
  zoomReset.addEventListener('click', () => changeZoom(0));
  window.addEventListener('scroll', scheduleUpdate, { passive: true });
  new ResizeObserver(resizePages).observe(pagesElement, { box: 'border-box' });
  resizePages();
}

startReader().catch(error => {
  message.textContent = 'The preprint could not load. Refresh the page to try again.';
  message.hidden = false;
  console.error(error);
});
