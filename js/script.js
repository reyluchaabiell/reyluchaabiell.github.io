/* r3yshellz blog - vanilla JS, no dependencies.
   Security: DOM text is only ever written via textContent / createTextNode (no innerHTML),
   and there are no inline handlers, so a strict CSP (script-src 'self') works. */
(() => {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1. Writeups: category filter + live search ---------- */
  const initFilter = () => {
    const category = document.getElementById('category-filter');
    const search = document.getElementById('search-input');
    const container = document.getElementById('writeups-container');
    if (!category || !search || !container) return;

    const status = document.getElementById('results-status');
    const empty = document.getElementById('no-results');
    // Read the DOM once; filtering afterwards only toggles `hidden`.
    const items = Array.from(container.querySelectorAll('.writeup-card'), el => ({
      el,
      category: (el.dataset.category || '').toUpperCase(),
      text: el.textContent.toLowerCase().replace(/\s+/g, ' '),
    }));

    const apply = () => {
      const wanted = category.value.toUpperCase();
      const query = search.value.toLowerCase().trim();
      let visible = 0;
      for (const item of items) {
        const show = (wanted === 'ALL' || item.category === wanted) && item.text.includes(query);
        if (item.el.hidden === show) item.el.hidden = !show;   // touch DOM only on change
        if (show) visible++;
      }
      empty.hidden = visible !== 0;
      status.textContent = `${visible} of ${items.length} writeup${items.length === 1 ? '' : 's'} shown`;
    };

    category.addEventListener('change', apply);
    search.addEventListener('input', apply);
    apply();
  };

  /* ---------- 2. Copy buttons: <button data-copy [data-copy-source="id"]> ---------- */
  const initCopy = () => {
    document.addEventListener('click', async (event) => {
      const btn = event.target.closest('[data-copy]');
      if (!btn) return;

      const label = btn.querySelector('.copy-label');
      const source = btn.dataset.copySource && document.getElementById(btn.dataset.copySource);
      const text = source ? source.textContent.trim() : window.location.href;

      let message;
      try {
        await navigator.clipboard.writeText(text);
        message = label.dataset.done || 'Copied!';
      } catch {
        message = 'Copy failed';
      }
      label.dataset.idle ||= label.textContent;
      label.textContent = message;               // aria-live region announces it
      clearTimeout(Number(btn.dataset.timer));
      btn.dataset.timer = setTimeout(() => { label.textContent = label.dataset.idle; }, 2000);
    });
  };

  /* ---------- 3. Terminal typing (profile hero) ----------
     The full text stays in the DOM the whole time (screen readers read it immediately and the
     layout never shifts); we only move a boundary between "typed" and "not yet typed" spans. */
  const typeLine = (el, msPerChar, keepCursor) => new Promise((resolve) => {
    const full = el.textContent.replace(/\s+/g, ' ').trim();
    const typed = document.createElement('span');
    const rest = document.createElement('span');
    const cursor = document.createElement('span');
    rest.className = 'typing-rest';
    cursor.className = 'terminal-cursor';
    cursor.setAttribute('aria-hidden', 'true');
    rest.textContent = full;
    el.textContent = '';
    el.append(typed, cursor, rest);

    let start = null;
    let shown = 0;
    const tick = (now) => {
      start ??= now;
      const n = Math.min(full.length, Math.floor((now - start) / msPerChar));
      if (n !== shown) {
        shown = n;
        typed.textContent = full.slice(0, n);
        rest.textContent = full.slice(n);
      }
      if (n < full.length) return requestAnimationFrame(tick);
      if (!keepCursor) cursor.remove();
      resolve();
    };
    requestAnimationFrame(tick);
  });

  const initTyping = async () => {
    const lines = document.querySelectorAll('.typing-text');
    if (prefersReducedMotion || lines.length === 0) return;
    for (let i = 0; i < lines.length; i++) {
      await typeLine(lines[i], Number(lines[i].dataset.speed) || 45, i === lines.length - 1);
    }
  };

  /* ---------- 4. Keyboard access for scrollable code blocks ---------- */
  const initCodeBlocks = () => {
    document.querySelectorAll('.prose pre').forEach((pre) => {
      if (pre.scrollWidth > pre.clientWidth) pre.tabIndex = 0;
    });
  };

  const init = () => { initFilter(); initCopy(); initTyping(); initCodeBlocks(); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
