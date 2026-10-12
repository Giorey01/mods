// Renders the pages from data/mods.js. No build step, no dependencies.
(function () {
  "use strict";

  var MODS = window.MODS || [];
  var SITE = window.SITE || {};

  // ---------- helpers ----------

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function $(sel) { return document.querySelector(sel); }
  function img(mod, file) { return "assets/mods/" + mod.id + "/" + file; }
  function page(mod) { return "mod.html?m=" + encodeURIComponent(mod.id); }
  function repoUrl(mod) { return "https://github.com/" + mod.repo; }
  function pad2(n) { return (n < 10 ? "0" : "") + n; }
  function letter(i) { return String.fromCharCode(65 + (i % 26)); }
  // Titles keep their hyphenated words on one line ("Co-op" must not break after "Co-").
  function title(s) { return esc(s).replace(/-/g, "\u2011"); }

  var STATUS = { released: "Released", early: "Early version", wip: "In progress", archived: "Archived" };

  var ICON = {
    mark: '<svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M4 4h24v8H12v8h8v-4h8v12H4z" fill="currentColor"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>',
    out: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>',
    down: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4v12M6 11l6 6 6-6M5 20h14"/></svg>',
    pad: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 8h10a5 5 0 0 1 5 5v1a4 4 0 0 1-7.2 2.4L14 15h-4l-.8 1.4A4 4 0 0 1 2 14v-1a5 5 0 0 1 5-5z"/><path d="M7 11v3M5.5 12.5h3M16 11.5h.01M18 13.5h.01"/></svg>',
    code: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16"/></svg>',
    box: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8l9-5 9 5v8l-9 5-9-5z"/><path d="M3 8l9 5 9-5M12 13v8"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12.5 9.5 18 20 6.5"/></svg>',
    github: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85V21c0 .27.18.58.69.48A10 10 0 0 0 12 2z"/></svg>',
    moon: '<svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/></svg>',
    sun: '<svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
  };

  // ---------- chrome shared by every page ----------

  function renderNav(current) {
    function link(href, text, key) {
      return '<a href="' + href + '"' + (current === key ? ' aria-current="page"' : "") + ">" + text + "</a>";
    }
    $("#nav").innerHTML =
      '<a class="nav__brand" href="index.html" aria-label="' + esc(SITE.author) + ' mods, home">' + ICON.mark + "<span>MODS</span></a>" +
      '<nav class="nav__links" aria-label="Main">' +
      link("index.html", "Home", "home") +
      link("index.html#catalogue", "Catalogue", "catalogue") +
      link("index.html#approach", "Approach", "approach") +
      link("index.html#contact", "Contact", "contact") +
      "</nav>" +
      '<div class="nav__right">' +
      '<button class="nav__icon" id="theme" type="button" aria-label="Switch between light and dark">' + ICON.moon + ICON.sun + "</button>" +
      '<a class="nav__cta" href="' + esc(SITE.github) + '" rel="noopener">' + ICON.github.replace("<svg", '<svg width="15" height="15"') + "<span>GitHub</span></a>" +
      "</div>";

    $("#theme").addEventListener("click", function () {
      var root = document.documentElement;
      var dark = root.dataset.theme
        ? root.dataset.theme === "dark"
        : window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.dataset.theme = dark ? "light" : "dark";
      try { localStorage.setItem("theme", root.dataset.theme); } catch (e) { /* private window */ }
    });
  }

  function renderFooter() {
    var mods = MODS.map(function (m) { return '<li><a href="' + page(m) + '">' + esc(m.title) + "</a></li>"; }).join("");
    var games = MODS.map(function (m) { return '<li><a href="' + esc(m.gameUrl) + '" rel="noopener">' + esc(m.game) + "</a></li>"; }).join("");
    $("#footer").innerHTML =
      '<div class="band"><div class="band__inner"><div class="frame frame--ticks"><div class="foot">' +
      '<div class="foot__brand">' + ICON.mark +
      "<p>Mods for the games I play, built in the open and free to use.</p>" +
      '<a class="mono more" href="' + esc(SITE.github) + '" rel="noopener">@' + esc(SITE.author) + " on GitHub " + ICON.out + "</a></div>" +
      '<div><h4 class="mono">Mods</h4><ul>' + mods + "</ul></div>" +
      '<div><h4 class="mono">Games</h4><ul>' + games + "</ul></div>" +
      '<div><h4 class="mono">Elsewhere</h4><ul>' +
      '<li><a href="' + esc(SITE.github) + '" rel="noopener">GitHub profile</a></li>' +
      '<li><a href="https://github.com/' + esc(SITE.repo) + '" rel="noopener">This site\'s source</a></li>' +
      '<li><a href="index.html#contact">Contact</a></li>' +
      "</ul></div>" +
      "</div></div></div></div>" +
      '<div class="band__inner"><div class="frame"><div class="legal mono">' +
      "<span>&copy; " + new Date().getFullYear() + " " + esc(SITE.author) + "</span>" +
      "<span>Unofficial fan projects. Games belong to their makers.</span>" +
      "</div></div></div>";
  }

  // ---------- home ----------

  function card(mod, i) {
    return (
      '<a class="cell" href="' + page(mod) + '">' +
      '<div class="cell__top"><span class="cell__icon">' + ICON.pad + '</span><span class="cell__index mono">' + letter(i) + "</span></div>" +
      '<div class="cell__cover"><img src="' + img(mod, mod.cover) + '" alt="' + esc(mod.title) + ' in game" decoding="async"></div>' +
      '<div class="cell__game mono">' + esc(mod.game) + "</div>" +
      "<h3>" + title(mod.title) + "</h3>" +
      "<p>" + esc(mod.tagline) + "</p>" +
      '<div class="tags">' + mod.tags.map(function (t) { return '<span class="tag">' + esc(t) + "</span>"; }).join("") + "</div>" +
      '<div class="cell__foot">' +
      '<span class="mono status status--' + esc(mod.status) + '">' + esc(STATUS[mod.status] || mod.status) + ' &middot; <span data-version="' + esc(mod.id) + '">v' + esc(mod.version) + "</span></span>" +
      '<span class="mono more">View mod ' + ICON.arrow + "</span>" +
      "</div></a>"
    );
  }

  function renderHome() {
    renderNav("home");

    var games = {};
    var platforms = {};
    MODS.forEach(function (m) {
      games[m.game] = 1;
      m.platforms.forEach(function (p) { platforms[p] = 1; });
    });
    $("#figures").innerHTML =
      '<div class="figure"><strong>' + pad2(MODS.length) + '</strong><span class="mono">Mods</span></div>' +
      '<div class="figure"><strong>' + pad2(Object.keys(games).length) + '</strong><span class="mono">Games</span></div>' +
      '<div class="figure"><strong>' + pad2(Object.keys(platforms).length) + '</strong><span class="mono">Platforms</span></div>' +
      '<div class="figure"><strong>100%</strong><span class="mono">Open source</span></div>';

    // Fill the last row so the ruled grid stays whole; the first spare cell says more is coming.
    var cells = MODS.map(card);
    var spare = (3 - (cells.length % 3)) % 3;
    for (var i = 0; i < spare; i++) {
      cells.push(
        '<div class="cell cell--empty' + (i === 1 ? " cell--pad3" : "") + '">' +
        (i === 0
          ? '<div class="mono" style="margin-bottom:10px">' + letter(MODS.length) + '</div><h3>Next one is on the bench.</h3><p>New mods land here when they are ready to install.</p>'
          : "") +
        "</div>"
      );
    }
    $("#grid").innerHTML = cells.join("");
    $("#count").textContent = MODS.length + (MODS.length === 1 ? " mod" : " mods");

    renderFooter();
    liveVersions();
  }

  // ---------- one mod ----------

  function renderMod() {
    renderNav("catalogue");
    var id = new URLSearchParams(location.search).get("m");
    var index = MODS.findIndex(function (m) { return m.id === id; });
    var main = $("#mod");

    if (index < 0) {
      document.title = "Mod not found — " + SITE.author + " mods";
      main.innerHTML =
        '<div class="band"><div class="band__inner"><div class="frame frame--ticks">' +
        '<div class="label"><span>404 / <b>Not found</b></span><span>No such mod</span></div>' +
        '<div class="hero"><h1>Nothing <em>here</em>.</h1><p>That mod is not in the catalogue.</p>' +
        '<div class="hero__actions"><a class="btn btn--solid" href="index.html#catalogue">' + ICON.back + " All mods</a></div></div>" +
        "</div></div></div>";
      renderFooter();
      return;
    }

    var mod = MODS[index];
    document.title = mod.title + " — " + SITE.author + " mods";
    var meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", mod.tagline);

    var release = repoUrl(mod) + "/releases/latest";
    var tall = mod.screenshots.length > 6; // many small panels read better four across
    var n = 1;
    function label(text, right) {
      return '<div class="label"><span>' + pad2(n++) + " / <b>" + text + "</b></span><span>" + right + "</span></div>";
    }
    function band(html) {
      return '<div class="band"><div class="band__inner"><div class="frame frame--ticks">' + html + "</div></div></div>";
    }

    var facts = [
      ["Game", '<a href="' + esc(mod.gameUrl) + '" rel="noopener" class="more">' + esc(mod.game) + " " + ICON.out + "</a> by " + esc(mod.developer)],
      ["Status", '<span class="status status--' + esc(mod.status) + '">' + esc(STATUS[mod.status] || mod.status) + "</span>"],
      ["Version", '<span data-version="' + esc(mod.id) + '">' + esc(mod.version) + "</span> &middot; for game " + esc(mod.gameVersion)],
      ["Engine", esc(mod.engine)],
      ["Loader", esc(mod.loader)],
      ["Platforms", esc(mod.platforms.join(", "))],
      ["Players", esc(mod.players)],
      ["Licence", "MIT, source on GitHub"],
    ].map(function (f) { return '<div><dt class="mono">' + f[0] + "</dt><dd>" + f[1] + "</dd></div>"; }).join("");

    var shots = mod.screenshots.map(function (s, i) {
      return (
        '<figure class="shot' + (s.wide ? " shot--wide" : "") + '">' +
        '<button type="button" data-shot="' + i + '" aria-label="Enlarge: ' + esc(s.caption) + '">' +
        '<img src="' + img(mod, s.file) + '" alt="' + esc(s.caption) + '" decoding="async" style="aspect-ratio:' + esc(s.ratio || mod.shotRatio || "16 / 9") + '"></button>' +
        "<figcaption>" + esc(s.caption) + "</figcaption></figure>"
      );
    }).join("");

    var features = mod.features.map(function (f, i) {
      return (
        '<div class="cell">' +
        '<div class="cell__top"><span class="cell__icon">' + ICON.check + '</span><span class="cell__index mono">' + letter(i) + "</span></div>" +
        "<h3>" + esc(f.title) + "</h3><p>" + esc(f.text) + "</p></div>"
      );
    });
    var spare = (3 - (features.length % 3)) % 3;
    for (var k = 0; k < spare; k++) features.push('<div class="cell cell--empty' + (k === 1 ? " cell--pad3" : "") + '"></div>');

    function code(text) {
      return '<div class="code"><pre>' + esc(text) + '</pre><button type="button" class="mono" data-copy="' + esc(text) + '">Copy</button></div>';
    }

    var prev = MODS[(index - 1 + MODS.length) % MODS.length];
    var next = MODS[(index + 1) % MODS.length];

    main.innerHTML =
      band(
        '<div class="label crumbs"><span><a href="index.html#catalogue">Catalogue</a> / <b>' + esc(mod.title) + "</b></span><span>" + esc(String(mod.year)) + "</span></div>" +
        '<div class="modhead"><div class="modhead__text">' +
        '<div class="cell__game mono">' + esc(mod.game) + "</div>" +
        "<h1>" + title(mod.title) + "</h1>" +
        '<p class="lead">' + esc(mod.tagline) + "</p>" +
        '<p class="sum">' + esc(mod.summary) + "</p>" +
        '<div class="hero__actions">' +
        '<a class="btn btn--solid" href="' + release + '" rel="noopener">' + ICON.down + " Download</a>" +
        '<a class="btn" href="' + repoUrl(mod) + '" rel="noopener">' + ICON.github.replace("<svg", '<svg width="14" height="14"') + " Source</a>" +
        "</div></div>" +
        '<dl class="facts">' + facts + "</dl></div>"
      ) +
      band(label("Screenshots", mod.screenshots.length + " pictures, click to enlarge") + '<div class="shots' + (tall ? " shots--tall" : "") + '">' + shots + "</div>") +
      band(label("What it does", mod.features.length + " things") + '<div class="grid">' + features.join("") + "</div>") +
      band(
        label("Install", "Close the game first") +
        '<div class="install"><div><h3>Windows</h3><p class="mono" style="color:var(--ink-faint);margin:0 0 12px">PowerShell</p>' + code(mod.install.windows) + "</div>" +
        '<div><h3>Linux / Steam Deck</h3><p class="mono" style="color:var(--ink-faint);margin:0 0 12px">Terminal</p>' + code(mod.install.linux) + "</div></div>" +
        '<div class="note">' + noteHtml(mod.install.note) + ' Prefer a zip? It is on the <a class="more" style="color:var(--accent-ink)" href="' + release + '" rel="noopener">release page ' + ICON.out + "</a>, with installers inside.</div>"
      ) +
      band(
        label("Good to know", "Read before you play") +
        '<ul class="notes">' + mod.notes.map(function (t, i) { return '<li><span class="mono">' + pad2(i + 1) + "</span>" + esc(t) + "</li>"; }).join("") +
        '<li><span class="mono">' + pad2(mod.notes.length + 1) + "</span><span>Found a problem? " +
        '<a class="more" style="color:var(--accent-ink)" href="' + repoUrl(mod) + '/issues" rel="noopener">Open an issue ' + ICON.out + "</a> rather than writing to the game's developers.</span></li></ul>"
      ) +
      (MODS.length > 2
        ? band('<div class="pager"><a href="' + page(prev) + '"><small class="mono">Previous</small><strong>' + title(prev.title) + '</strong></a><a href="' + page(next) + '"><small class="mono">Next</small><strong>' + title(next.title) + "</strong></a></div>")
        : MODS.length === 2
          ? band('<div class="pager"><a href="index.html#catalogue"><small class="mono">Back to</small><strong>All mods</strong></a><a href="' + page(next) + '"><small class="mono">Next mod</small><strong>' + title(next.title) + "</strong></a></div>")
          : "");

    // lightbox
    var box = $("#lightbox");
    main.addEventListener("click", function (e) {
      var b = e.target.closest("[data-shot]");
      if (b) {
        var s = mod.screenshots[+b.dataset.shot];
        box.querySelector("img").src = img(mod, s.file);
        box.querySelector("img").alt = s.caption;
        box.querySelector("p").textContent = s.caption;
        box.showModal();
        return;
      }
      var c = e.target.closest("[data-copy]");
      if (c) {
        var done = function () { c.textContent = "Copied"; setTimeout(function () { c.textContent = "Copy"; }, 1400); };
        if (navigator.clipboard) navigator.clipboard.writeText(c.dataset.copy).then(done, function () { c.textContent = "Select it"; });
        else c.textContent = "Select it";
      }
    });
    box.addEventListener("click", function (e) { if (e.target === box) box.close(); });

    renderFooter();
    liveVersions();
  }

  // "…: WINEDLLOVERRIDES=… %command%" → the command part shown as code.
  function noteHtml(text) {
    var i = text.indexOf(": ");
    if (i < 0) return esc(text);
    return esc(text.slice(0, i + 1)) + " <code>" + esc(text.slice(i + 2)) + "</code>.";
  }

  // Replace the versions written in data/mods.js with the latest release on GitHub, when reachable.
  function liveVersions() {
    MODS.forEach(function (mod) {
      var key = "ver:" + mod.repo;
      var apply = function (v) {
        document.querySelectorAll('[data-version="' + mod.id + '"]').forEach(function (el) {
          el.textContent = (el.textContent.charAt(0) === "v" ? "v" : "") + v;
        });
      };
      try {
        var cached = sessionStorage.getItem(key);
        if (cached) { apply(cached); return; }
      } catch (e) { /* no storage */ }
      if (!window.fetch || location.protocol === "file:") return;
      fetch("https://api.github.com/repos/" + mod.repo + "/releases/latest")
        .then(function (r) { return r.ok ? r.json() : null; })
        .then(function (j) {
          if (!j || !j.tag_name) return;
          var v = String(j.tag_name).replace(/^v/, "");
          apply(v);
          try { sessionStorage.setItem(key, v); } catch (e) { /* no storage */ }
        })
        .catch(function () { /* offline or rate limited: keep the written version */ });
    });
  }

  if (document.body.dataset.page === "mod") renderMod();
  else renderHome();
})();
