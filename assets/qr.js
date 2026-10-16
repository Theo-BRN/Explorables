// Small QR button (top-right) that expands to a scannable code for this page's URL.
// Needs qrcode-generator loaded first; styles itself from the page's --paper/--ink/--muted/--rule tokens.
(() => {
  const url = location.origin + location.pathname;

  const css = `
    .qr-btn {
      position: fixed; top: 0.9rem; right: 0.9rem; z-index: 10;
      display: grid; place-items: center;
      width: 2.4rem; height: 2.4rem; padding: 0;
      color: var(--muted); background: var(--paper);
      border: 1px solid var(--rule); border-radius: 6px; cursor: pointer;
    }
    .qr-btn:hover { color: var(--ink); border-color: var(--muted); }
    .qr-btn:focus-visible { outline: 2px solid var(--r); outline-offset: 2px; }
    .qr-dlg {
      border: 1px solid var(--rule); border-radius: 10px; padding: 1.5rem;
      background: var(--paper); color: var(--ink); text-align: center;
      max-width: calc(100vw - 2rem);
    }
    .qr-dlg::backdrop { background: rgb(0 0 0 / 0.55); }
    /* always dark-on-white so phones can read it off any screen */
    .qr-code {
      background: #fff; border-radius: 6px; padding: 0.75rem;
      width: min(70vmin, 22rem); aspect-ratio: 1; margin: 0 auto;
    }
    .qr-code svg { display: block; width: 100%; height: 100%; }
    .qr-url {
      margin: 1rem 0 0; font-size: 0.95rem; color: var(--muted);
      word-break: break-all;
    }
  `;
  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  // icon: three finder squares and a few modules
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "qr-btn";
  btn.setAttribute("aria-label", "Show QR code for this page");
  btn.innerHTML = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
    <rect x="1.5" y="1.5" width="6" height="6" rx="1"/><rect x="12.5" y="1.5" width="6" height="6" rx="1"/><rect x="1.5" y="12.5" width="6" height="6" rx="1"/>
    <path d="M12.5 12.5h2.5v2.5h-2.5zM16 16h2.5v2.5H16zM16 12.5h2.5M12.5 18.5h1" stroke-linecap="round"/></svg>`;

  const dlg = document.createElement("dialog");
  dlg.className = "qr-dlg";
  dlg.setAttribute("aria-label", "QR code for this page");
  const q = qrcode(0, "M");
  q.addData(url);
  q.make();
  dlg.innerHTML = `<div class="qr-code">${q.createSvgTag({ scalable: true, margin: 0 })}</div><p class="qr-url"></p>`;
  dlg.querySelector(".qr-url").textContent = url.replace(/^https?:\/\//, "");

  btn.addEventListener("click", () => dlg.showModal());
  // click anywhere (including the backdrop) to close; Esc works natively
  dlg.addEventListener("click", () => dlg.close());

  document.body.append(btn, dlg);
})();
