/* ==========================================================================
   gallery.js — catalogue filters with a FLIP transition, a shared lightbox
   (keyboard, swipe, focus trap, escape-to-close) and the testimonial
   carousel dots.
   ========================================================================== */

(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) {
    return Array.prototype.slice.call((ctx || document).querySelectorAll(sel));
  };
  var t = function (key) {
    return window.ZefI18n ? window.ZefI18n.t(key) : key;
  };

  /* ======================================================================
     Catalogue filters — FLIP so the grid rearranges instead of jumping
     ====================================================================== */

  function initFilters() {
    var grid = $("#catalogue-grid");
    var chips = $$("[data-filter]");
    var empty = $("#catalogue-empty");
    if (!grid || !chips.length) return;

    var items = $$(".item", grid);

    function setFilter(value) {
      var useFlip = !reduceMotion.matches && typeof grid.getBoundingClientRect === "function";
      var first = {};

      if (useFlip) {
        items.forEach(function (el, i) {
          if (!el.hidden) first[i] = el.getBoundingClientRect();
        });
      }

      var shown = 0;
      items.forEach(function (el) {
        var match = value === "all" || el.getAttribute("data-room") === value;
        el.hidden = !match;
        if (match) shown++;
      });

      if (empty) empty.hidden = shown !== 0;

      chips.forEach(function (chip) {
        chip.setAttribute(
          "aria-pressed",
          String(chip.getAttribute("data-filter") === value)
        );
      });

      if (!useFlip) return;

      // Invert, then play.
      items.forEach(function (el, i) {
        if (el.hidden) return;
        var last = el.getBoundingClientRect();
        var prev = first[i];

        if (!prev) {
          // newly shown: fade and lift in rather than snap
          el.classList.add("is-flipping");
          el.style.opacity = "0";
          el.style.transform = "translate3d(0, 12px, 0) scale(0.98)";
        } else {
          var dx = prev.left - last.left;
          var dy = prev.top - last.top;
          if (!dx && !dy) return;
          el.classList.add("is-flipping");
          el.style.transform = "translate3d(" + dx + "px," + dy + "px,0)";
        }
      });

      // force a reflow so the inverted state is committed before playing
      void grid.offsetWidth;

      items.forEach(function (el) {
        if (el.hidden || !el.classList.contains("is-flipping")) return;
        el.classList.remove("is-flipping");
        el.style.transform = "";
        el.style.opacity = "";
      });
    }

    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        setFilter(chip.getAttribute("data-filter"));
      });
    });

    // Arrow-key roving between chips, as a toolbar should behave
    var chipBar = chips[0].parentElement;
    if (chipBar) {
      chipBar.addEventListener("keydown", function (e) {
        var idx = chips.indexOf(document.activeElement);
        if (idx === -1) return;
        var next = null;
        if (e.key === "ArrowRight") next = chips[(idx + 1) % chips.length];
        if (e.key === "ArrowLeft") next = chips[(idx - 1 + chips.length) % chips.length];
        if (e.key === "Home") next = chips[0];
        if (e.key === "End") next = chips[chips.length - 1];
        if (!next) return;
        e.preventDefault();
        next.focus();
      });
    }

    setFilter("all");
  }

  /* ======================================================================
     Lightbox — one instance, shared by the catalogue and the gallery.
     Native <dialog> supplies the focus trap and escape-to-close.
     ====================================================================== */

  function initLightbox() {
    var dlg = $("#lightbox");
    if (!dlg || typeof dlg.showModal !== "function") return;

    var img = $("#lightbox-img", dlg);
    var caption = $("#lightbox-caption", dlg);
    var counter = $("#lightbox-count", dlg);
    var prevBtn = $("[data-lb-prev]", dlg);
    var nextBtn = $("[data-lb-next]", dlg);

    var group = [];
    var index = 0;
    var lastFocus = null;

    function currentGroup(btn) {
      var container = btn.closest("[data-lightbox-group]");
      if (!container) return [btn];
      return $$("[data-lb-src]", container).filter(function (el) {
        var item = el.closest(".item");
        return !(item && item.hidden);
      });
    }

    function render() {
      var btn = group[index];
      if (!btn) return;

      var src = btn.getAttribute("data-lb-src");
      var key = btn.getAttribute("data-lb-key");
      var origin = btn.getAttribute("data-lb-origin");

      img.classList.add("is-swapping");
      var next = new Image();
      next.onload = next.onerror = function () {
        img.src = src;
        img.alt = key ? t(key) : "";
        img.classList.remove("is-swapping");
      };
      next.src = src;

      if (caption) {
        caption.innerHTML = "";
        var name = document.createElement("p");
        name.className = "item__name";
        name.textContent = key ? t(key) : "";
        caption.appendChild(name);

        if (origin) {
          var tag = document.createElement("span");
          tag.className = "tag tag--origin";
          tag.setAttribute("data-origin", origin);
          tag.textContent = t(origin === "local" ? "originLocal" : "originImported");
          caption.appendChild(tag);
        }
      }

      if (counter) counter.textContent = index + 1 + " / " + group.length;

      var many = group.length > 1;
      if (prevBtn) prevBtn.hidden = !many;
      if (nextBtn) nextBtn.hidden = !many;
    }

    function step(delta) {
      if (group.length < 2) return;
      index = (index + delta + group.length) % group.length;
      render();
    }

    function open(btn) {
      group = currentGroup(btn);
      index = Math.max(0, group.indexOf(btn));
      lastFocus = btn;
      render();
      dlg.showModal();
      document.body.classList.add("is-locked");
    }

    /* Cleanup is explicit rather than hung off the dialog's `close` event:
       that event does not reliably fire in every engine, and when it does not,
       the page is left scroll-locked with focus stranded inside a closed
       dialog. Idempotent, so the `close` listener below can also call it. */
    function close() {
      if (dlg.open) dlg.close();
      document.body.classList.remove("is-locked");
      if (lastFocus) {
        lastFocus.focus();
        lastFocus = null;
      }
    }

    document.addEventListener("click", function (e) {
      var btn = e.target.closest ? e.target.closest("[data-lb-src]") : null;
      if (!btn) return;
      e.preventDefault();
      open(btn);
    });

    if (prevBtn) prevBtn.addEventListener("click", function () { step(-1); });
    if (nextBtn) nextBtn.addEventListener("click", function () { step(1); });

    $$("[data-lb-close]", dlg).forEach(function (btn) {
      btn.addEventListener("click", close);
    });

    dlg.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { e.preventDefault(); step(1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); step(-1); }
      // handled here too so escape-to-close never depends on the close event
      if (e.key === "Escape") { e.preventDefault(); close(); }
    });

    dlg.addEventListener("close", close);
    dlg.addEventListener("cancel", close);

    // click outside the image closes
    dlg.addEventListener("click", function (e) {
      if (e.target === dlg || e.target.id === "lightbox-stage") close();
    });

    // swipe
    var stage = $("#lightbox-stage", dlg);
    if (stage) {
      var x0 = null;
      var y0 = null;
      stage.addEventListener("touchstart", function (e) {
        if (e.touches.length !== 1) return;
        x0 = e.touches[0].clientX;
        y0 = e.touches[0].clientY;
      }, { passive: true });

      stage.addEventListener("touchend", function (e) {
        if (x0 === null) return;
        var touch = e.changedTouches[0];
        var dx = touch.clientX - x0;
        var dy = touch.clientY - y0;
        x0 = null;
        if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy)) {
          step(dx < 0 ? 1 : -1);
        }
      }, { passive: true });
    }

    // captions follow the language switch while the lightbox is open
    document.addEventListener("zefmesh:langchange", function () {
      if (dlg.open) render();
    });
  }

  /* ======================================================================
     Testimonial carousel — scroll-snap rail with dot indicators
     ====================================================================== */

  function initCarousel() {
    var rail = $("#tstm-rail");
    var dotsBox = $("#tstm-dots");
    if (!rail || !dotsBox) return;

    var slides = $$("[data-slide]", rail);
    if (slides.length < 2) return;

    dotsBox.innerHTML = "";
    var dots = slides.map(function (slide, i) {
      var dot = document.createElement("button");
      dot.type = "button";
      dot.className = "dots__dot";
      dot.setAttribute("role", "tab");
      dot.setAttribute("aria-selected", String(i === 0));
      dot.setAttribute("aria-label", String(i + 1));
      dot.addEventListener("click", function () {
        rail.scrollTo({
          left: slide.offsetLeft - rail.offsetLeft,
          behavior: reduceMotion.matches ? "auto" : "smooth"
        });
      });
      dotsBox.appendChild(dot);
      return dot;
    });

    var ticking = false;
    function sync() {
      ticking = false;
      var mid = rail.scrollLeft + rail.clientWidth / 2;
      var best = 0;
      var bestDist = Infinity;
      slides.forEach(function (slide, i) {
        var centre = slide.offsetLeft - rail.offsetLeft + slide.offsetWidth / 2;
        var dist = Math.abs(centre - mid);
        if (dist < bestDist) { bestDist = dist; best = i; }
      });
      dots.forEach(function (dot, i) {
        dot.setAttribute("aria-selected", String(i === best));
      });
    }

    rail.addEventListener("scroll", function () {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(sync);
      }
    }, { passive: true });

    sync();
  }

  /* ====================================================================== */

  function init() {
    initFilters();
    initLightbox();
    initCarousel();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
