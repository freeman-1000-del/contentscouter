/**
 * Content Scouter — Google Analytics 4
 * 1) Open https://analytics.google.com → Admin → Create property for contentscouter.com
 * 2) Create a Web data stream → copy Measurement ID (G-XXXXXXXX)
 * 3) Paste it below, then upload this file with index.html
 */
window.CS_GA_MEASUREMENT_ID = "G-02PN0TZF9M";

(function () {
  var id = String(window.CS_GA_MEASUREMENT_ID || "").trim();
  if (!id || id === "G-XXXXXXXXXX" || id.indexOf("G-") !== 0) return;

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;
  gtag("js", new Date());
  gtag("config", id, { anonymize_ip: true });

  var s = document.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(id);
  document.head.appendChild(s);
})();
