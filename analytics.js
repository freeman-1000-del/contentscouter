/**
 * Content Scouter — Google Analytics 4
 * Custom: deployer_ad_click on .deployerAd links
 */
window.CS_GA_MEASUREMENT_ID = "G-02PN0TZF9M";

(function () {
  var id = String(window.CS_GA_MEASUREMENT_ID || "").trim();
  if (!id || id === "G-XXXXXXXXXX" || id.indexOf("G-") !== 0) return;

  var path = window.location.pathname || "";

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;
  gtag("js", new Date());
  gtag("config", id, {
    anonymize_ip: true,
    product: "content_scouter",
  });

  window.csTrackEvent = function (eventName, params) {
    try {
      gtag("event", eventName, params || {});
    } catch (e) {}
  };

  function adPlacementFromLink(ad) {
    var fromAttr = ad.getAttribute("data-ad-placement");
    if (fromAttr) return fromAttr;
    var col = ad.closest("aside.adCol, .adCol");
    var row = ad.closest(".pageRowInner");
    if (!col || !row) return "unknown";
    var cols = row.querySelectorAll("aside.adCol, .adCol");
    if (cols.length < 2) return "single";
    return col === cols[0] ? "left" : "right";
  }

  document.addEventListener(
    "click",
    function (e) {
      var ad = e.target.closest && e.target.closest("a.deployerAd");
      if (!ad) return;
      var ctaEl = ad.querySelector(".cta");
      window.csTrackEvent("deployer_ad_click", {
        event_category: "outbound_ad",
        event_label: "humateck_deployer",
        product: "content_scouter",
        ad_placement: adPlacementFromLink(ad),
        link_url: ad.getAttribute("href") || "",
        cta_text: (ctaEl && ctaEl.textContent.trim()) || "deployer_ad",
        page_path: window.location.pathname || "",
        page_title: document.title || "",
        transport_type: "beacon",
      });
    },
    true
  );

  var s = document.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(id);
  document.head.appendChild(s);
})();
