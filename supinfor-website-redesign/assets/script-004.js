// Hero + products for v2
const { useState: uH, useEffect: eH } = React;

function Hero() {
  const [tickerItems, setTickerItems] = uH([
    { t: '14:22:08', tag: 'POLICY', title: 'EU Commission signals industrial policy revision', sev: 'high' },
    { t: '14:21:47', tag: 'MARKET', title: 'Semiconductor narrative drift detected', sev: 'med' },
    { t: '14:21:12', tag: 'BRAND', title: 'Executive exposure spike: EU automotive', sev: 'med' },
    { t: '14:20:38', tag: 'REG', title: 'SEC disclosure framework draft surfaces', sev: 'low' },
    { t: '14:20:05', tag: 'ESG', title: 'Supply-chain narrative forming — 14 outlets', sev: 'high' },
  ]);
  eH(() => {
    const id = setInterval(() => {
      setTickerItems(prev => {
        const now = new Date();
        const t = now.toLocaleTimeString('en-GB', { hour12: false });
        return [{ ...prev[0], t }, ...prev.slice(0, 4)];
      });
    }, 3500);
    return () => clearInterval(id);
  }, []);

  return (
    <section style={{
      background: 'var(--gradient-hero)',
      color: '#fff',
      position: 'relative',
      overflow: 'hidden',
      padding: '80px 40px 100px',
    }}>
      {/* ambient glow */}
      <div style={{
        position: 'absolute', top: -200, right: -100, width: 600, height: 600,
        background: 'radial-gradient(circle, rgba(232,182,89,0.18), transparent 60%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: -200, left: -100, width: 700, height: 700,
        background: 'radial-gradient(circle, rgba(91,108,249,0.3), transparent 60%)',
        pointerEvents: 'none',
      }} />
      {/* dot grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
        maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.6), transparent 70%)',
        WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.6), transparent 70%)',
      }} />

      <div style={{ maxWidth: 1440, margin: '0 auto', position: 'relative' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 1fr', gap: 60, alignItems: 'center' }}>
          <div>
            <window.Pill variant="light" icon="✦" style={{ marginBottom: 32 }}>
              <span>Global News & Social Media Monitor</span>
            </window.Pill>
            <h1 style={{
              fontSize: 'clamp(34px, 3.8vw, 58px)',
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: '-0.03em',
              marginBottom: 28,
            }}>
              Convert{' '}
              <span style={{
                background: 'linear-gradient(135deg, #F4CB7A 0%, #E8B659 50%, #D4DAFF 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>news & social signals</span><br />
              into strategic intelligence<br />
              with{' '}
              <span style={{
                background: 'linear-gradient(135deg, #F4CB7A 0%, #E8B659 50%, #D4DAFF 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>Supinfor.</span>
            </h1>
            <p style={{
              fontSize: 19, lineHeight: 1.55, maxWidth: 560,
              color: 'rgba(255,255,255,0.78)',
              marginBottom: 40, fontWeight: 400,
            }}>
Get intelligence on brands, competitors, industries and markets. Extract insights from 180+ markets across 500M+ daily posts.
            </p>
            <div style={{ display: 'flex', gap: 14, marginBottom: 48, flexWrap: 'wrap' }}>
              <button style={{
                background: 'linear-gradient(135deg, #F4CB7A, #E8B659)',
                color: '#0A0F3D',
                padding: '16px 28px', borderRadius: 12,
                fontSize: 15, fontWeight: 600,
                display: 'inline-flex', alignItems: 'center', gap: 10,
                boxShadow: '0 10px 30px -10px rgba(232,182,89,0.5)',
              }}>
                Request a demo <span>→</span>
              </button>
              <button style={{
                background: 'rgba(255,255,255,0.08)',
                color: '#fff',
                padding: '16px 26px', borderRadius: 12,
                fontSize: 15, fontWeight: 500,
                border: '1px solid rgba(255,255,255,0.2)',
                backdropFilter: 'blur(10px)',
              }}>
                ▶ Watch product overview
              </button>
            </div>
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16,
            }}>
              {window.STATS.map((s, i) => (
                <div key={i} style={{
                  padding: '16px 18px',
                  borderRadius: 14,
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(10px)',
                }}>
                  <div style={{
                    fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em',
                    background: 'linear-gradient(135deg, #fff 0%, #D4DAFF 100%)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  }}>{s.k}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', marginTop: 4, lineHeight: 1.3 }}>
                    {s.v}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — phone mockup + floating callouts */}
          <div style={{ position: 'relative', minHeight: 620, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <HeroDeviceStack tickerItems={tickerItems} />
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroDeviceStack({ tickerItems }) {
  const callouts = [
    { top: '4%', left: '-2%', title: 'London · 14m ago', desc: 'EU AI Act guidance', sev: 'high' },
    { top: '28%', left: '-6%', title: 'New York · 3m ago', desc: 'Fed minutes — rate signal', sev: 'high' },
    { top: '55%', left: '0%', title: 'Dubai · 22m ago', desc: 'Gulf sovereign deal flow', sev: 'med' },
    { top: '10%', right: '-4%', title: 'Tokyo · 8m ago', desc: 'Yen intervention chatter', sev: 'med' },
    { top: '42%', right: '-8%', title: 'Singapore · 31m ago', desc: 'MAS disclosure draft', sev: 'low' },
    { top: '70%', right: '-2%', title: 'São Paulo · 45m ago', desc: 'Lithium offtake signed', sev: 'high' },
  ];
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 620, height: 620 }}>
      <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
        <window.Globe3D size={520} />
      </div>
      {callouts.map((c, i) => (
        <Callout key={i} {...c} delay={i * 0.12} />
      ))}
    </div>
  );
}

function Callout({ top, left, right, title, desc, sev = 'med', delay }) {
  const sevColor = sev === 'high' ? '#E8B659' : sev === 'med' ? '#5B6CF9' : '#A6B2FF';
  return (
    <div style={{
      position: 'absolute', top, left, right,
      width: 210,
      padding: '10px 12px',
      borderRadius: 10,
      background: 'rgba(10,15,61,0.72)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255,255,255,0.12)',
      boxShadow: '0 14px 30px -12px rgba(0,0,0,0.5)',
      animation: `fadeUp 0.6s ${delay}s both`,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 4, whiteSpace: 'nowrap' }}>
        <span className="glow-dot" style={{
          width: 6, height: 6, borderRadius: 6, background: sevColor,
          boxShadow: `0 0 10px ${sevColor}`,
          flexShrink: 0,
        }} />
        <div style={{ fontSize: 11, fontWeight: 600, color: '#fff', letterSpacing: '.02em', overflow: 'hidden', textOverflow: 'ellipsis' }}>{title}</div>
      </div>
      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.72)', lineHeight: 1.4 }}>{desc}</div>
    </div>
  );
}

function PhoneScreen({ tickerItems }) {
  return (
    <div style={{ padding: '36px 12px 16px', height: '100%', background: 'linear-gradient(180deg, #0D1A5C 0%, #0A0F3D 100%)', color: '#fff' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
        <img src={window.__resources.logoWhite} style={{ height: 18, width: 'auto' }} />
        <span style={{ fontSize: 12, fontWeight: 600 }}>IndustryInsight</span>
      </div>
      <div style={{
        background: 'linear-gradient(135deg, rgba(91,108,249,0.25), rgba(232,182,89,0.1))',
        borderRadius: 10, padding: 12, marginBottom: 12,
        border: '1px solid rgba(255,255,255,0.12)',
      }}>
        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)', marginBottom: 4 }}>⚡ EVENT ALERT · 2026/04/22</div>
        <div style={{ fontSize: 12, fontWeight: 600, lineHeight: 1.35 }}>
          EU AI Act: enforcement guidance published
        </div>
        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.55)', marginTop: 6, lineHeight: 1.4 }}>
          Commission releases implementation timeline affecting general-purpose AI providers across member states...
        </div>
      </div>
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginBottom: 12,
      }}>
        {[['124k', 'Signals'], ['892', 'Alerts'], ['47', 'Reports'], ['5.2K', 'Sources']].map(([k,v],i)=>(
          <div key={i} style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 8, padding: '8px 10px',
          }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#E8B659' }}>{k}</div>
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.55)' }}>{v}</div>
          </div>
        ))}
      </div>
      <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)', letterSpacing: '.08em', marginBottom: 6 }}>LIVE SIGNAL FEED</div>
      <div style={{
        color: '#fff',
      }}>
        <window.Ticker items={tickerItems} compact />
      </div>
    </div>
  );
}

Object.assign(window, { Hero });
