/* ── Blog data ── */
var BLOG_CATEGORIES = ['All', 'Trends', 'Region', 'Industry', 'Guides'];

/* Category i18n key mapping */
var CAT_I18N = {
  All: 'blog_cat_all',
  Trends: 'blog_cat_trends',
  Region: 'blog_cat_region',
  Industry: 'blog_cat_industry',
  Guides: 'blog_cat_guides'
};

var BLOG_POSTS = [
  /* Trends */
  { id: 1,  cat: 'Trends',   titleKey: 'blog_1_title',  excerptKey: 'blog_1_excerpt',  date: 'Apr 2026', read: '6 min', featured: true,  size: 'hero' },
  { id: 2,  cat: 'Trends',   titleKey: 'blog_2_title',  excerptKey: 'blog_2_excerpt',  date: 'Apr 2026', read: '8 min', featured: true,  size: 'tall' },
  { id: 3,  cat: 'Trends',   titleKey: 'blog_3_title',  excerptKey: 'blog_3_excerpt',  date: 'Mar 2026', read: '5 min', featured: true,  size: 'wide' },
  { id: 4,  cat: 'Trends',   titleKey: 'blog_4_title',  excerptKey: 'blog_4_excerpt',  date: 'Mar 2026', read: '7 min', featured: false },
  { id: 5,  cat: 'Trends',   titleKey: 'blog_5_title',  excerptKey: 'blog_5_excerpt',  date: 'Mar 2026', read: '5 min', featured: false },
  { id: 6,  cat: 'Trends',   titleKey: 'blog_6_title',  excerptKey: 'blog_6_excerpt',  date: 'Feb 2026', read: '6 min', featured: false },
  { id: 7,  cat: 'Trends',   titleKey: 'blog_7_title',  excerptKey: 'blog_7_excerpt',  date: 'Feb 2026', read: '7 min', featured: false },
  { id: 8,  cat: 'Trends',   titleKey: 'blog_8_title',  excerptKey: 'blog_8_excerpt',  date: 'Jan 2026', read: '5 min', featured: false },
  /* Region */
  { id: 9,  cat: 'Region',   titleKey: 'blog_9_title',  excerptKey: 'blog_9_excerpt',  date: 'Apr 2026', read: '9 min', featured: true,  size: 'hero' },
  { id: 10, cat: 'Region',   titleKey: 'blog_10_title', excerptKey: 'blog_10_excerpt', date: 'Apr 2026', read: '7 min', featured: true,  size: 'tall' },
  { id: 11, cat: 'Region',   titleKey: 'blog_11_title', excerptKey: 'blog_11_excerpt', date: 'Mar 2026', read: '8 min', featured: true,  size: 'wide' },
  { id: 12, cat: 'Region',   titleKey: 'blog_12_title', excerptKey: 'blog_12_excerpt', date: 'Mar 2026', read: '6 min', featured: false },
  { id: 13, cat: 'Region',   titleKey: 'blog_13_title', excerptKey: 'blog_13_excerpt', date: 'Mar 2026', read: '6 min', featured: false },
  { id: 14, cat: 'Region',   titleKey: 'blog_14_title', excerptKey: 'blog_14_excerpt', date: 'Feb 2026', read: '5 min', featured: false },
  { id: 15, cat: 'Region',   titleKey: 'blog_15_title', excerptKey: 'blog_15_excerpt', date: 'Feb 2026', read: '7 min', featured: false },
  { id: 16, cat: 'Region',   titleKey: 'blog_16_title', excerptKey: 'blog_16_excerpt', date: 'Jan 2026', read: '8 min', featured: false },
  /* Industry */
  { id: 17, cat: 'Industry', titleKey: 'blog_17_title', excerptKey: 'blog_17_excerpt', date: 'Apr 2026', read: '10 min', featured: true,  size: 'hero' },
  { id: 18, cat: 'Industry', titleKey: 'blog_18_title', excerptKey: 'blog_18_excerpt', date: 'Apr 2026', read: '8 min',  featured: true,  size: 'tall' },
  { id: 19, cat: 'Industry', titleKey: 'blog_19_title', excerptKey: 'blog_19_excerpt', date: 'Mar 2026', read: '7 min',  featured: true,  size: 'wide' },
  { id: 20, cat: 'Industry', titleKey: 'blog_20_title', excerptKey: 'blog_20_excerpt', date: 'Mar 2026', read: '6 min',  featured: false },
  { id: 21, cat: 'Industry', titleKey: 'blog_21_title', excerptKey: 'blog_21_excerpt', date: 'Feb 2026', read: '7 min',  featured: false },
  { id: 22, cat: 'Industry', titleKey: 'blog_22_title', excerptKey: 'blog_22_excerpt', date: 'Feb 2026', read: '5 min',  featured: false },
  { id: 23, cat: 'Industry', titleKey: 'blog_23_title', excerptKey: 'blog_23_excerpt', date: 'Jan 2026', read: '6 min',  featured: false },
  { id: 24, cat: 'Industry', titleKey: 'blog_24_title', excerptKey: 'blog_24_excerpt', date: 'Jan 2026', read: '6 min',  featured: false },
  /* Guides */
  { id: 25, cat: 'Guides',   titleKey: 'blog_25_title', excerptKey: 'blog_25_excerpt', date: 'Apr 2026', read: '12 min', featured: true,  size: 'hero' },
  { id: 26, cat: 'Guides',   titleKey: 'blog_26_title', excerptKey: 'blog_26_excerpt', date: 'Mar 2026', read: '10 min', featured: true,  size: 'tall' },
  { id: 27, cat: 'Guides',   titleKey: 'blog_27_title', excerptKey: 'blog_27_excerpt', date: 'Mar 2026', read: '9 min',  featured: true,  size: 'wide' },
  { id: 28, cat: 'Guides',   titleKey: 'blog_28_title', excerptKey: 'blog_28_excerpt', date: 'Feb 2026', read: '8 min',  featured: false },
  { id: 29, cat: 'Guides',   titleKey: 'blog_29_title', excerptKey: 'blog_29_excerpt', date: 'Feb 2026', read: '7 min',  featured: false },
  { id: 30, cat: 'Guides',   titleKey: 'blog_30_title', excerptKey: 'blog_30_excerpt', date: 'Jan 2026', read: '8 min',  featured: false },
  { id: 31, cat: 'Guides',   titleKey: 'blog_31_title', excerptKey: 'blog_31_excerpt', date: 'Jan 2026', read: '9 min',  featured: false },
  { id: 32, cat: 'Guides',   titleKey: 'blog_32_title', excerptKey: 'blog_32_excerpt', date: 'Dec 2025', read: '6 min',  featured: false },
];

/** Resolve translated title/excerpt for a post */
function postTitle(p) { return Lang.t(p.titleKey); }
function postExcerpt(p) { return Lang.t(p.excerptKey); }

/* ── SVG illustrations (abstract placeholder art per category) ── */
var CAT_COLORS = {
  All:      { bg: 'rgba(91,108,249,.08)',  a: 'rgba(91,108,249,',  b: 'rgba(244,203,122,' },
  Trends:   { bg: 'rgba(244,203,122,.07)', a: 'rgba(244,203,122,', b: 'rgba(91,108,249,'  },
  Region:   { bg: 'rgba(80,200,160,.07)',  a: 'rgba(80,200,160,',  b: 'rgba(91,108,249,'  },
  Industry: { bg: 'rgba(91,108,249,.08)',  a: 'rgba(91,108,249,',  b: 'rgba(244,203,122,' },
  Guides:   { bg: 'rgba(200,120,255,.07)', a: 'rgba(200,120,255,', b: 'rgba(91,108,249,'  },
};

var CAT_BADGE_COLORS = {
  All:      '#5B6CF9',
  Trends:   '#c89a2a',
  Region:   '#2daa80',
  Industry: '#5B6CF9',
  Guides:   '#9b4fd4',
};

function makeSVG(variant, cat) {
  var c = CAT_COLORS[cat] || CAT_COLORS.All;
  var palettes = {
    line: '<svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%">' +
      '<rect width="200" height="120" fill="' + c.bg + '"/>' +
      '<polyline points="10,90 40,60 70,75 100,35 130,50 160,25 190,40" stroke="' + c.a + '.7)" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<polyline points="10,100 40,80 70,90 100,55 130,70 160,45 190,60" stroke="' + c.b + '.35)" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="4 3"/>' +
      '<circle cx="100" cy="35" r="4" fill="' + c.a + '.8)"/>' +
      '<circle cx="160" cy="25" r="4" fill="' + c.b + '.7)"/>' +
    '</svg>',
    map: '<svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%">' +
      '<rect width="200" height="120" fill="' + c.bg + '"/>' +
      '<ellipse cx="100" cy="60" rx="80" ry="45" stroke="' + c.a + '.15)" stroke-width="1"/>' +
      '<ellipse cx="100" cy="60" rx="50" ry="45" stroke="' + c.a + '.1)" stroke-width="0.7"/>' +
      '<ellipse cx="100" cy="60" rx="20" ry="45" stroke="' + c.a + '.08)" stroke-width="0.7"/>' +
      '<line x1="20" y1="60" x2="180" y2="60" stroke="' + c.a + '.1)" stroke-width="0.7"/>' +
      '<line x1="100" y1="15" x2="100" y2="105" stroke="' + c.a + '.1)" stroke-width="0.7"/>' +
      '<circle cx="75" cy="48" r="5" fill="' + c.a + '.6)"/><circle cx="130" cy="55" r="4" fill="' + c.b + '.55)"/>' +
      '<circle cx="60" cy="72" r="3" fill="' + c.a + '.4)"/><circle cx="148" cy="42" r="3.5" fill="' + c.b + '.4)"/>' +
      '<circle cx="110" cy="80" r="3" fill="' + c.a + '.35)"/>' +
    '</svg>',
    bars: '<svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%">' +
      '<rect width="200" height="120" fill="' + c.bg + '"/>' +
      '<rect x="20" y="70" width="20" height="40" rx="3" fill="' + c.a + '.4)"/>' +
      '<rect x="50" y="50" width="20" height="60" rx="3" fill="' + c.a + '.55)"/>' +
      '<rect x="80" y="30" width="20" height="80" rx="3" fill="' + c.b + '.65)"/>' +
      '<rect x="110" y="45" width="20" height="65" rx="3" fill="' + c.a + '.45)"/>' +
      '<rect x="140" y="20" width="20" height="90" rx="3" fill="' + c.b + '.75)"/>' +
      '<rect x="170" y="55" width="20" height="55" rx="3" fill="' + c.a + '.38)"/>' +
      '<line x1="15" y1="110" x2="195" y2="110" stroke="' + c.a + '.2)" stroke-width="1"/>' +
    '</svg>',
    grid: '<svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%">' +
      '<rect width="200" height="120" fill="' + c.bg + '"/>' +
      '<rect x="20" y="20" width="24" height="18" rx="3" fill="' + c.a + '.2)"/>' +
      '<rect x="50" y="20" width="24" height="18" rx="3" fill="' + c.a + '.15)"/>' +
      '<rect x="80" y="20" width="24" height="18" rx="3" fill="' + c.a + '.25)"/>' +
      '<rect x="110" y="20" width="24" height="18" rx="3" fill="' + c.a + '.18)"/>' +
      '<rect x="140" y="20" width="24" height="18" rx="3" fill="' + c.a + '.22)"/>' +
      '<rect x="170" y="20" width="24" height="18" rx="3" fill="' + c.a + '.16)"/>' +
      '<rect x="20" y="50" width="24" height="18" rx="3" fill="' + c.a + '.18)"/>' +
      '<rect x="50" y="50" width="24" height="18" rx="3" fill="' + c.a + '.22)"/>' +
      '<rect x="80" y="50" width="24" height="18" rx="3" fill="' + c.a + '.3)"/>' +
      '<rect x="110" y="50" width="24" height="18" rx="3" fill="' + c.a + '.14)"/>' +
      '<rect x="140" y="50" width="24" height="18" rx="3" fill="' + c.a + '.2)"/>' +
      '<rect x="170" y="50" width="24" height="18" rx="3" fill="' + c.a + '.17)"/>' +
      '<rect x="20" y="80" width="24" height="18" rx="3" fill="' + c.a + '.15)"/>' +
      '<rect x="50" y="80" width="24" height="18" rx="3" fill="' + c.a + '.2)"/>' +
      '<rect x="80" y="80" width="24" height="18" rx="3" fill="' + c.a + '.18)"/>' +
      '<rect x="110" y="80" width="24" height="18" rx="3" fill="' + c.a + '.25)"/>' +
      '<rect x="140" y="80" width="24" height="18" rx="3" fill="' + c.a + '.12)"/>' +
      '<rect x="170" y="80" width="24" height="18" rx="3" fill="' + c.a + '.2)"/>' +
      '<rect x="20" y="20" width="54" height="18" rx="3" fill="' + c.b + '.6)"/>' +
      '<rect x="140" y="80" width="54" height="18" rx="3" fill="' + c.a + '.7)"/>' +
    '</svg>',
    nodes: '<svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%">' +
      '<rect width="200" height="120" fill="' + c.bg + '"/>' +
      '<line x1="100" y1="60" x2="40" y2="30" stroke="' + c.a + '.2)" stroke-width="1.2"/>' +
      '<line x1="100" y1="60" x2="160" y2="30" stroke="' + c.a + '.2)" stroke-width="1.2"/>' +
      '<line x1="100" y1="60" x2="40" y2="90" stroke="' + c.b + '.2)" stroke-width="1.2"/>' +
      '<line x1="100" y1="60" x2="160" y2="90" stroke="' + c.b + '.2)" stroke-width="1.2"/>' +
      '<line x1="100" y1="60" x2="100" y2="15" stroke="' + c.a + '.15)" stroke-width="1"/>' +
      '<circle cx="100" cy="60" r="10" fill="' + c.a + '.55)"/>' +
      '<circle cx="40"  cy="30" r="6"  fill="' + c.b + '.5)"/>' +
      '<circle cx="160" cy="30" r="6"  fill="' + c.a + '.45)"/>' +
      '<circle cx="40"  cy="90" r="6"  fill="' + c.a + '.4)"/>' +
      '<circle cx="160" cy="90" r="6"  fill="' + c.b + '.45)"/>' +
      '<circle cx="100" cy="15" r="4"  fill="' + c.a + '.35)"/>' +
    '</svg>',
  };
  var keys = Object.keys(palettes);
  return palettes[keys[variant % keys.length]];
}

/* ── State ── */
var activeCategory = 'All';
var currentPage = 1;
var POSTS_PER_PAGE = 9;

/* ── Helpers ── */
function postsForCategory(cat) {
  return cat === 'All' ? BLOG_POSTS : BLOG_POSTS.filter(function(p) { return p.cat === cat; });
}

function featuredPosts(cat) {
  var pool = postsForCategory(cat).filter(function(p) { return p.featured; });
  return pool.slice(0, 5);
}

function olderPosts(cat) {
  var fIds = {};
  featuredPosts(cat).forEach(function(p) { fIds[p.id] = true; });
  return postsForCategory(cat).filter(function(p) { return !fIds[p.id]; });
}

function badgeColor(cat) {
  return CAT_BADGE_COLORS[cat] || CAT_BADGE_COLORS.All;
}

function catLabel(cat) {
  return CAT_I18N[cat] ? Lang.t(CAT_I18N[cat]) : cat;
}

/* ── Render collage ── */
function renderCollage(cat) {
  var posts = featuredPosts(cat);
  var el = document.getElementById('collage');
  if (!posts.length) { el.innerHTML = '<p style="color:#999;padding:40px">No featured posts in this category yet.</p>'; return; }

  var A = posts[0], B = posts[1], C = posts[2], D = posts[3], E = posts[4];

  el.innerHTML =
    '<div class="collage-grid">' +
      (A ? collageCard(A, 'cell-hero', 0, cat) : '') +
      '<div class="cell-stack">' +
        (B ? collageCard(B, 'cell-b', 1, cat) : '') +
        (C ? collageCard(C, 'cell-c', 2, cat) : '') +
      '</div>' +
      (D ? collageCard(D, 'cell-d', 3, cat) : '') +
      (E ? collageCard(E, 'cell-e', 4, cat) : '') +
    '</div>';
}

function collageCard(post, cellClass, svgVariant, cat) {
  var color = badgeColor(post.cat);
  return '<div class="' + cellClass + ' collage-card">' +
      '<div class="collage-img">' + makeSVG(svgVariant, post.cat) + '</div>' +
      '<div class="collage-body">' +
        '<div class="collage-meta">' +
          '<span class="collage-badge" style="background:' + color + '22;color:' + color + '">' + catLabel(post.cat) + '</span>' +
          '<span class="collage-date">' + post.date + ' \u00b7 ' + post.read + ' read</span>' +
        '</div>' +
        '<div class="collage-title">' + postTitle(post) + '</div>' +
        '<div class="collage-excerpt">' + postExcerpt(post) + '</div>' +
        '<a href="#" class="collage-link">' + Lang.t('blog_read_article') + '</a>' +
      '</div>' +
    '</div>';
}

/* ── Render matrix ── */
function renderMatrix(cat) {
  var posts = olderPosts(cat);
  var totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  var pagePosts = posts.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE);

  var grid = document.getElementById('matrix-grid');
  var pager = document.getElementById('pager');

  grid.innerHTML = pagePosts.map(function(post, i) {
    var color = badgeColor(post.cat);
    return '<div class="matrix-card">' +
        '<div class="matrix-img">' + makeSVG(i + 5, post.cat) + '</div>' +
        '<div class="matrix-body">' +
          '<div class="matrix-meta">' +
            '<span class="matrix-badge" style="background:' + color + '22;color:' + color + '">' + catLabel(post.cat) + '</span>' +
            '<span class="matrix-date">' + post.date + '</span>' +
          '</div>' +
          '<div class="matrix-title">' + postTitle(post) + '</div>' +
          '<div class="matrix-excerpt">' + postExcerpt(post) + '</div>' +
          '<div class="matrix-footer">' +
            '<span class="matrix-read">' + post.read + ' read</span>' +
            '<a href="#" class="matrix-link">' + Lang.t('blog_read') + '</a>' +
          '</div>' +
        '</div>' +
      '</div>';
  }).join('');

  /* Pagination */
  if (totalPages <= 1) { pager.innerHTML = ''; return; }

  var pages = '';
  for (var i = 1; i <= totalPages; i++) {
    pages += '<button class="page-btn' + (i === currentPage ? ' active' : '') + '" onclick="goPage(' + i + ')">' + i + '</button>';
  }
  pager.innerHTML =
    '<button class="page-btn page-prev" onclick="goPage(' + (currentPage - 1) + ')" ' + (currentPage === 1 ? 'disabled' : '') + '>\u2190 ' + Lang.t('blog_prev') + '</button>' +
    pages +
    '<button class="page-btn page-next" onclick="goPage(' + (currentPage + 1) + ')" ' + (currentPage === totalPages ? 'disabled' : '') + '>' + Lang.t('blog_next') + ' \u2192</button>';
}

function goPage(n) {
  var posts = olderPosts(activeCategory);
  var totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  if (n < 1 || n > totalPages) return;
  currentPage = n;
  renderMatrix(activeCategory);
  document.getElementById('matrix-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* ── Hero featured article ── */
function renderHero() {
  var post = BLOG_POSTS[0]; // id: 1
  var c = CAT_COLORS[post.cat] || CAT_COLORS.All;

  document.getElementById('feat-cat').textContent = catLabel(post.cat);
  document.getElementById('feat-meta').textContent = post.date + ' \u00b7 ' + post.read + ' read';
  document.getElementById('feat-title').textContent = postTitle(post);
  document.getElementById('feat-excerpt').textContent = postExcerpt(post);

  document.getElementById('feat-art').innerHTML = makeFeaturedCover(c);
}

function makeFeaturedCover(c) {
  return '<svg viewBox="0 0 300 400" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;display:block">' +
    '<rect width="300" height="400" fill="rgba(255,255,255,.02)"/>' +
    '<ellipse cx="150" cy="180" rx="140" ry="120" fill="' + c.a + '.06)"/>' +
    '<line x1="60" y1="0" x2="60" y2="400" stroke="' + c.a + '.05)" stroke-width="1"/>' +
    '<line x1="120" y1="0" x2="120" y2="400" stroke="' + c.a + '.05)" stroke-width="1"/>' +
    '<line x1="180" y1="0" x2="180" y2="400" stroke="' + c.a + '.05)" stroke-width="1"/>' +
    '<line x1="240" y1="0" x2="240" y2="400" stroke="' + c.a + '.05)" stroke-width="1"/>' +
    '<line x1="0" y1="80" x2="300" y2="80" stroke="' + c.a + '.05)" stroke-width="1"/>' +
    '<line x1="0" y1="160" x2="300" y2="160" stroke="' + c.a + '.05)" stroke-width="1"/>' +
    '<line x1="0" y1="240" x2="300" y2="240" stroke="' + c.a + '.05)" stroke-width="1"/>' +
    '<line x1="0" y1="320" x2="300" y2="320" stroke="' + c.a + '.05)" stroke-width="1"/>' +
    '<path d="M20,280 60,240 100,260 140,200 180,220 220,160 260,180 280,140 L280,360 L20,360 Z" fill="' + c.a + '.08)"/>' +
    '<polyline points="20,280 60,240 100,260 140,200 180,220 220,160 260,180 280,140" stroke="' + c.a + '.6)" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>' +
    '<polyline points="20,300 60,270 100,285 140,235 180,250 220,200 260,215 280,180" stroke="' + c.b + '.3)" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="5 4"/>' +
    '<circle cx="220" cy="160" r="5" fill="' + c.a + '.85)"/>' +
    '<circle cx="140" cy="200" r="4.5" fill="' + c.b + '.75)"/>' +
    '<circle cx="280" cy="140" r="4" fill="' + c.a + '.65)"/>' +
    '<rect x="196" y="120" width="88" height="28" rx="6" fill="rgba(5,8,30,.75)" stroke="' + c.a + '.3)" stroke-width="1"/>' +
    '<rect x="206" y="128" width="28" height="3.5" rx="1.5" fill="' + c.a + '.75)"/>' +
    '<rect x="206" y="136" width="18" height="3" rx="1.5" fill="' + c.b + '.5)"/>' +
    '<circle cx="262" cy="132" r="4.5" fill="' + c.a + '.7)"/>' +
    '<rect x="30" y="60" width="16" height="50" rx="3" fill="' + c.a + '.25)"/>' +
    '<rect x="54" y="45" width="16" height="65" rx="3" fill="' + c.a + '.35)"/>' +
    '<rect x="78" y="30" width="16" height="80" rx="3" fill="' + c.b + '.5)"/>' +
    '<rect x="102" y="50" width="16" height="60" rx="3" fill="' + c.a + '.28)"/>' +
    '<rect x="126" y="20" width="16" height="90" rx="3" fill="' + c.b + '.6)"/>' +
    '<line x1="24" y1="114" x2="150" y2="114" stroke="' + c.a + '.12)" stroke-width="1"/>' +
    '<circle cx="60" cy="370" r="3" fill="' + c.a + '.15)"/>' +
    '<circle cx="100" cy="375" r="2" fill="' + c.b + '.12)"/>' +
    '<circle cx="140" cy="368" r="3.5" fill="' + c.a + '.18)"/>' +
    '<circle cx="180" cy="374" r="2.5" fill="' + c.b + '.14)"/>' +
    '<circle cx="220" cy="370" r="3" fill="' + c.a + '.12)"/>' +
  '</svg>';
}

/* ── Tab switching ── */
function setCategory(cat) {
  activeCategory = cat;
  currentPage = 1;

  document.querySelectorAll('.cat-tab').forEach(function(el) {
    el.classList.toggle('active', el.dataset.cat === cat);
  });

  renderCollage(cat);
  renderMatrix(cat);
}

/* ── Re-render on language change ── */
function blogOnLangChange() {
  // Re-render category tabs
  var tabs = document.querySelectorAll('.cat-tab');
  tabs.forEach(function(el) {
    var cat = el.dataset.cat;
    if (CAT_I18N[cat]) el.textContent = Lang.t(CAT_I18N[cat]);
  });

  // Re-render hero
  renderHero();

  // Update static labels
  var featLabel = document.querySelector('.featured-label span');
  if (featLabel) featLabel.textContent = Lang.t('blog_featured');
  var featCta = document.querySelector('.featured-cta');
  if (featCta) featCta.textContent = Lang.t('blog_read_article');

  // Section labels
  var sections = document.querySelectorAll('.blog-section-label');
  if (sections.length >= 1) sections[0].textContent = Lang.t('blog_featured_section');
  if (sections.length >= 2) sections[1].textContent = Lang.t('blog_more');

  // Re-render content
  renderCollage(activeCategory);
  renderMatrix(activeCategory);
}

/* ── Init ── */
document.addEventListener('DOMContentLoaded', function() {
  renderHero();

  document.querySelectorAll('.cat-tab').forEach(function(el) {
    el.addEventListener('click', function() { setCategory(el.dataset.cat); });
  });

  // Support URL hash for category selection
  function applyCategoryFromHash() {
    var hash = window.location.hash.replace('#', '');
    if (hash && BLOG_CATEGORIES.indexOf(hash) !== -1) {
      setCategory(hash);
    } else {
      setCategory('All');
    }
  }

  applyCategoryFromHash();
  window.addEventListener('hashchange', applyCategoryFromHash);

  // Listen for language changes
  document.addEventListener('langchange', blogOnLangChange);

  // Initial translation of static elements
  blogOnLangChange();
});
