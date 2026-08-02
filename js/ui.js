/* ==========================================================================
   ui.js — announcement bar, nav, mobile menu, branch chooser, scroll
   reveals, stat count-up, branch-map draw-on, back-to-top, mobile dock.

   Everything here is progressive: with this file absent the page is still
   readable, the accordion still opens, and every phone link still dials.
   ========================================================================== */

(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) {
    return Array.prototype.slice.call((ctx || document).querySelectorAll(sel));
  };

  /* ======================================================================
     Announcement bar — dismissible, remembers the dismissal
     ====================================================================== */

  function initAnnounce() {
    var bar = $("#announce");
    if (!bar) return;
    var KEY = "zefmesh_announce_dismissed";
    var dismissed = false;

    try { dismissed = window.localStorage.getItem(KEY) === "1"; } catch (e) {}

    if (dismissed) {
      bar.hidden = true;
      return;
    }
    bar.hidden = false;

    var close = $(".announce__close", bar);
    if (!close) return;
    close.addEventListener("click", function () {
      bar.hidden = true;
      try { window.localStorage.setItem(KEY, "1"); } catch (e) {}
    });
  }

  /* ======================================================================
     Nav — hide on scroll down, show on scroll up, brass progress line
     ====================================================================== */

  function initNav() {
    var nav = $("#nav");
    var progress = $("#nav-progress");
    if (!nav) return;

    var lastY = window.scrollY;
    var ticking = false;
    var THRESHOLD = 6;

    function update() {
      ticking = false;
      var y = window.scrollY;
      var max = document.documentElement.scrollHeight - window.innerHeight;

      if (progress) {
        progress.style.setProperty("--progress", max > 0 ? (y / max).toFixed(4) : 0);
      }

      // never hide while the menu is open, or in the top zone
      if (document.body.classList.contains("is-locked") || y < 120) {
        nav.setAttribute("data-nav-hidden", "false");
        lastY = y;
        return;
      }

      var delta = y - lastY;
      if (Math.abs(delta) > THRESHOLD) {
        nav.setAttribute("data-nav-hidden", String(delta > 0));
        lastY = y;
      }
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    update();
  }

  /* ======================================================================
     Active section link
     ====================================================================== */

  function initSectionSpy() {
    var links = $$("[data-spy]");
    if (!links.length || !("IntersectionObserver" in window)) return;

    var byId = {};
    var targets = [];

    links.forEach(function (link) {
      var id = link.getAttribute("href");
      if (!id || id.charAt(0) !== "#") return;
      var section = document.getElementById(id.slice(1));
      if (!section) return;
      (byId[id] = byId[id] || []).push(link);
      if (targets.indexOf(section) === -1) targets.push(section);
    });

    var visible = {};

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          visible["#" + entry.target.id] = entry.isIntersecting
            ? entry.intersectionRatio
            : 0;
        });

        var best = null;
        var bestRatio = 0;
        Object.keys(visible).forEach(function (id) {
          if (visible[id] > bestRatio) { bestRatio = visible[id]; best = id; }
        });

        links.forEach(function (link) {
          link.setAttribute(
            "aria-current",
            best && link.getAttribute("href") === best ? "true" : "false"
          );
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.01, 0.5, 1] }
    );

    targets.forEach(function (t) { io.observe(t); });
  }

  /* ======================================================================
     Full-screen mobile menu with staggered reveal
     ====================================================================== */

  function initMenu() {
    var menu = $("#menu");
    var openBtn = $("#menu-open");
    var closeBtn = $("#menu-close");
    if (!menu || !openBtn) return;

    var lastFocus = null;

    function focusables() {
      return $$(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        menu
      ).filter(function (el) { return el.offsetParent !== null; });
    }

    function open() {
      lastFocus = document.activeElement;
      menu.setAttribute("data-open", "true");
      menu.removeAttribute("inert");
      openBtn.setAttribute("aria-expanded", "true");
      document.body.classList.add("is-locked");
      var first = focusables()[0];
      if (first) first.focus();
      document.addEventListener("keydown", onKey);
    }

    function close() {
      menu.setAttribute("data-open", "false");
      menu.setAttribute("inert", "");
      openBtn.setAttribute("aria-expanded", "false");
      document.body.classList.remove("is-locked");
      document.removeEventListener("keydown", onKey);
      if (lastFocus) lastFocus.focus();
    }

    function onKey(e) {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab") return;

      var items = focusables();
      if (!items.length) return;
      var first = items[0];
      var last = items[items.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    menu.setAttribute("data-open", "false");
    menu.setAttribute("inert", "");
    openBtn.addEventListener("click", open);
    if (closeBtn) closeBtn.addEventListener("click", close);

    $$("a[href^='#']", menu).forEach(function (a) {
      a.addEventListener("click", close);
    });
  }

  /* ======================================================================
     Branch chooser — native <dialog> gives focus trapping and Esc for free
     ====================================================================== */

  function initChooser() {
    var dlg = $("#branch-chooser");
    if (!dlg) return;

    var openers = $$("[data-open-chooser]");
    if (!openers.length) return;

    var lastFocus = null;

    /* Idempotent, and never relies on the dialog's `close` event firing —
       see the same note in gallery.js. */
    function close() {
      if (dlg.open) dlg.close();
      document.body.classList.remove("is-locked");
      if (lastFocus) {
        lastFocus.focus();
        lastFocus = null;
      }
    }

    // With JS on, the fallback tel: link becomes a chooser trigger instead.
    openers.forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        if (typeof dlg.showModal !== "function") return; // let the tel: link work
        e.preventDefault();
        lastFocus = btn;
        dlg.showModal();
        document.body.classList.add("is-locked");
      });
    });

    $$("[data-close-chooser]", dlg).forEach(function (btn) {
      btn.addEventListener("click", close);
    });

    // click the backdrop to dismiss
    dlg.addEventListener("click", function (e) {
      if (e.target === dlg) close();
    });

    dlg.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { e.preventDefault(); close(); }
    });

    dlg.addEventListener("close", close);
    dlg.addEventListener("cancel", close);
  }

  /* ======================================================================
     Scroll reveals — one fade-and-rise, fired once, then unobserved
     ====================================================================== */

  function initReveals() {
    var items = $$("[data-reveal]");
    if (!items.length) return;

    if (!("IntersectionObserver" in window) || reduceMotion.matches) {
      items.forEach(function (el) { el.classList.add("is-revealed"); });
      return;
    }

    var io = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-revealed");
          obs.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 }
    );

    items.forEach(function (el, i) {
      // stagger only within a group, never across the whole page
      var group = el.getAttribute("data-reveal");
      if (group === "stagger") {
        el.style.setProperty("--reveal-delay", (i % 4) * 70 + "ms");
      }
      io.observe(el);
    });
  }

  /* ======================================================================
     Stat count-up
     ====================================================================== */

  function initCounters() {
    var figs = $$("[data-count]");
    if (!figs.length) return;

    function paint(el, value) {
      var suffix = el.getAttribute("data-count-suffix") || "";
      el.textContent = String(value) + suffix;
    }

    if (!("IntersectionObserver" in window) || reduceMotion.matches) {
      figs.forEach(function (el) {
        paint(el, parseInt(el.getAttribute("data-count"), 10) || 0);
      });
      return;
    }

    var io = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          obs.unobserve(el);

          var target = parseInt(el.getAttribute("data-count"), 10) || 0;
          var duration = 1100;
          var start = null;

          function frame(now) {
            if (start === null) start = now;
            var p = Math.min((now - start) / duration, 1);
            // ease-out cubic
            var eased = 1 - Math.pow(1 - p, 3);
            paint(el, Math.round(target * eased));
            if (p < 1) window.requestAnimationFrame(frame);
          }
          window.requestAnimationFrame(frame);
        });
      },
      { threshold: 0.4 }
    );

    figs.forEach(function (el) {
      paint(el, 0);
      io.observe(el);
    });
  }

  /* ======================================================================
     Branch map draw-on.
     The SVG ships fully drawn; this only *adds* the animation, so with JS
     off the map is complete rather than blank.
     ====================================================================== */

  function initMap() {
    var map = $("#branch-map");
    if (!map || reduceMotion.matches || !("IntersectionObserver" in window)) return;

    var paths = $$(".map__road, .map__ring, .map__link", map);
    if (!paths.length) return;

    var io = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          obs.unobserve(entry.target);

          paths.forEach(function (p, i) {
            var len;
            try { len = p.getTotalLength(); } catch (e) { len = 0; }
            if (!len) return;
            p.style.setProperty("--len", len);
            p.style.setProperty("--draw-delay", i * 90 + "ms");
          });
          map.classList.add("is-drawing");
        });
      },
      { threshold: 0.2 }
    );

    io.observe(map);
  }

  /* ======================================================================
     Back-to-top and the mobile dock
     ====================================================================== */

  function initDockAndTop() {
    var top = $("#to-top");
    var dock = $("#dock");
    var hero = $("#hero");

    if (dock) document.body.classList.add("has-dock");

    var ticking = false;

    function update() {
      ticking = false;
      var y = window.scrollY;

      if (top) top.setAttribute("data-visible", String(y > 700));

      if (dock) {
        var threshold = hero ? hero.offsetHeight * 0.75 : 600;
        dock.setAttribute("data-visible", String(y > threshold));
      }
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    update();

    if (top) {
      top.addEventListener("click", function () {
        window.scrollTo({
          top: 0,
          behavior: reduceMotion.matches ? "auto" : "smooth"
        });
      });
    }
  }

  /* ======================================================================
     Accordion — the <details> elements work unaided; this only closes
     siblings so the column does not grow unmanageably long.
     ====================================================================== */

  function initAccordion() {
    var items = $$(".acc__item");
    if (items.length < 2) return;

    items.forEach(function (item) {
      item.addEventListener("toggle", function () {
        if (!item.open) return;
        items.forEach(function (other) {
          if (other !== item) other.open = false;
        });
      });
    });
  }

  /* ====================================================================== */

  function init() {
    initAnnounce();
    initNav();
    initSectionSpy();
    initMenu();
    initChooser();
    initReveals();
    initCounters();
    initMap();
    initDockAndTop();
    initAccordion();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
