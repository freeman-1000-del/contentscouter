/**
 * Content Scouter — Google Analytics 4 + visit hit log
 * Custom: keyword_pro_ad_click on .keywordProAd links
 */
window.CS_GA_MEASUREMENT_ID = "G-02PN0TZF9M";
window.CS_TRAFFIC_URL =
  window.CS_TRAFFIC_URL ||
  "https://ajvtyotblrtexcxuazqm.supabase.co/functions/v1/cs-traffic";
window.CS_TRAFFIC_ANON =
  window.CS_TRAFFIC_ANON ||
  "sb_publishable_cmn9eVnnvaAjXVJWa6bRQA_qrb1xglQ";

(function () {
  var path = window.location.pathname || "";

  // First-party visit log (admin excludes own IP via /admin/logs.html)
  try {
    if (path.indexOf("/admin") !== 0 && typeof fetch === "function") {
      var trafficUrl = String(window.CS_TRAFFIC_URL || "").trim();
      var anon = String(window.CS_TRAFFIC_ANON || "").trim();
      if (trafficUrl && anon) {
        fetch(trafficUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + anon,
            apikey: anon,
          },
          body: JSON.stringify({
            action: "hit",
            path: path || "/",
            referrer: document.referrer || "",
            title: document.title || "",
            ua: navigator.userAgent || "",
          }),
          keepalive: true,
          cache: "no-store",
          mode: "cors",
        }).catch(function () {});
      }
    }
  } catch (e) {}

  var id = String(window.CS_GA_MEASUREMENT_ID || "").trim();
  if (!id || id === "G-XXXXXXXXXX" || id.indexOf("G-") !== 0) return;

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
      var keypro = e.target.closest && e.target.closest("a.keywordProAd");
      if (!keypro) return;
      var keyCta = keypro.querySelector(".keywordProCta");
      window.csTrackEvent("keyword_pro_ad_click", {
        event_category: "outbound_ad",
        event_label: "keyword_pro",
        product: "content_scouter",
        ad_placement: adPlacementFromLink(keypro),
        link_url: keypro.getAttribute("href") || "",
        cta_text: (keyCta && keyCta.textContent.trim()) || "keyword_pro_ad",
        page_path: window.location.pathname || "",
        page_title: document.title || "",
        transport_type: "beacon",
      });
    },
    true
  );

  document.addEventListener(
    "click",
    function (e) {
      var link = e.target.closest && e.target.closest("a.risingKeywordsLink");
      if (!link) return;
      window.csTrackEvent("tteok_vending_click", {
        event_category: "outbound_product",
        event_label: "떡상자판기",
        product: "tteok_vending",
        link_url: link.getAttribute("href") || "",
        page_path: window.location.pathname || "",
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
