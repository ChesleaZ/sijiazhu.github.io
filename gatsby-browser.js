/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

export const onClientEntry = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(registrations => {
      registrations.forEach(registration => registration.unregister());
    });
  }

  if ('caches' in window) {
    caches.keys().then(keys => {
      if (!keys.length) {
        return;
      }

      Promise.all(keys.map(key => caches.delete(key))).then(() => {
        if (!sessionStorage.getItem('sijia-cache-refresh')) {
          sessionStorage.setItem('sijia-cache-refresh', 'true');
          window.location.reload();
        }
      });
    });
  }
};
