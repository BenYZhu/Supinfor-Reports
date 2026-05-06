// Reusable v2 components — glossy cards, device mockups, chart widgets
const { useState, useEffect, useRef } = React;

// ——— PHONE MOCKUP ———
function PhoneMockup({ children, style, tilt = -6 }) {
  return (
    <div style={{
      width: 260, height: 540,
      borderRadius: 36,
      background: 'linear-gradient(145deg, #1a1a2e 0%, #0D1A5C 100%)',
      padding: 10,
      boxShadow: '0 40px 80px -20px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08), inset 0 0 0 1px rgba(255,255,255,0.05)',
      transform: `perspective(1200px) rotateY(${tilt}deg)`,
      position: 'relative',
      ...style,
    }}>
      <div style={{
        width: '100%', height: '100%',
        borderRadius: 28,
        overflow: 'hidden',
        background: '#0A0F3D',
        position: 'relative',
      }}>
        {/* notch */}
        <div style={{
          position: 'absolute', top: 8, left: '50%', transform: 'translateX(-50%)',
          width: 90, height: 20, borderRadius: 12, background: '#000', zIndex: 10,
        }} />
        {children}
      </div>
    </div>
  );
}

// ——— TABLET MOCKUP ———
function TabletMockup({ children, style }) {
  return (
    <div style={{
      width: 520, height: 360,
      borderRadius: 18,
      background: 'linear-gradient(145deg, #1a1a2e 0%, #0D1A5C 100%)',
      padding: 8,
      boxShadow: '0 50px 100px -30px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08)',
      position: 'relative',
      ...style,
    }}>
      <div style={{
        width: '100%', height: '100%',
        borderRadius: 12,
        overflow: 'hidden',
        background: '#0A0F3D',
      }}>
        {children}
      </div>
    </div>
  );
}

// ——— GLOSSY CARD ———
function GlossyCard({ children, variant = 'blue', style }) {
  const variants = {
    blue: { bg: 'linear-gradient(135deg, #3D4EE8 0%, #2B3AC7 60%, #1E2B8C 100%)', color: '#fff' },
    deep: { bg: 'linear-gradient(135deg, #1E2B8C 0%, #0D1A5C 100%)', color: '#fff' },
    gold: { bg: 'linear-gradient(135deg, #F4CB7A 0%, #E8B659 50%, #A67B24 100%)', color: '#0A0F3D' },
    light: { bg: 'linear-gradient(135deg, #EEF0FF 0%, #D4DAFF 100%)', color: '#0A0F3D' },
    white: { bg: '#fff', color: '#0A0F3D' },
  };
  const v = variants[variant];
  return (
    <div style={{
      background: v.bg,
      color: v.color,
      borderRadius: 20,
      position: 'relative',
      overflow: 'hidden',
      boxShadow: variant === 'white'
        ? '0 10px 40px -10px rgba(10,15,61,0.1), 0 0 0 1px rgba(10,15,61,0.04)'
        : '0 20px 60px -20px rgba(10,15,61,0.3), 0 0 0 1px rgba(255,255,255,0.08)',
      ...style,
    }}>
      {(variant === 'blue' || variant === 'deep') && (
        <>
          <div style={{
            position: 'absolute', top: -40, right: -40, width: 200, height: 200,
            background: 'radial-gradient(circle, rgba(255,255,255,0.12), transparent 70%)',
            pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', bottom: -80, left: -60, width: 240, height: 240,
            background: 'radial-gradient(circle, rgba(232,182,89,0.1), transparent 60%)',
            pointerEvents: 'none',
          }} />
        </>
      )}
      {children}
    </div>
  );
}

// ——— PILL BADGE ———
function Pill({ children, variant = 'blue', icon, style }) {
  const variants = {
    blue: { bg: 'linear-gradient(135deg, #3D4EE8, #2B3AC7)', color: '#fff' },
    light: { bg: 'rgba(255,255,255,0.15)', color: '#fff', border: '1px solid rgba(255,255,255,0.25)' },
    gold: { bg: 'linear-gradient(135deg, #F4CB7A, #E8B659)', color: '#0A0F3D' },
    outline: { bg: 'transparent', color: '#5B6CF9', border: '1px solid rgba(91,108,249,0.3)' },
  };
  const v = variants[variant];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      padding: '8px 16px',
      borderRadius: 999,
      background: v.bg,
      color: v.color,
      border: v.border || 'none',
      fontSize: 13, fontWeight: 500,
      whiteSpace: 'nowrap',
      ...style,
    }}>
      {icon && <span style={{ fontSize: 14 }}>{icon}</span>}
      {children}
    </span>
  );
}

// ——— MINI SPARKLINE ———
function MiniSpark({ data, color = '#5B6CF9', height = 30, fill = true }) {
  const max = Math.max(...data), min = Math.min(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = 100 - ((v - min) / range) * 85 - 5;
    return [x, y];
  });
  const line = pts.map(p => p.join(',')).join(' ');
  const area = `0,100 ${line} 100,100`;
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ width: '100%', height, display: 'block' }}>
      {fill && (
        <polygon points={area} fill={color} opacity="0.15" />
      )}
      <polyline points={line} fill="none" stroke={color} strokeWidth="2" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

// ——— INTERACTIVE AREA CHART ———
function AreaChart({ data = [[40,45,50,48,62,70,78,82,90,95,110,125]], labels = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'], colors = ['#5B6CF9'] }) {
  const [hover, setHover] = useState(null);
  const canvasRef = useRef(null);
  useEffect(() => {
    const cvs = canvasRef.current; if (!cvs) return;
    const resize = () => {
      const parent = cvs.parentElement;
      const w = parent.clientWidth, h = 220;
      cvs.width = w * 2; cvs.height = h * 2;
      cvs.style.width = w + 'px'; cvs.style.height = h + 'px';
      draw();
    };
    const draw = () => {
      const ctx = cvs.getContext('2d');
      ctx.setTransform(1,0,0,1,0,0); ctx.scale(2,2);
      const w = cvs.width / 2, h = cvs.height / 2;
      const pad = { l: 40, r: 16, t: 16, b: 32 };
      const iw = w - pad.l - pad.r, ih = h - pad.t - pad.b;
      ctx.clearRect(0,0,w,h);

      // grid
      ctx.strokeStyle = 'rgba(10,15,61,0.06)';
      ctx.lineWidth = 1;
      for (let i = 0; i <= 4; i++) {
        const y = pad.t + (ih * i / 4);
        ctx.beginPath(); ctx.moveTo(pad.l, y); ctx.lineTo(pad.l + iw, y); ctx.stroke();
      }
      ctx.fillStyle = 'rgba(10,15,61,0.5)';
      ctx.font = '10px "JetBrains Mono", monospace';
      const maxVal = Math.max(...data.flat());
      for (let i = 0; i <= 4; i++) {
        const val = Math.round(maxVal * (4 - i) / 4);
        ctx.fillText(val, 8, pad.t + (ih * i / 4) + 3);
      }
      labels.forEach((l, i) => {
        const x = pad.l + (iw * i / (labels.length - 1));
        ctx.fillText(l, x - 8, h - 12);
      });

      data.forEach((series, si) => {
        const color = colors[si] || '#5B6CF9';
        // fill
        const grad = ctx.createLinearGradient(0, pad.t, 0, pad.t + ih);
        grad.addColorStop(0, color + '50');
        grad.addColorStop(1, color + '00');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(pad.l, pad.t + ih);
        series.forEach((v, i) => {
          const x = pad.l + (iw * i / (series.length - 1));
          const y = pad.t + ih - (v / maxVal) * ih;
          ctx.lineTo(x, y);
        });
        ctx.lineTo(pad.l + iw, pad.t + ih);
        ctx.closePath(); ctx.fill();

        // line
        ctx.strokeStyle = color; ctx.lineWidth = 2;
        ctx.beginPath();
        series.forEach((v, i) => {
          const x = pad.l + (iw * i / (series.length - 1));
          const y = pad.t + ih - (v / maxVal) * ih;
          if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        });
        ctx.stroke();

        // dots
        series.forEach((v, i) => {
          const x = pad.l + (iw * i / (series.length - 1));
          const y = pad.t + ih - (v / maxVal) * ih;
          ctx.fillStyle = color;
          ctx.beginPath(); ctx.arc(x, y, 2.5, 0, Math.PI * 2); ctx.fill();
        });
      });
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [data]);
  return <canvas ref={canvasRef} />;
}

// ——— ROTATING WORLD GLOBE (SVG dot-map) ———
function WorldMap({ highlights = [], height = 280 }) {
  const MAP = [
    "................................",
    ".....##..######.....####........",
    "..####.#.######..####.##.#####..",
    ".####.#..########.######.######.",
    "..###.....######..####.....####.",
    "...##......####....##......###..",
    "....#......##.##....##......##..",
    "...........#..##.....#......#...",
    "...........#...##....#..........",
    "...........#....#....##.........",
    "...........##...#....#..........",
    "............#...#...............",
    "............##..................",
    "................................",
  ];
  const HOTS = highlights.length ? highlights : [
    { x: 6, y: 2, l: 3 }, { x: 14, y: 2, l: 3 }, { x: 22, y: 3, l: 3 },
    { x: 22, y: 4, l: 3 }, { x: 25, y: 3, l: 2 }, { x: 17, y: 4, l: 2 },
    { x: 20, y: 5, l: 2 }, { x: 9, y: 6, l: 1 }, { x: 26, y: 8, l: 1 },
  ];
  const [pulse, setPulse] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setPulse(p => (p + 1) % HOTS.length), 600);
    return () => clearInterval(id);
  }, []);
  const cols = MAP[0].length, rows = MAP.length;
  return (
    <svg viewBox={`0 0 ${cols * 10} ${rows * 10}`} style={{ width: '100%', height, display: 'block' }}>
      {MAP.map((row, y) => (
        [...row].map((ch, x) => ch === '#' && (
          <circle key={`${x}-${y}`} cx={x * 10 + 5} cy={y * 10 + 5} r={1.4} fill="#5B6CF9" opacity={0.35} />
        ))
      ))}
      {HOTS.map((h, i) => {
        const cx = h.x * 10 + 5, cy = h.y * 10 + 5;
        const isPulsing = i === pulse;
        const r = 1.8 + h.l * 0.5;
        return (
          <g key={i}>
            {isPulsing && (
              <circle cx={cx} cy={cy} r={r} fill="none" stroke="#E8B659" strokeWidth="0.5">
                <animate attributeName="r" from={r} to={r + 10} dur="1.4s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="1" to="0" dur="1.4s" repeatCount="indefinite" />
              </circle>
            )}
            <circle cx={cx} cy={cy} r={r} fill="#E8B659" />
            <circle cx={cx} cy={cy} r={r * 2} fill="#E8B659" opacity="0.2" />
          </g>
        );
      })}
      {/* connecting arcs */}
      {[[6,2,22,3],[14,2,22,4],[22,3,20,5],[26,8,22,4]].map((p, i) => (
        <path key={i}
          d={`M ${p[0]*10+5} ${p[1]*10+5} Q ${(p[0]+p[2])*5} ${Math.min(p[1],p[3])*10 - 15} ${p[2]*10+5} ${p[3]*10+5}`}
          fill="none" stroke="#E8B659" strokeWidth="0.6" opacity="0.5"
          strokeDasharray="2 2"
        />
      ))}
    </svg>
  );
}

// ——— LIVE SIGNAL TICKER ———
function Ticker({ items, compact }) {
  return (
    <div style={{ fontFamily: 'var(--mono)', fontSize: 11 }}>
      {items.map((it, i) => (
        <div key={i} style={{
          display: 'grid',
          gridTemplateColumns: '70px 48px 1fr auto',
          gap: 10, alignItems: 'center',
          padding: '9px 0',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          opacity: i === 0 ? 1 : 1 - i * 0.08,
        }}>
          <span style={{ color: 'rgba(255,255,255,0.5)' }}>{it.t}</span>
          <span style={{
            fontSize: 9, letterSpacing: '.08em',
            padding: '3px 6px',
            background: it.sev === 'high' ? '#E8B659' : it.sev === 'med' ? 'rgba(232,182,89,0.25)' : 'rgba(255,255,255,0.08)',
            color: it.sev === 'high' ? '#0A0F3D' : '#fff',
            textAlign: 'center', borderRadius: 4,
          }}>{it.tag}</span>
          <span style={{ fontFamily: 'var(--sans)', fontSize: 12, lineHeight: 1.3, color: '#fff' }}>{it.title}</span>
          <span className="glow-dot" style={{
            width: 6, height: 6, borderRadius: 6,
            background: it.sev === 'high' ? '#E8B659' : '#5B6CF9',
            boxShadow: `0 0 8px ${it.sev === 'high' ? '#E8B659' : '#5B6CF9'}`,
          }} />
        </div>
      ))}
    </div>
  );
}

Object.assign(window, {
  PhoneMockup, TabletMockup, GlossyCard, Pill, MiniSpark, AreaChart, WorldMap, Ticker,
});
