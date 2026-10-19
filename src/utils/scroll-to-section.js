// Keep same-page navigation within the document, including under a Gatsby path prefix.
export default function scrollToSection(event) {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  const link = event.currentTarget;
  if (link.origin !== window.location.origin || link.pathname !== window.location.pathname || !link.hash) return;
  const target = document.getElementById(link.hash.slice(1));
  if (!target) return;
  event.preventDefault();
  if (window.location.hash !== link.hash) window.history.pushState(null, '', link.hash);
  target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
}
