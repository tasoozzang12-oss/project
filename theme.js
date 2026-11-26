(() => {
  const storageKey = 'paste-fnb-theme';
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
  const root = document.documentElement;
  let preference = null;
  let button;

  try {
    const savedTheme = localStorage.getItem(storageKey);
    if (savedTheme === 'light' || savedTheme === 'dark') preference = savedTheme;
  } catch {
    // The control still works for this page when storage is unavailable.
  }

  function applyTheme() {
    const dark = preference ? preference === 'dark' : systemTheme.matches;
    root.dataset.theme = dark ? 'dark' : 'light';
    button?.setAttribute('aria-pressed', String(dark));
  }

  applyTheme();
  systemTheme.addEventListener('change', applyTheme);

  document.addEventListener('DOMContentLoaded', () => {
    button = document.querySelector('[data-theme-toggle]');
    if (!button) return;

    applyTheme();
    button.hidden = false;
    button.addEventListener('click', () => {
      preference = root.dataset.theme === 'dark' ? 'light' : 'dark';
      applyTheme();
      try {
        localStorage.setItem(storageKey, preference);
      } catch {
        // Keep the current page's theme even if it cannot be saved.
      }
    });
  });
})();
