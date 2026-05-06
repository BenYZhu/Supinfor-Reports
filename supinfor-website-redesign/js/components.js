/**
 * Shared components: Navigation bar, Footer, Topbar scroll behavior.
 * Usage: <script src="js/components.js"></script>
 *        Then call: renderNav('demo') / renderNav('insights') / renderNav('blog')
 *        And:       renderFooter()
 *        And:       initTopbarScroll()
 *
 * All visible text is pulled from Lang.t() so the UI updates on language switch.
 */

// ── Navigation Bar ──
function renderNav(activePage) {
  var T = window.Lang ? Lang.t : function(k){ return k; };

  var navItems = [
    {
      label: T('nav_home'), href: 'home.html', id: 'home',
      children: [
        { label: T('nav_solution'), href: 'home.html#solution' },
        { label: T('nav_products'), href: 'home.html#products' },
        { label: T('nav_features'), href: 'home.html#features' },
        { label: T('nav_usecase'), href: 'home.html#usecases' }
      ]
    },
    {
      label: T('nav_insights'), href: 'insights.html', id: 'insights',
      children: [
        {
          label: T('nav_region_reports'), href: 'insights.html',
          children: [
            { label: T('nav_biz_env_research'), href: 'insights.html#rr-0' },
            { label: T('nav_country_insight_monthly'), href: 'insights.html#rr-1' },
            { label: T('nav_key_sector_briefing'), href: 'insights.html#rr-2' },
            { label: T('nav_bilateral_dynamics'), href: 'insights.html#rr-3' },
            { label: T('nav_industry_dynamics'), href: 'insights.html#rr-4' },
            { label: T('nav_biz_env_dynamics'), href: 'insights.html#rr-5' }
          ]
        },
        {
          label: T('nav_industry_reports'), href: 'insights.html#ii',
          children: [
            { label: T('nav_industry_research_report'), href: 'insights.html#ii-0' },
            { label: T('nav_industry_insight_monthly'), href: 'insights.html#ii-1' },
            { label: T('nav_trends_alerts'), href: 'insights.html#ii-2' },
            { label: T('nav_corp_intel'), href: 'insights.html#ii-3' },
            { label: T('nav_brand_reputation'), href: 'insights.html#ii-4' }
          ]
        }
      ]
    },
    {
      label: T('nav_resources'), href: 'blog.html', id: 'blog',
      children: [
        { label: T('nav_trends'), href: 'blog.html#Trends' },
        { label: T('nav_region'), href: 'blog.html#Region' },
        { label: T('nav_industry'), href: 'blog.html#Industry' },
        { label: T('nav_guide'), href: 'blog.html#Guides' }
      ]
    },
    { label: T('nav_demo'), href: 'demo.html', id: 'demo' }
  ];

  function buildDropdown(children) {
    var html = '<div class="dropdown">';
    children.forEach(function(child) {
      if (child.children && child.children.length) {
        html += '<div class="dropdown-parent">';
        html += '<a href="' + child.href + '">' + child.label + ' <span class="nav-sub-caret">›</span></a>';
        html += '<div class="sub-dropdown">';
        child.children.forEach(function(sub) {
          html += '<a href="' + sub.href + '">' + sub.label + '</a>';
        });
        html += '</div></div>';
      } else {
        html += '<a href="' + child.href + '">' + child.label + '</a>';
      }
    });
    html += '</div>';
    return html;
  }

  var navHtml = '';
  navItems.forEach(function(item) {
    var hasChildren = item.children && item.children.length;
    var isActive = item.id === activePage;
    navHtml += '<div class="nav-item' + (hasChildren ? ' has-dropdown' : '') + '">';
    navHtml += '<a href="' + item.href + '"' + (isActive ? ' class="active"' : '') + '>';
    navHtml += item.label;
    if (hasChildren) navHtml += ' <span class="nav-caret">▾</span>';
    navHtml += '</a>';
    if (hasChildren) navHtml += buildDropdown(item.children);
    navHtml += '</div>';
  });

  // Build mobile nav links
  var mobileNavHtml = '';
  navItems.forEach(function(item) {
    mobileNavHtml += '<div class="mobile-nav-section">';
    mobileNavHtml += '<a href="' + item.href + '">' + item.label + '</a>';
    if (item.children && item.children.length) {
      item.children.forEach(function(child) {
        if (child.children && child.children.length) {
          mobileNavHtml += '<div class="mobile-nav-section-title">' + child.label + '</div>';
          child.children.forEach(function(sub) {
            mobileNavHtml += '<a href="' + sub.href + '" style="font-size:15px;padding:12px 0 12px 16px;">' + sub.label + '</a>';
          });
        } else {
          mobileNavHtml += '<a href="' + child.href + '" style="font-size:15px;padding:12px 0;">' + child.label + '</a>';
        }
      });
    }
    mobileNavHtml += '</div>';
  });

  var header = document.getElementById('topBar');
  header.innerHTML =
    '<div class="top-bar-inner">' +
      '<a href="home.html" class="logo"><img src="assets/logo-white.svg" alt="Supinfor" id="navLogo"></a>' +
      '<nav class="main-nav">' + navHtml + '</nav>' +
      '<div class="right-actions">' +
        '<button class="lang-toggle">' + T('lang_toggle') + '</button>' +
        '<button class="btn-signin">' + T('btn_signin') + '</button>' +
      '</div>' +
      '<button class="mobile-nav-toggle" aria-label="Toggle navigation menu"><span></span></button>' +
    '</div>' +
    '<div class="mobile-nav-overlay" id="mobileNavOverlay">' +
      mobileNavHtml +
      '<div class="mobile-nav-actions">' +
        '<button class="lang-toggle" style="color:#fff;opacity:.7;font-size:14px;">' + T('lang_toggle') + '</button>' +
        '<button class="btn-signin" style="background:linear-gradient(135deg,#F4CB7A,#E8B659);color:#0A0F3D;border:none;">' + T('btn_signin') + '</button>' +
      '</div>' +
    '</div>';

  // Mobile nav toggle behavior
  var toggleBtn = header.querySelector('.mobile-nav-toggle');
  var overlay = document.getElementById('mobileNavOverlay');
  if (toggleBtn && overlay) {
    toggleBtn.addEventListener('click', function() {
      toggleBtn.classList.toggle('open');
      overlay.classList.toggle('open');
      document.body.style.overflow = overlay.classList.contains('open') ? 'hidden' : '';
    });
    // Close on link click
    overlay.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        toggleBtn.classList.remove('open');
        overlay.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }
}

// ── Footer ──
function renderFooter() {
  var T = window.Lang ? Lang.t : function(k){ return k; };
  var el = document.getElementById('siteFooter');
  if (!el) return;
  el.innerHTML =
    '<div class="footer-inner">' +
      '<div class="footer-grid">' +
        '<div class="footer-brand">' +
          '<img src="assets/logo-white.svg" alt="Supinfor">' +
          '<p>' + T('footer_brand_desc') + '</p>' +
          '<div class="social-links">' +
            '<button title="YouTube"><svg width="16" height="12" viewBox="0 0 24 17" fill="currentColor"><path d="M23.5 2.5c-.3-1-1-1.8-2-2C19.6 0 12 0 12 0S4.4 0 2.5.5c-1 .3-1.8 1-2 2C0 4.4 0 8.5 0 8.5s0 4 .5 5.9c.3 1 1 1.8 2 2C4.4 17 12 17 12 17s7.6 0 9.5-.5c1-.3 1.8-1 2-2 .5-2 .5-5.9.5-5.9s0-4.1-.5-6zM9.5 12.2V4.8l6.5 3.7-6.5 3.7z"/></svg></button>' +
            '<button title="LinkedIn">in</button>' +
            '<button title="WeChat"><svg width="16" height="14" viewBox="0 0 24 20" fill="currentColor"><path d="M8.5 0C3.8 0 0 3.1 0 7c0 2.2 1.2 4.1 3.1 5.4L2.4 15l3-1.5c1 .3 2 .5 3.1.5.3 0 .7 0 1-.1-.2-.6-.3-1.3-.3-2 0-4.4 4-8 9-8 .3 0 .5 0 .8 0C17.8 1.6 13.5 0 8.5 0zM5.5 5.5c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm6 0c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zM24 12c0-3.3-3.4-6-7.5-6S9 8.7 9 12s3.4 6 7.5 6c.8 0 1.6-.1 2.4-.3l2.5 1.3-.5-2.1C22.9 15.7 24 14 24 12zm-10-1.5c-.5 0-.8-.4-.8-.8s.4-.8.8-.8.8.4.8.8-.3.8-.8.8zm5 0c-.5 0-.8-.4-.8-.8s.4-.8.8-.8.8.4.8.8-.3.8-.8.8z"/></svg></button>' +
          '</div>' +
        '</div>' +
        '<div class="footer-col">' +
          '<div class="footer-col-title">' + T('footer_pages').toUpperCase() + '</div>' +
          '<ul>' +
            '<li><a href="home.html">' + T('footer_home') + '</a></li>' +
            '<li><a href="insights.html">' + T('footer_insight') + '</a></li>' +
            '<li><a href="blog.html">' + T('footer_resources') + '</a></li>' +
          '</ul>' +
        '</div>' +
        '<div class="footer-col">' +
          '<div class="footer-col-title">' + T('footer_products').toUpperCase() + '</div>' +
          '<ul>' +
            '<li><a href="https://cloud.supinfor.com">' + T('footer_product_media') + '</a></li>' +
            '<li><a href="https://focus.supinfor.com">' + T('footer_product_region') + '</a></li>' +
            '<li><a href="https://business.supinfor.com">' + T('footer_product_industry') + '</a></li>' +
          '</ul>' +
        '</div>' +
        '<div class="footer-col">' +
          '<div class="footer-col-title">' + T('footer_company').toUpperCase() + '</div>' +
          '<ul>' +
            '<li>' + T('footer_about') + '</li>' +
            '<li><a href="demo.html">' + T('footer_demo') + '</a></li>' +
            '<li>' + T('footer_contact') + '</li>' +
          '</ul>' +
        '</div>' +
      '</div>' +
      '<div class="footer-bottom">' +
        '<span>' + T('footer_copyright') + '</span>' +
      '</div>' +
    '</div>';
}

// ── Topbar Scroll Behavior ──
function initTopbarScroll() {
  var bar = document.getElementById('topBar');
  var logo = document.getElementById('navLogo');
  if (!bar || !logo) return;
  window.addEventListener('scroll', function() {
    var s = window.scrollY > 10;
    bar.classList.toggle('scrolled', s);
    logo.src = s ? 'assets/logo-blue.svg' : 'assets/logo-white.svg';
  }, { passive: true });
}
