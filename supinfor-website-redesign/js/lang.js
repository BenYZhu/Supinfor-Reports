/**
 * Language Manager — handles language switching, persistence, and DOM updates.
 *
 * Usage:
 *   1. Include i18n.js (defines window.I18N) before this file.
 *   2. Include lang.js before any page-specific scripts.
 *   3. Mark translatable elements with data-i18n="key_name".
 *   4. For attributes (placeholder, title, alt, aria-label), use
 *      data-i18n-placeholder="key", data-i18n-title="key", etc.
 *   5. Call Lang.t('key') in JS to get the current translation.
 *   6. Call Lang.init() once after the DOM is ready.
 *
 * The module exposes a global `Lang` object.
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'supinfor_lang';
  var SUPPORTED = ['en', 'zh'];
  var DEFAULT_LANG = 'en';

  /** Current language code */
  var currentLang = DEFAULT_LANG;

  /**
   * Detect initial language from (1) localStorage, (2) browser, (3) default.
   */
  function detectLang() {
    // 1. Saved preference
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (saved && SUPPORTED.indexOf(saved) !== -1) return saved;
    } catch (e) { /* localStorage unavailable */ }

    // 2. Browser language
    var nav = (navigator.language || navigator.userLanguage || '').toLowerCase();
    if (nav.indexOf('zh') === 0) return 'zh';

    return DEFAULT_LANG;
  }

  /**
   * Return the translated string for `key` in the current language.
   * Falls back to English, then to the key itself.
   */
  function t(key) {
    var dict = window.I18N;
    if (!dict) return key;
    var langDict = dict[currentLang] || dict[DEFAULT_LANG] || {};
    if (langDict[key] !== undefined) return langDict[key];
    // Fallback to English
    if (currentLang !== DEFAULT_LANG && dict[DEFAULT_LANG]) {
      if (dict[DEFAULT_LANG][key] !== undefined) return dict[DEFAULT_LANG][key];
    }
    return key;
  }

  /**
   * Walk the DOM and update every element that has data-i18n or
   * data-i18n-* attributes.
   */
  function translateDOM(root) {
    root = root || document;

    // Text content
    var els = root.querySelectorAll('[data-i18n]');
    for (var i = 0; i < els.length; i++) {
      var key = els[i].getAttribute('data-i18n');
      if (key) els[i].textContent = t(key);
    }

    // innerHTML (for keys that contain markup like spans)
    var htmlEls = root.querySelectorAll('[data-i18n-html]');
    for (var j = 0; j < htmlEls.length; j++) {
      var hkey = htmlEls[j].getAttribute('data-i18n-html');
      if (hkey) htmlEls[j].innerHTML = t(hkey);
    }

    // Attributes: placeholder, title, alt, aria-label
    var attrs = ['placeholder', 'title', 'alt', 'aria-label'];
    attrs.forEach(function (attr) {
      var sel = '[data-i18n-' + attr + ']';
      var attrEls = root.querySelectorAll(sel);
      for (var k = 0; k < attrEls.length; k++) {
        var akey = attrEls[k].getAttribute('data-i18n-' + attr);
        if (akey) attrEls[k].setAttribute(attr, t(akey));
      }
    });
  }

  /**
   * Switch language and re-render everything.
   */
  function setLang(lang) {
    if (SUPPORTED.indexOf(lang) === -1) return;
    currentLang = lang;

    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* noop */ }

    // Update <html lang>
    document.documentElement.lang = lang;

    // Update page title
    var page = document.body.getAttribute('data-page');
    if (page) {
      var titleKey = 'title_' + page;
      var titleVal = t(titleKey);
      if (titleVal !== titleKey) document.title = titleVal;
    }

    // Translate static DOM
    translateDOM();

    // Fire custom event so page-specific JS can re-render
    var evt;
    try {
      evt = new CustomEvent('langchange', { detail: { lang: lang } });
    } catch (e) {
      evt = document.createEvent('CustomEvent');
      evt.initCustomEvent('langchange', true, true, { lang: lang });
    }
    document.dispatchEvent(evt);
  }

  /**
   * Get current language.
   */
  function getLang() {
    return currentLang;
  }

  /**
   * Toggle between en ↔ zh.
   */
  function toggle() {
    setLang(currentLang === 'en' ? 'zh' : 'en');
  }

  /**
   * Initialize: detect language, apply it, bind toggle buttons.
   */
  function init() {
    currentLang = detectLang();
    // Don't call setLang here yet — components may not be rendered.
    // Instead, store the lang so t() works immediately.
    document.documentElement.lang = currentLang;
  }

  /**
   * Called after all components are rendered. Applies translations and
   * binds the toggle button.
   */
  function apply() {
    setLang(currentLang);
    bindToggle();
  }

  /**
   * Bind click handler to .lang-toggle buttons.
   */
  function bindToggle() {
    var btns = document.querySelectorAll('.lang-toggle');
    for (var i = 0; i < btns.length; i++) {
      // Remove old listeners by cloning
      var newBtn = btns[i].cloneNode(true);
      btns[i].parentNode.replaceChild(newBtn, btns[i]);
      newBtn.addEventListener('click', function () {
        toggle();
      });
    }
  }

  // Expose global
  window.Lang = {
    t: t,
    getLang: getLang,
    setLang: setLang,
    toggle: toggle,
    init: init,
    apply: apply,
    translateDOM: translateDOM,
    bindToggle: bindToggle
  };

  // Auto-detect on load so t() works before init()
  currentLang = detectLang();
  document.documentElement.lang = currentLang;
})();
