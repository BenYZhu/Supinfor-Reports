// Nav + footer + tweaks + app
const { useState: uN, useEffect: eN } = React;

function TopBar({ page, onNav }) {
  const [scrolled, setScrolled] = uN(false);
  eN(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const items = [
    { id: 'home', label: 'Home' },
    { id: 'solution', label: 'Solution' },
    { id: 'products', label: 'Products' },
    { id: 'customers', label: 'Customers' },
    { id: 'insights', label: 'Insights' },
    { id: 'resources', label: 'Resources' },
  ];
  const onHero = page === 'home' && !scrolled;
  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? 'rgba(246,247,255,0.9)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(10,15,61,0.06)' : '1px solid transparent',
      color: onHero ? '#fff' : 'var(--text)',
      transition: 'all .25s',
    }}>
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '18px 40px', display: 'flex', alignItems: 'center', gap: 40 }}>
        <button onClick={() => onNav('home')} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src={onHero ? window.__resources.logoWhite : window.__resources.logoBlue} style={{ height: 28 }} />
        </button>
        <nav style={{ display: 'flex', gap: 28, marginLeft: 24 }}>
          {items.map(item => (
            <button key={item.id} onClick={() => onNav(item.id)} style={{
              fontSize: 14, fontWeight: 500,
              opacity: page === item.id ? 1 : 0.7,
              padding: '6px 0',
              borderBottom: page === item.id ? '2px solid currentColor' : '2px solid transparent',
            }}>{item.label}</button>
          ))}
        </nav>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
          <button style={{ fontSize: 13, opacity: 0.7 }}>中文</button>
          <button style={{ fontSize: 13, padding: '10px 16px', borderRadius: 10, border: `1px solid ${onHero ? 'rgba(255,255,255,0.25)' : 'rgba(10,15,61,0.15)'}` }}>Sign in</button>
          <button style={{
            fontSize: 13, padding: '10px 18px', borderRadius: 10,
            background: onHero ? 'linear-gradient(135deg, #F4CB7A, #E8B659)' : 'var(--gradient-card)',
            color: onHero ? '#0A0F3D' : '#fff',
            fontWeight: 600,
          }}>Request a demo →</button>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  const cols = [
    { t: 'Pages', items: ['Home', 'Insight', 'Blog'] },
    { t: 'Products', items: ['MediaMonitor', 'RegionRadar', 'IndustryInsight'] },
    { t: 'Company', items: ['About', 'Newsroom', 'Contact'] },
  ];
  return (
    <footer style={{ background: '#0A0F3D', color: '#fff', padding: '80px 40px 40px' }}>
      <div style={{ maxWidth: 1440, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', gap: 40, paddingBottom: 56, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <div>
            <img src={window.__resources.logoWhite} style={{ height: 32, marginBottom: 20 }} />
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', maxWidth: 280, lineHeight: 1.6 }}>
              Intelligently monitor global news and social media. Get the insights you need on brands, competitors, industries and markets.
            </p>
            <div style={{ marginTop: 28, display: 'flex', gap: 10 }}>
              {[
                { label: 'YouTube', icon: <svg width="16" height="12" viewBox="0 0 24 17" fill="currentColor"><path d="M23.5 2.5c-.3-1-1-1.8-2-2C19.6 0 12 0 12 0S4.4 0 2.5.5c-1 .3-1.8 1-2 2C0 4.4 0 8.5 0 8.5s0 4 .5 5.9c.3 1 1 1.8 2 2C4.4 17 12 17 12 17s7.6 0 9.5-.5c1-.3 1.8-1 2-2 .5-2 .5-5.9.5-5.9s0-4.1-.5-6zM9.5 12.2V4.8l6.5 3.7-6.5 3.7z"/></svg> },
                { label: 'LinkedIn', icon: 'in' },
                { label: 'WeChat', icon: <svg width="16" height="14" viewBox="0 0 24 20" fill="currentColor"><path d="M8.5 0C3.8 0 0 3.1 0 7c0 2.2 1.2 4.1 3.1 5.4L2.4 15l3-1.5c1 .3 2 .5 3.1.5.3 0 .7 0 1-.1-.2-.6-.3-1.3-.3-2 0-4.4 4-8 9-8 .3 0 .5 0 .8 0C17.8 1.6 13.5 0 8.5 0zM5.5 5.5c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm6 0c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zM24 12c0-3.3-3.4-6-7.5-6S9 8.7 9 12s3.4 6 7.5 6c.8 0 1.6-.1 2.4-.3l2.5 1.3-.5-2.1C22.9 15.7 24 14 24 12zm-10-1.5c-.5 0-.8-.4-.8-.8s.4-.8.8-.8.8.4.8.8-.3.8-.8.8zm5 0c-.5 0-.8-.4-.8-.8s.4-.8.8-.8.8.4.8.8-.3.8-.8.8z"/></svg> },
              ].map((s, i) => (
                <button key={i} title={s.label} style={{
                  width: 36, height: 36, borderRadius: 8,
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.75)',
                  cursor: 'pointer',
                }}>{s.icon}</button>
              ))}
            </div>
          </div>
          {cols.map((c, i) => (
            <div key={i}>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', letterSpacing: '.12em', marginBottom: 18, fontWeight: 600 }}>{c.t.toUpperCase()}</div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {c.items.map((it, j) => (
                  <li key={j} style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }}>{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 28, fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: '.08em', flexWrap: 'wrap', gap: 16 }}>
          <span>© 2026 Supinfor Intelligence Ltd.</span>
          <span>SOC 2 TYPE II · ISO 27001 · GDPR READY</span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { TopBar, Footer });
