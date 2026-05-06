// Tweaks panel + App shell
const { useState: uA, useEffect: eA } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accentHue": "gold",
  "heroVariant": "gradient",
  "density": "comfortable"
}/*EDITMODE-END*/;

function Tweaks({ state, setState }) {
  const [open, setOpen] = uA(false);
  eA(() => {
    const handler = (e) => {
      if (e.data?.type === '__activate_edit_mode') setOpen(true);
      if (e.data?.type === '__deactivate_edit_mode') setOpen(false);
    };
    window.addEventListener('message', handler);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', handler);
  }, []);
  const set = (k, v) => {
    const next = { ...state, [k]: v };
    setState(next);
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { [k]: v } }, '*');
  };
  if (!open) return null;
  return (
    <div style={{
      position: 'fixed', bottom: 24, right: 24, zIndex: 200,
      width: 280, padding: 20, borderRadius: 16,
      background: '#fff',
      boxShadow: '0 20px 60px -10px rgba(10,15,61,0.2)',
      border: '1px solid rgba(10,15,61,0.08)',
    }}>
      <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>Tweaks</div>
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 8, letterSpacing: '.08em' }}>ACCENT</div>
        <div style={{ display: 'flex', gap: 6 }}>
          {['gold','blue','mono'].map(o => (
            <button key={o} onClick={() => set('accentHue', o)} style={{
              flex: 1, padding: '8px 10px', borderRadius: 8, fontSize: 12,
              background: state.accentHue === o ? 'var(--gradient-card)' : 'var(--paper)',
              color: state.accentHue === o ? '#fff' : 'var(--text)',
              textTransform: 'capitalize',
            }}>{o}</button>
          ))}
        </div>
      </div>
      <div>
        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 8, letterSpacing: '.08em' }}>DENSITY</div>
        <div style={{ display: 'flex', gap: 6 }}>
          {['compact','comfortable','spacious'].map(o => (
            <button key={o} onClick={() => set('density', o)} style={{
              flex: 1, padding: '8px 10px', borderRadius: 8, fontSize: 11,
              background: state.density === o ? 'var(--gradient-card)' : 'var(--paper)',
              color: state.density === o ? '#fff' : 'var(--text)',
              textTransform: 'capitalize',
            }}>{o}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

function App() {
  const [page, setPage] = uA('home');
  const [tweaks, setTweaks] = uA(TWEAK_DEFAULTS);

  eA(() => {
    if (tweaks.accentHue === 'blue') {
      document.documentElement.style.setProperty('--gold', '#5B6CF9');
      document.documentElement.style.setProperty('--gold-bright', '#7B8BFF');
    } else if (tweaks.accentHue === 'mono') {
      document.documentElement.style.setProperty('--gold', '#D4DAFF');
      document.documentElement.style.setProperty('--gold-bright', '#EEF0FF');
    } else {
      document.documentElement.style.setProperty('--gold', '#E8B659');
      document.documentElement.style.setProperty('--gold-bright', '#F4CB7A');
    }
  }, [tweaks.accentHue]);

  return (
    <>
      <window.TopBar page={page} onNav={setPage} />
      <window.Hero />
      <window.DashboardShowcase />
      <window.ProductsSection />
      <window.DataVizShowcase />
      <window.UseCasesSection />
      <window.AIQuestionDesk />
      <window.TestimonialsSection />
      <window.CTASection />
      <window.Footer />
      <Tweaks state={tweaks} setState={setTweaks} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
