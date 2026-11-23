/* Augmentin_ABRS_eDA_Adult_Smart_eDA_Sept_2026_IN1.0_000 - slide-specific JavaScript */
/* Entry video: plays once automatically the first time the rep reaches this slide in the session;
   on any later return to the home slide (e.g. swipe away and back) it stays paused on the poster
   frame and only plays again if the rep taps the centre play button. (QC fix - previously the
   video auto-played on every single load of this page, including every return to Home.) */
(function () {
  var container = document.getElementById('container');
  var video = document.getElementById('slide1Video');
  var btn = document.getElementById('videoPlayPauseBtn');
  if (!video) return;

  var AUTOPLAYED_KEY = 'mtgskHomeVideoAutoplayed';
  function alreadyAutoplayed() {
    try { return window.sessionStorage.getItem(AUTOPLAYED_KEY) === '1'; } catch (e) { return false; }
  }
  function markAutoplayed() {
    try { window.sessionStorage.setItem(AUTOPLAYED_KEY, '1'); } catch (e) { /* unavailable */ }
  }

  /* Sync the button icon and label with the playback state */
  function updateUI() {
    var playing = !(video.paused || video.ended);
    if (container) container.classList.toggle('playing', playing);
    if (!btn) return;
    btn.querySelector('.icon-play').style.display = playing ? 'none' : 'block';
    btn.querySelector('.icon-pause').style.display = playing ? 'block' : 'none';
    var label = playing ? 'Pause Video' : 'Play Video';
    btn.setAttribute('title', label);
    btn.setAttribute('aria-label', label);
  }

  function toggle() {
    if (video.paused || video.ended) {
      if (video.ended) video.currentTime = 0;
      video.play().then(updateUI).catch(updateUI);
    } else {
      video.pause();
      updateUI();
    }
  }

  ['play', 'pause', 'ended'].forEach(function (ev) { video.addEventListener(ev, updateUI); });
  if (btn) btn.addEventListener('click', function (e) { e.stopPropagation(); toggle(); });

  if (alreadyAutoplayed()) {
    /* Not the first visit this session: stay paused on the poster frame, wait for a manual tap */
    updateUI();
    return;
  }

  /* First visit this session: try autoplay; if the web view blocks it, start on the first touch */
  markAutoplayed();
  var p = video.play();
  if (p !== undefined) {
    p.then(updateUI).catch(function () {
      updateUI();
      var start = function () { video.play().then(updateUI).catch(function () {}); };
      document.addEventListener('touchstart', start, { once: true });
      document.addEventListener('click', start, { once: true });
    });
  }
})();
