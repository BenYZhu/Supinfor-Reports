// Advanced 3D-feeling visuals: rotating globe, dashboard mockup, knowledge graph, sentiment flow
const { useState: uV, useEffect: eV, useRef: rV } = React;

// ——— ANIMATED 3D GLOBE ———
// Rotating sphere with lat/lng dot grid, arc connections, and pulsing data points
function Globe3D({ size = 520 }) {
  const cvs = rV(null);
  const [rotation, setRotation] = uV(0);
  const dotsRef = rV(null);

  eV(() => {
    let raf;
    let r = 0;
    const tick = () => {
      r += 0.0025;
      setRotation(r);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  eV(() => {
    const c = cvs.current;
    if (!c) return;
    // cache dots once
    if (!dotsRef.current) dotsRef.current = generateGlobeDots();
    const dots = dotsRef.current;

    const dpr = window.devicePixelRatio || 1;
    c.width = size * dpr; c.height = size * dpr;
    c.style.width = size + 'px'; c.style.height = size + 'px';
    const ctx = c.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, size, size);

    const cx = size / 2, cy = size / 2, R = size * 0.42;

    // outer atmospheric halo
    const halo = ctx.createRadialGradient(cx, cy, R * 0.9, cx, cy, R * 1.5);
    halo.addColorStop(0, 'rgba(56,120,255,0)');
    halo.addColorStop(0.6, 'rgba(56,120,255,0.10)');
    halo.addColorStop(1, 'rgba(56,189,248,0.22)');
    ctx.fillStyle = halo;
    ctx.beginPath(); ctx.arc(cx, cy, R * 1.5, 0, Math.PI * 2); ctx.fill();

    // sphere base — dark navy
    const sphere = ctx.createRadialGradient(cx - R * 0.28, cy - R * 0.28, R * 0.08, cx, cy, R);
    sphere.addColorStop(0, 'rgba(20,45,110,0.85)');
    sphere.addColorStop(0.55, 'rgba(5,14,48,0.95)');
    sphere.addColorStop(1, 'rgba(2,6,20,1)');
    ctx.fillStyle = sphere;
    ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill();

    // latitude rings (subtle)
    ctx.strokeStyle = 'rgba(56,189,248,0.07)';
    ctx.lineWidth = 0.5;
    for (let lat = -60; lat <= 60; lat += 30) {
      const latR = Math.cos(lat * Math.PI / 180) * R;
      const yOff = Math.sin(lat * Math.PI / 180) * R;
      ctx.beginPath();
      ctx.ellipse(cx, cy - yOff, latR, latR * 0.18, 0, 0, Math.PI * 2);
      ctx.stroke();
    }

    // dot-grid continents: two passes (glow + core)
    const frontDots = [];
    dots.forEach(d => {
      const lng = d.lng + rotation;
      const x = Math.cos(d.lat) * Math.sin(lng);
      const z = Math.cos(d.lat) * Math.cos(lng);
      const y = Math.sin(d.lat);
      if (z < -0.1) return;
      const px = cx + x * R;
      const py = cy - y * R;
      const depth = (z + 1) / 2;
      frontDots.push({ px, py, depth, z });
    });
    // glow pass
    frontDots.forEach(({ px, py, depth }) => {
      ctx.fillStyle = `rgba(56,189,248,${0.08 + depth * 0.14})`;
      ctx.beginPath(); ctx.arc(px, py, 2.2 + depth * 1.2, 0, Math.PI * 2); ctx.fill();
    });
    // core pass
    frontDots.forEach(({ px, py, depth }) => {
      ctx.fillStyle = `rgba(180,230,255,${0.35 + depth * 0.6})`;
      ctx.beginPath(); ctx.arc(px, py, 0.85 + depth * 0.55, 0, Math.PI * 2); ctx.fill();
    });

    // hot spots
    const hotSpots = [
      { lat: 0.9, lng: -1.3 },   // London
      { lat: 0.7, lng: 2.1 },    // Tokyo
      { lat: 0.5, lng: -1.9 },   // New York
      { lat: 0.1, lng: 1.9 },    // Singapore
      { lat: -0.4, lng: 2.5 },   // Sydney
      { lat: 0.4, lng: 0.8 },    // Dubai
    ];
    const visibleHots = [];
    hotSpots.forEach(h => {
      const lng = h.lng + rotation;
      const x = Math.cos(h.lat) * Math.sin(lng);
      const z = Math.cos(h.lat) * Math.cos(lng);
      const y = Math.sin(h.lat);
      if (z < 0.2) return;
      visibleHots.push({ px: cx + x * R, py: cy - y * R, z });
    });
    // connection arcs
    for (let i = 0; i < visibleHots.length; i++) {
      for (let j = i + 1; j < visibleHots.length; j++) {
        const a = visibleHots[i], b = visibleHots[j];
        const d = Math.hypot(b.px - a.px, b.py - a.py);
        if (d > R * 1.2) continue;
        const mx = (a.px + b.px) / 2;
        const my = (a.py + b.py) / 2 - d * 0.32;
        ctx.strokeStyle = `rgba(56,189,248,${0.22 * Math.min(a.z, b.z)})`;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(a.px, a.py);
        ctx.quadraticCurveTo(mx, my, b.px, b.py);
        ctx.stroke();
      }
    }
    // pulse rings + hotspot dots
    const t = Date.now() / 1000;
    visibleHots.forEach((h, i) => {
      const phase = (t * 0.8 + i * 0.45) % 2;
      const pulseR = 4 + phase * 20;
      const pulseA = Math.max(0, 1 - phase / 2) * 0.85;
      ctx.strokeStyle = `rgba(56,189,248,${pulseA})`;
      ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.arc(h.px, h.py, pulseR, 0, Math.PI * 2); ctx.stroke();
      // core dot with glow
      ctx.fillStyle = 'rgba(56,189,248,0.3)';
      ctx.beginPath(); ctx.arc(h.px, h.py, 6, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#7DD3FC';
      ctx.shadowColor = '#38BDF8';
      ctx.shadowBlur = 10;
      ctx.beginPath(); ctx.arc(h.px, h.py, 3, 0, Math.PI * 2); ctx.fill();
      ctx.shadowBlur = 0;
    });

    // atmosphere rim (Fresnel-like edge glow)
    const rim = ctx.createRadialGradient(cx, cy, R * 0.82, cx, cy, R * 1.02);
    rim.addColorStop(0, 'rgba(56,120,255,0)');
    rim.addColorStop(0.7, 'rgba(56,189,248,0.06)');
    rim.addColorStop(1, 'rgba(56,189,248,0.22)');
    ctx.fillStyle = rim;
    ctx.beginPath(); ctx.arc(cx, cy, R * 1.02, 0, Math.PI * 2); ctx.fill();
  }, [rotation, size]);

  return <canvas ref={cvs} style={{ display: 'block' }} />;
}

function generateGlobeDots() {
  // landmass-shaped distribution
  const dots = [];
  for (let lat = -85; lat <= 85; lat += 2.5) {
    for (let lng = -180; lng <= 180; lng += 2.5) {
      if (isLand(lat, lng)) {
        dots.push({ lat: lat * Math.PI / 180, lng: lng * Math.PI / 180 });
      }
    }
  }
  return dots;
}

function isLand(lat, lng) {
  // North America
  if (lat>49&&lat<72&&lng>-140&&lng<-52) return true;
  if (lat>24&&lat<50&&lng>-125&&lng<-70) return true;
  if (lat>15&&lat<32&&lng>-120&&lng<-85) return true;
  if (lat>7&&lat<18&&lng>-92&&lng<-77) return true;
  if (lat>60&&lat<84&&lng>-57&&lng<-18) return true; // Greenland
  // South America
  if (lat>-5&&lat<12&&lng>-80&&lng<-60) return true;
  if (lat>-55&&lat<-5&&lng>-76&&lng<-35) return true;
  // Europe
  if (lat>36&&lat<72&&lng>-10&&lng<30) return true;
  if (lat>55&&lat<72&&lng>4&&lng<32) return true;
  if (lat>50&&lat<61&&lng>-9&&lng<2) return true; // UK/Ireland
  // Africa
  if (lat>-35&&lat<37&&lng>-18&&lng<52) return true;
  if (lat>-26&&lat<-12&&lng>43&&lng<51) return true; // Madagascar
  // Middle East
  if (lat>12&&lat<38&&lng>32&&lng<60) return true;
  // Russia / Central Asia
  if (lat>50&&lat<75&&lng>30&&lng<180) return true;
  // Asia main
  if (lat>5&&lat<55&&lng>60&&lng<145) return true;
  if (lat>7&&lat<35&&lng>68&&lng<88) return true; // India
  // SE Asia + islands
  if (lat>-9&&lat<25&&lng>95&&lng<141) return true;
  if (lat>5&&lat<20&&lng>118&&lng<127) return true; // Philippines
  // Japan
  if (lat>30&&lat<45&&lng>130&&lng<146) return true;
  // Australia
  if (lat>-40&&lat<-10&&lng>113&&lng<154) return true;
  if (lat>-48&&lat<-34&&lng>166&&lng<178) return true; // NZ
  return false;
}

// ——— REALISTIC DASHBOARD MOCKUP ———
// Laptop-scale dashboard with live-ish charts, sidebar, and data cards
function DashboardMockup({ width = 960, height = 600 }) {
  const [tab, setTab] = uV('overview');
  return (
    <div style={{
      width, height,
      background: '#F6F7FF',
      borderRadius: 14,
      overflow: 'hidden',
      boxShadow: '0 50px 100px -30px rgba(10,15,61,0.45), 0 0 0 1px rgba(255,255,255,0.08)',
      display: 'grid',
      gridTemplateColumns: '200px 1fr',
      fontSize: 12,
    }}>
      {/* sidebar */}
      <div style={{ background: '#0A0F3D', padding: 16, color: '#fff' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
          <div style={{ width: 22, height: 22, borderRadius: 6, background: 'linear-gradient(135deg, #F4CB7A, #E8B659)' }} />
          <span style={{ fontWeight: 700, letterSpacing: '-0.01em' }}>Supinfor</span>
        </div>
        <div style={{ fontSize: 9, letterSpacing: '.12em', color: 'rgba(255,255,255,0.4)', marginBottom: 10 }}>WORKSPACE</div>
        {['Overview', 'Industry Pulse', 'Region Radar', 'Media Monitor', 'AI Desk', 'Reports'].map((l, i) => (
          <div key={l} style={{
            padding: '8px 10px', borderRadius: 7, marginBottom: 2,
            background: i === 0 ? 'rgba(91,108,249,0.25)' : 'transparent',
            color: i === 0 ? '#fff' : 'rgba(255,255,255,0.6)',
            fontSize: 11,
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <span style={{ width: 4, height: 4, borderRadius: 4, background: i === 0 ? '#E8B659' : 'rgba(255,255,255,0.2)' }} />
            {l}
          </div>
        ))}
        <div style={{ marginTop: 20, padding: 10, borderRadius: 8, background: 'rgba(232,182,89,0.08)', border: '1px solid rgba(232,182,89,0.2)' }}>
          <div style={{ fontSize: 9, color: '#E8B659', letterSpacing: '.08em', marginBottom: 4 }}>⚡ ALERT</div>
          <div style={{ fontSize: 10, lineHeight: 1.4, color: 'rgba(255,255,255,0.85)' }}>3 new risk signals on your watchlist</div>
        </div>
      </div>
      {/* main */}
      <div style={{ padding: 18, overflow: 'hidden' }}>
        {/* top bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <div style={{
            flex: 1,
            padding: '6px 10px', borderRadius: 6,
            background: '#fff', border: '1px solid rgba(10,15,61,0.08)',
            fontSize: 11, color: 'rgba(10,15,61,0.5)',
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
            <span>✦</span>
            <span>Ask anything across your knowledge base…</span>
          </div>
          <div style={{ width: 24, height: 24, borderRadius: 6, background: '#D4DAFF' }} />
        </div>
        {/* title row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: '-0.01em' }}>Global Intelligence Overview</div>
            <div style={{ fontSize: 10, color: 'rgba(10,15,61,0.5)', marginTop: 2 }}>Last 24 hours · Auto-refresh on</div>
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            {['24h', '7d', '30d', '90d'].map((r, i) => (
              <div key={r} style={{
                padding: '4px 8px', borderRadius: 5, fontSize: 10,
                background: i === 1 ? 'var(--gradient-card)' : '#fff',
                color: i === 1 ? '#fff' : 'rgba(10,15,61,0.6)',
                border: i === 1 ? 'none' : '1px solid rgba(10,15,61,0.08)',
                fontWeight: 600,
              }}>{r}</div>
            ))}
          </div>
        </div>
        {/* KPI row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 12 }}>
          {[
            { label: 'Signals', value: '124,891', delta: '+12.4%', color: '#5B6CF9', spark: [30,40,38,50,55,70,68,82,90] },
            { label: 'Risk alerts', value: '47', delta: '+3', color: '#E8B659', spark: [12,15,10,18,22,25,28,30,32] },
            { label: 'Sentiment', value: '+0.68', delta: '+0.04', color: '#10B981', spark: [50,55,60,58,62,65,68,70,68] },
            { label: 'Languages', value: '89', delta: 'stable', color: '#7B8BFF', spark: [89,89,89,89,89,89,89,89,89] },
          ].map((k, i) => (
            <div key={i} style={{
              background: '#fff', padding: 10, borderRadius: 8,
              border: '1px solid rgba(10,15,61,0.06)',
            }}>
              <div style={{ fontSize: 9, color: 'rgba(10,15,61,0.5)', letterSpacing: '.06em', marginBottom: 4 }}>{k.label.toUpperCase()}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 4 }}>
                <span style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.01em' }}>{k.value}</span>
                <span style={{ fontSize: 9, color: k.color, fontWeight: 600 }}>{k.delta}</span>
              </div>
              <window.MiniSpark data={k.spark} color={k.color} height={18} />
            </div>
          ))}
        </div>
        {/* Two-column charts */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 10 }}>
          {/* Left: big chart */}
          <div style={{
            background: '#fff', padding: 12, borderRadius: 8,
            border: '1px solid rgba(10,15,61,0.06)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <div style={{ fontSize: 11, fontWeight: 600 }}>Signal Volume · 7 industries</div>
              <div style={{ display: 'flex', gap: 6, fontSize: 9 }}>
                {[['Tech','#5B6CF9'],['Auto','#E8B659'],['Energy','#10B981']].map(([l,c])=>(
                  <span key={l} style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                    <span style={{ width: 6, height: 6, borderRadius: 6, background: c }} /> {l}
                  </span>
                ))}
              </div>
            </div>
            <DashMiniChart />
          </div>
          {/* Right: sentiment donut + list */}
          <div style={{
            background: '#fff', padding: 12, borderRadius: 8,
            border: '1px solid rgba(10,15,61,0.06)',
          }}>
            <div style={{ fontSize: 11, fontWeight: 600, marginBottom: 10 }}>Recent Risk Signals</div>
            {[
              { t: 'EU AI Act enforcement guidance', sev: 'high', src: 'Reuters · 2m ago' },
              { t: 'Supply-chain narrative forming', sev: 'med', src: 'FT · 14m ago' },
              { t: 'Competitor exec departure', sev: 'low', src: 'Bloomberg · 1h ago' },
              { t: 'Q2 earnings pre-announcement', sev: 'high', src: 'WSJ · 2h ago' },
            ].map((r, i) => (
              <div key={i} style={{
                padding: '8px 0',
                borderBottom: i < 3 ? '1px solid rgba(10,15,61,0.05)' : 'none',
                display: 'flex', alignItems: 'center', gap: 8,
              }}>
                <span style={{
                  width: 6, height: 6, borderRadius: 6,
                  background: r.sev === 'high' ? '#E8B659' : r.sev === 'med' ? '#5B6CF9' : '#A6B2FF',
                }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 10, fontWeight: 500 }}>{r.t}</div>
                  <div style={{ fontSize: 9, color: 'rgba(10,15,61,0.5)' }}>{r.src}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// mini animated chart inside dashboard
function DashMiniChart() {
  const cv = rV(null);
  eV(() => {
    const c = cv.current;
    if (!c) return;
    const dpr = window.devicePixelRatio || 1;
    const w = c.parentElement.clientWidth;
    const h = 180;
    c.width = w * dpr; c.height = h * dpr;
    c.style.width = w + 'px'; c.style.height = h + 'px';
    const ctx = c.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const series = [
      { data: [30,40,38,55,50,65,70,78,72,85,92,110], color: '#5B6CF9' },
      { data: [20,28,32,30,42,48,55,52,60,65,72,78], color: '#E8B659' },
      { data: [15,18,22,25,28,30,35,38,42,45,52,58], color: '#10B981' },
    ];
    const maxVal = 120;
    const pad = 12;
    const iw = w - pad * 2;
    const ih = h - pad * 2;

    // grid
    ctx.strokeStyle = 'rgba(10,15,61,0.05)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = pad + ih * i / 4;
      ctx.beginPath(); ctx.moveTo(pad, y); ctx.lineTo(w - pad, y); ctx.stroke();
    }

    series.forEach(s => {
      // area
      const grad = ctx.createLinearGradient(0, pad, 0, h - pad);
      grad.addColorStop(0, s.color + '40');
      grad.addColorStop(1, s.color + '00');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(pad, h - pad);
      s.data.forEach((v, i) => {
        const x = pad + (iw * i / (s.data.length - 1));
        const y = pad + ih - (v / maxVal) * ih;
        ctx.lineTo(x, y);
      });
      ctx.lineTo(w - pad, h - pad);
      ctx.closePath(); ctx.fill();
      // line
      ctx.strokeStyle = s.color; ctx.lineWidth = 1.5;
      ctx.beginPath();
      s.data.forEach((v, i) => {
        const x = pad + (iw * i / (s.data.length - 1));
        const y = pad + ih - (v / maxVal) * ih;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      });
      ctx.stroke();
    });
  }, []);
  return <canvas ref={cv} />;
}

// ——— KNOWLEDGE GRAPH ———
// Animated node graph showing entity relationships
function KnowledgeGraph({ width = 600, height = 420 }) {
  const cv = rV(null);
  const [hover, setHover] = uV(null);
  eV(() => {
    const c = cv.current;
    if (!c) return;
    const dpr = window.devicePixelRatio || 1;
    c.width = width * dpr; c.height = height * dpr;
    c.style.width = width + 'px'; c.style.height = height + 'px';
    const ctx = c.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const nodes = [
      { id: 'ev', label: 'EV Supply Chain', x: 0.5, y: 0.5, r: 32, color: '#E8B659', main: true },
      { id: 'cath', label: 'Cathode Makers', x: 0.28, y: 0.28, r: 18, color: '#5B6CF9' },
      { id: 'cell', label: 'Cell Producers', x: 0.72, y: 0.28, r: 18, color: '#5B6CF9' },
      { id: 'oem', label: 'OEMs', x: 0.72, y: 0.68, r: 18, color: '#5B6CF9' },
      { id: 'lithium', label: 'LATAM Lithium', x: 0.2, y: 0.55, r: 14, color: '#7B8BFF' },
      { id: 'reg', label: 'EU AI Act', x: 0.5, y: 0.17, r: 14, color: '#7B8BFF' },
      { id: 'solid', label: 'Solid-state R&D', x: 0.78, y: 0.85, r: 14, color: '#7B8BFF' },
      { id: 'us', label: 'US Capacity', x: 0.82, y: 0.48, r: 14, color: '#7B8BFF' },
      { id: 'korea', label: 'Korean Players', x: 0.3, y: 0.82, r: 14, color: '#7B8BFF' },
    ];
    const edges = [
      ['ev', 'cath'], ['ev', 'cell'], ['ev', 'oem'],
      ['cath', 'lithium'], ['cell', 'us'], ['oem', 'solid'],
      ['ev', 'reg'], ['cell', 'korea'], ['cath', 'korea'],
    ];
    const getNode = id => nodes.find(n => n.id === id);

    let t = 0;
    let raf;
    const draw = () => {
      t += 0.02;
      ctx.clearRect(0, 0, width, height);
      // edges
      edges.forEach(([a, b]) => {
        const na = getNode(a), nb = getNode(b);
        const x1 = na.x * width, y1 = na.y * height;
        const x2 = nb.x * width, y2 = nb.y * height;
        ctx.strokeStyle = 'rgba(91,108,249,0.2)';
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
        // data pulse along edge
        const p = ((t + a.length * 0.3) % 1);
        const px = x1 + (x2 - x1) * p;
        const py = y1 + (y2 - y1) * p;
        ctx.fillStyle = '#E8B659';
        ctx.shadowColor = '#E8B659'; ctx.shadowBlur = 8;
        ctx.beginPath(); ctx.arc(px, py, 2, 0, Math.PI * 2); ctx.fill();
        ctx.shadowBlur = 0;
      });
      // nodes
      nodes.forEach((n, i) => {
        const x = n.x * width, y = n.y * height;
        // halo
        const grad = ctx.createRadialGradient(x, y, 0, x, y, n.r * 2.5);
        grad.addColorStop(0, n.color + '40');
        grad.addColorStop(1, n.color + '00');
        ctx.fillStyle = grad;
        ctx.beginPath(); ctx.arc(x, y, n.r * 2.5, 0, Math.PI * 2); ctx.fill();
        // circle
        if (n.main) {
          const g2 = ctx.createRadialGradient(x - n.r * 0.3, y - n.r * 0.3, n.r * 0.2, x, y, n.r);
          g2.addColorStop(0, '#F4CB7A');
          g2.addColorStop(1, '#A67B24');
          ctx.fillStyle = g2;
        } else {
          ctx.fillStyle = n.color;
        }
        ctx.beginPath(); ctx.arc(x, y, n.r, 0, Math.PI * 2); ctx.fill();
        // border
        ctx.strokeStyle = 'rgba(255,255,255,0.3)';
        ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.arc(x, y, n.r, 0, Math.PI * 2); ctx.stroke();
        // label
        ctx.fillStyle = '#fff';
        ctx.font = `${n.main ? 600 : 500} ${n.main ? 13 : 11}px Manrope, sans-serif`;
        ctx.textAlign = 'center';
        ctx.fillText(n.label, x, y + n.r + 16);
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, [width, height]);
  return <canvas ref={cv} style={{ display: 'block' }} />;
}

// ——— SENTIMENT FLOW (Sankey-style) ———
function SentimentFlow({ width = 600, height = 300 }) {
  const cv = rV(null);
  eV(() => {
    const c = cv.current;
    if (!c) return;
    const dpr = window.devicePixelRatio || 1;
    c.width = width * dpr; c.height = height * dpr;
    c.style.width = width + 'px'; c.style.height = height + 'px';
    const ctx = c.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const sources = ['News', 'Social', 'Regulatory', 'Forums'];
    const sentiments = ['Positive', 'Neutral', 'Negative'];
    const flows = [
      { from: 0, to: 0, val: 35 }, { from: 0, to: 1, val: 20 }, { from: 0, to: 2, val: 10 },
      { from: 1, to: 0, val: 18 }, { from: 1, to: 1, val: 30 }, { from: 1, to: 2, val: 25 },
      { from: 2, to: 1, val: 15 }, { from: 2, to: 2, val: 12 },
      { from: 3, to: 0, val: 8 }, { from: 3, to: 1, val: 14 }, { from: 3, to: 2, val: 20 },
    ];

    const colors = ['#10B981', '#A6B2FF', '#E8B659'];
    const pad = 20;
    const barW = 14;
    const leftX = pad, rightX = width - pad - barW;

    // compute totals
    const srcTotals = sources.map((_, i) => flows.filter(f => f.from === i).reduce((s, f) => s + f.val, 0));
    const sentTotals = sentiments.map((_, i) => flows.filter(f => f.to === i).reduce((s, f) => s + f.val, 0));
    const grandTotal = srcTotals.reduce((s, v) => s + v, 0);
    const scale = (height - pad * 2 - 30) / grandTotal;

    // source positions
    const srcPos = [];
    let acc = pad;
    srcTotals.forEach((v, i) => {
      srcPos.push({ y: acc, h: v * scale });
      acc += v * scale + 10;
    });
    // sentiment positions
    const sentPos = [];
    acc = pad;
    sentTotals.forEach((v, i) => {
      sentPos.push({ y: acc, h: v * scale });
      acc += v * scale + 10;
    });

    // draw flows
    const srcOff = sources.map(() => 0);
    const sentOff = sentiments.map(() => 0);
    // sort flows to keep them clean
    flows.forEach(f => {
      const src = srcPos[f.from];
      const sent = sentPos[f.to];
      const y1 = src.y + srcOff[f.from];
      const y2 = sent.y + sentOff[f.to];
      const h = f.val * scale;
      srcOff[f.from] += h;
      sentOff[f.to] += h;
      // draw path
      const grad = ctx.createLinearGradient(leftX + barW, 0, rightX, 0);
      grad.addColorStop(0, colors[f.to] + '60');
      grad.addColorStop(1, colors[f.to] + 'A0');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(leftX + barW, y1);
      ctx.bezierCurveTo(width / 2, y1, width / 2, y2, rightX, y2);
      ctx.lineTo(rightX, y2 + h);
      ctx.bezierCurveTo(width / 2, y2 + h, width / 2, y1 + h, leftX + barW, y1 + h);
      ctx.closePath(); ctx.fill();
    });

    // left bars
    srcPos.forEach((p, i) => {
      ctx.fillStyle = '#5B6CF9';
      ctx.fillRect(leftX, p.y, barW, p.h);
      ctx.fillStyle = '#fff';
      ctx.font = '600 11px Manrope';
      ctx.textAlign = 'left';
      ctx.fillText(sources[i], leftX + barW + 6, p.y + 12);
      ctx.font = '400 9px JetBrains Mono';
      ctx.fillStyle = 'rgba(255,255,255,0.5)';
      ctx.fillText(srcTotals[i] + '%', leftX + barW + 6, p.y + 24);
    });
    // right bars
    sentPos.forEach((p, i) => {
      ctx.fillStyle = colors[i];
      ctx.fillRect(rightX, p.y, barW, p.h);
      ctx.fillStyle = '#fff';
      ctx.font = '600 11px Manrope';
      ctx.textAlign = 'right';
      ctx.fillText(sentiments[i], rightX - 6, p.y + 12);
      ctx.font = '400 9px JetBrains Mono';
      ctx.fillStyle = 'rgba(255,255,255,0.5)';
      ctx.fillText(sentTotals[i] + '%', rightX - 6, p.y + 24);
    });
  }, [width, height]);
  return <canvas ref={cv} style={{ display: 'block' }} />;
}

// ——— FLOATING 3D CARD STACK ———
// Used in product section for depth
function FloatingCardStack({ children }) {
  const [t, setT] = uV(0);
  eV(() => {
    let raf;
    let s = 0;
    const tick = () => { s += 0.02; setT(s); raf = requestAnimationFrame(tick); };
    tick();
    return () => cancelAnimationFrame(raf);
  }, []);
  const float = Math.sin(t) * 6;
  return (
    <div style={{ transform: `translateY(${float}px) perspective(1200px) rotateY(-8deg) rotateX(4deg)`, transition: 'transform 0.1s linear' }}>
      {children}
    </div>
  );
}

Object.assign(window, { Globe3D, DashboardMockup, KnowledgeGraph, SentimentFlow, FloatingCardStack });
