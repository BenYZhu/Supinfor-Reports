var cur = { product: 'rr', type: -1 };

// Support URL hash for product and type selection
(function() {
  var hash = window.location.hash.replace('#', '');
  if (!hash) return;
  var parts = hash.split('-');
  var productId = parts[0];
  if (productId && PRODUCTS && PRODUCTS[productId]) {
    cur.product = productId;
    if (parts.length > 1) {
      var typeIdx = parseInt(parts[1], 10);
      if (!isNaN(typeIdx) && typeIdx >= 0 && PRODUCTS[productId].types && typeIdx < PRODUCTS[productId].types.length) {
        cur.type = typeIdx;
      }
    }
  }
})();

/** Resolve translated text from a data object's key field */
function dt(obj, field) {
  var key = obj[field + 'Key'];
  if (key) return Lang.t(key);
  // Fallback: try direct field, or lang-specific fields
  if (obj[field]) return obj[field];
  var lang = Lang.getLang();
  if (obj[field + '_' + lang]) return obj[field + '_' + lang];
  if (obj[field + '_en']) return obj[field + '_en'];
  return '';
}

function render() {
  var p = PRODUCTS[cur.product];
  if (!p || !p.types) return; // data not loaded yet

  var pName = dt(p, 'name');
  var pLabel = dt(p, 'label');
  var pDesc = dt(p, 'desc');

  // Product toggle (left column)
  var toggleIcons = {
    rr: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/></svg>',
    ii: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v18h18"/><path d="M7 16l4-4 4 4 5-5"/></svg>'
  };
  document.getElementById('toggleBar').innerHTML =
    Object.keys(PRODUCTS).map(function(key) {
      var pr = PRODUCTS[key];
      if (!pr) return '';
      return '<button class="toggle-btn' + (pr.id===cur.product?' on':'') + '" onclick="switchProduct(\'' + pr.id + '\')"><span class="btn-icon">' + toggleIcons[pr.id] + '</span>' + dt(pr, 'name') + '</button>';
    }).join('');

  // Report type chips (left column, below toggle)
  document.getElementById('typeChips').innerHTML =
    p.types.map(function(tp, i) {
      return '<button class="type-chip' + (i===cur.type?' on':'') + '" onclick="selectType(' + i + ')">' + dt(tp, 'name') + '</button>';
    }).join('');

  // Product description (right column)
  var productIllus = cur.product === 'rr'
    ? '<div style="position:relative;width:100%;height:100%;overflow:hidden;display:flex;align-items:center;justify-content:center;background:rgba(10,20,60,.8)">' +
        '<img src="assets/world-map.svg" style="width:110%;opacity:0.8;filter:brightness(2.2) sepia(1) saturate(2) hue-rotate(5deg)" alt="World Map"/>' +
        '<svg style="position:absolute;inset:0;width:100%;height:100%" viewBox="0 0 240 100" fill="none" xmlns="http://www.w3.org/2000/svg">' +
          '<circle cx="65" cy="35" r="4" fill="#F4CB7A" opacity="0.9"/>' +
          '<circle cx="65" cy="35" r="8" stroke="rgba(244,203,122,.4)" stroke-width="0.8" fill="none"/>' +
          '<circle cx="130" cy="30" r="3.5" fill="#5B6CF9" opacity="0.85"/>' +
          '<circle cx="130" cy="30" r="7" stroke="rgba(91,108,249,.4)" stroke-width="0.8" fill="none"/>' +
          '<circle cx="175" cy="42" r="4" fill="#F4CB7A" opacity="0.8"/>' +
          '<circle cx="175" cy="42" r="8" stroke="rgba(244,203,122,.35)" stroke-width="0.8" fill="none"/>' +
          '<circle cx="100" cy="55" r="3" fill="#5B6CF9" opacity="0.7"/>' +
          '<circle cx="100" cy="55" r="6" stroke="rgba(91,108,249,.3)" stroke-width="0.6" fill="none"/>' +
          '<path d="M65 35 Q 97 18 130 30" stroke="rgba(244,203,122,.35)" stroke-width="0.7" fill="none"/>' +
          '<path d="M130 30 Q 152 28 175 42" stroke="rgba(91,108,249,.3)" stroke-width="0.7" fill="none"/>' +
        '</svg>' +
      '</div>'
    : '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:rgba(10,20,60,.8)"><svg width="100%" height="100%" viewBox="0 0 240 100" preserveAspectRatio="xMidYMid meet" fill="none" xmlns="http://www.w3.org/2000/svg">' +
        '<line x1="25" y1="85" x2="225" y2="85" stroke="rgba(255,255,255,.08)" stroke-width="0.4"/>' +
        '<line x1="25" y1="65" x2="225" y2="65" stroke="rgba(255,255,255,.04)" stroke-width="0.3"/>' +
        '<line x1="25" y1="45" x2="225" y2="45" stroke="rgba(255,255,255,.04)" stroke-width="0.3"/>' +
        '<line x1="25" y1="25" x2="225" y2="25" stroke="rgba(255,255,255,.04)" stroke-width="0.3"/>' +
        '<line x1="40" y1="50" x2="40" y2="75" stroke="rgba(255,100,100,.8)" stroke-width="0.8"/>' +
        '<rect x="36" y="55" width="8" height="14" rx="1" fill="rgba(255,100,100,.8)"/>' +
        '<line x1="58" y1="42" x2="58" y2="70" stroke="rgba(100,220,150,.8)" stroke-width="0.8"/>' +
        '<rect x="54" y="45" width="8" height="18" rx="1" fill="rgba(100,220,150,.8)"/>' +
        '<line x1="76" y1="48" x2="76" y2="72" stroke="rgba(255,100,100,.8)" stroke-width="0.8"/>' +
        '<rect x="72" y="52" width="8" height="12" rx="1" fill="rgba(255,100,100,.8)"/>' +
        '<line x1="94" y1="38" x2="94" y2="65" stroke="rgba(100,220,150,.8)" stroke-width="0.8"/>' +
        '<rect x="90" y="40" width="8" height="18" rx="1" fill="rgba(100,220,150,.8)"/>' +
        '<line x1="112" y1="30" x2="112" y2="58" stroke="rgba(100,220,150,.8)" stroke-width="0.8"/>' +
        '<rect x="108" y="32" width="8" height="20" rx="1" fill="rgba(100,220,150,.8)"/>' +
        '<line x1="130" y1="35" x2="130" y2="60" stroke="rgba(255,100,100,.8)" stroke-width="0.8"/>' +
        '<rect x="126" y="38" width="8" height="15" rx="1" fill="rgba(255,100,100,.8)"/>' +
        '<line x1="148" y1="28" x2="148" y2="55" stroke="rgba(100,220,150,.8)" stroke-width="0.8"/>' +
        '<rect x="144" y="30" width="8" height="18" rx="1" fill="rgba(100,220,150,.8)"/>' +
        '<line x1="166" y1="22" x2="166" y2="48" stroke="rgba(100,220,150,.8)" stroke-width="0.8"/>' +
        '<rect x="162" y="24" width="8" height="16" rx="1" fill="rgba(100,220,150,.8)"/>' +
        '<line x1="184" y1="26" x2="184" y2="50" stroke="rgba(255,100,100,.8)" stroke-width="0.8"/>' +
        '<rect x="180" y="30" width="8" height="12" rx="1" fill="rgba(255,100,100,.8)"/>' +
        '<line x1="202" y1="18" x2="202" y2="42" stroke="rgba(100,220,150,.8)" stroke-width="0.8"/>' +
        '<rect x="198" y="20" width="8" height="16" rx="1" fill="rgba(100,220,150,.8)"/>' +
        '<polyline points="40,62 58,55 76,58 94,50 112,42 130,45 148,38 166,32 184,36 202,28" stroke="#5B6CF9" stroke-width="1.5" fill="none" opacity="0.8" stroke-linecap="round" stroke-linejoin="round"/>' +
        '<rect x="25" y="8" width="32" height="12" rx="3" fill="rgba(91,108,249,.15)" stroke="rgba(91,108,249,.3)" stroke-width="0.5"/>' +
        '<line x1="30" y1="14" x2="50" y2="14" stroke="rgba(91,108,249,.5)" stroke-width="1.5" stroke-linecap="round"/>' +
        '<rect x="63" y="8" width="28" height="12" rx="3" fill="rgba(244,203,122,.12)" stroke="rgba(244,203,122,.3)" stroke-width="0.5"/>' +
        '<line x1="68" y1="14" x2="85" y2="14" stroke="rgba(244,203,122,.5)" stroke-width="1.5" stroke-linecap="round"/>' +
        '<rect x="97" y="8" width="30" height="12" rx="3" fill="rgba(100,220,150,.1)" stroke="rgba(100,220,150,.25)" stroke-width="0.5"/>' +
        '<line x1="102" y1="14" x2="120" y2="14" stroke="rgba(100,220,150,.5)" stroke-width="1.5" stroke-linecap="round"/>' +
        '<circle cx="202" cy="20" r="3" fill="#5B6CF9"/>' +
        '<line x1="205" y1="20" x2="225" y2="20" stroke="rgba(91,108,249,.4)" stroke-width="0.6" stroke-dasharray="2 2"/>' +
      '</svg></div>';

  document.getElementById('productStrip').innerHTML =
    '<div class="product-strip-card">' +
      '<div class="product-name" style="color:#f4cb7a">' + pLabel + '</div>' +
      '<p class="product-desc">' + pDesc + '</p>' +
      '<div class="illus-dark" style="background:rgba(91,108,249,.03);border:1px solid rgba(91,108,249,.15);display:flex;align-items:center;justify-content:center;overflow:hidden">' +
        productIllus +
      '</div>' +
    '</div>';

  // Type list (left panel)
  document.getElementById('typeList').innerHTML =
    p.types.map(function(tp, i) {
      var count = tp.reports ? tp.reports.length : 0;
      return '<div class="type-item' + (i===cur.type?' on':'') + '" onclick="selectType(' + i + ')">' +
        '<span class="type-icon">' + TYPE_ICONS[cur.product][i] + '</span>' +
        '<h4>' + dt(tp, 'name') + '</h4>' +
        '<span class="type-count">' + count + '</span>' +
      '</div>';
    }).join('');

  // Right panel: type detail + report cards
  if (cur.type === -1) {
    document.getElementById('rightPanel').innerHTML =
      '<div style="display:flex;align-items:center;justify-content:center;height:100%;min-height:400px;flex-direction:column;gap:12px;color:#999">' +
        '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" style="opacity:.4"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>' +
        '<p style="font-size:18px;opacity:.6">' + Lang.t('insights_select_type') + '</p>' +
      '</div>';
  } else {
    var t = p.types[cur.type];
    var tName = dt(t, 'name');
    var tDesc = dt(t, 'desc');
    var reports = t.reports || [];

    document.getElementById('rightPanel').innerHTML =
      '<div class="type-hero">' +
        '<div class="type-hero-text">' +
          '<div class="breadcrumb">' + pName + ' / <span>' + tName + '</span></div>' +
          '<h2>' + tName + '</h2>' +
          '<p>' + tDesc + '</p>' +
        '</div>' +
        '<div class="illus" style="min-height:250px;border-radius:15px;background:#f8f9ff;border:1px solid #e8eaf6;padding:0;overflow:hidden">' +
          TYPE_ILLUS[cur.product][cur.type] +
        '</div>' +
      '</div>' +
      '<div class="report-section">' +
        '<h3>' + reports.length + ' Report' + (reports.length>1?'s':'') + '</h3>' +
        '<div class="report-grid">' +
          reports.map(function(r) {
            var coverHtml = r.cover
              ? '<img class="card-cover" src="' + r.cover + '" alt="' + r.title + '" loading="lazy"/>'
              : '<div class="card-illus illus">' +
                  '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>' +
                  r.title +
                '</div>';
            return '<a class="report-card" href="' + r.file + '" target="_blank">' +
              coverHtml +
              '<div class="report-card-body">' +
                '<h4>' + r.title + '</h4>' +
                '<div class="meta"><span class="tag">' + r.tags + '</span><span class="date">' + r.date + '</span></div>' +
              '</div>' +
            '</a>';
          }).join('') +
        '</div>' +
      '</div>';
  }
}

function switchProduct(id) { cur.product = id; cur.type = -1; render(); }
function selectType(i) {
  cur.type = i;
  render();
  // Close mobile sidebar after selection
  var toggleBtn = document.getElementById('mobileSidebarToggle');
  var typeList = document.getElementById('typeList');
  if (toggleBtn && typeList) {
    toggleBtn.classList.remove('open');
    typeList.classList.remove('mobile-open');
  }
  var lightZone = document.querySelector('.light-zone');
  var topBarHeight = document.querySelector('.top-bar').offsetHeight;
  var y = lightZone.getBoundingClientRect().top + window.pageYOffset - topBarHeight;
  window.scrollTo({ top: y, behavior: 'smooth' });
}

function applyHash() {
  var hash = window.location.hash.replace('#', '');
  if (!hash) return;
  var parts = hash.split('-');
  var productId = parts[0];
  if (productId && PRODUCTS[productId]) {
    cur.product = productId;
    cur.type = -1;
    if (parts.length > 1) {
      var typeIdx = parseInt(parts[1], 10);
      if (!isNaN(typeIdx) && typeIdx >= 0 && typeIdx < PRODUCTS[productId].types.length) {
        cur.type = typeIdx;
      }
    }
    render();
  }
}

window.addEventListener('hashchange', applyHash);

// Initial render
render();

// Mobile sidebar toggle
(function() {
  var toggleBtn = document.getElementById('mobileSidebarToggle');
  if (!toggleBtn) return;
  toggleBtn.addEventListener('click', function() {
    var typeList = document.getElementById('typeList');
    toggleBtn.classList.toggle('open');
    typeList.classList.toggle('mobile-open');
  });
})();
