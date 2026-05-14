(function () {
  "use strict";

  var bubblesLayer = document.getElementById("bubblesLayer");
  var navToggle = document.getElementById("navToggle");
  var siteNav = document.getElementById("siteNav");

  function randomBetween(min, max) {
    return min + Math.random() * (max - min);
  }

  function spawnBubble() {
    if (!bubblesLayer) return;

    var el = document.createElement("div");
    el.className = "bubble";
    var size = randomBetween(8, 36);
    el.style.width = size + "px";
    el.style.height = size + "px";
    el.style.left = randomBetween(-5, 105) + "%";
    el.style.setProperty("--drift", randomBetween(-40, 40) + "px");
    el.style.animationDuration = randomBetween(12, 22) + "s";
    el.style.opacity = String(randomBetween(0.25, 0.65));
    bubblesLayer.appendChild(el);

    window.setTimeout(function () {
      if (el.parentNode) el.parentNode.removeChild(el);
    }, 24000);
  }

  function startBubbles() {
    if (!bubblesLayer) return;
    spawnBubble();
    window.setInterval(spawnBubble, 900);
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    /* skip continuous bubbles */
  } else {
    startBubbles();
  }

  if (navToggle && siteNav) {
    navToggle.addEventListener("click", function () {
      var open = siteNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    siteNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        siteNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    revealEls.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }
})();
