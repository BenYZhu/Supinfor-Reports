// Sections: Features, Use Cases, Testimonials, CTA
const { useState: uS } = React;

function ClientStrip() {
  const list = [...window.CLIENTS, ...window.CLIENTS];
  return (
    <section style={{ padding: '56px 0', background: '#fff', borderBottom: '1px solid rgba(10,15,61,0.06)' }}>
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 40px', marginBottom: 28, textAlign: 'center' }}>
        <div style={{ fontSize: 12, color: 'var(--text-muted)', letterSpacing: '.12em', fontWeight: 500 }}>
          TRUSTED BY GOVERNMENTS, GLOBAL ENTERPRISES AND FORTUNE 500 BRANDS
        </div>
      </div>
      <div style={{ overflow: 'hidden', maskImage: 'linear-gradient(90deg, transparent, #000 15%, #000 85%, transparent)', WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 15%, #000 85%, transparent)' }}>
        <div style={{ display: 'flex', gap: 64, whiteSpace: 'nowrap', animation: 'scroll-x 40s linear infinite' }}>
          {list.map((c, i) => (
            <span key={i} style={{ fontSize: 22, fontWeight: 600, color: 'var(--text)', opacity: 0.5, flexShrink: 0 }}>{c}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section style={{ padding: '120px 40px', background: 'linear-gradient(180deg, #fff, var(--paper))' }}>
      <div style={{ maxWidth: 1440, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, marginBottom: 64, alignItems: 'end' }}>
          <div>
            <window.Pill variant="outline" icon="●" style={{ marginBottom: 24 }}>PLATFORM CAPABILITIES</window.Pill>
            <h2 style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.05 }}>
              Six capabilities.<br />
              <span style={{ background: 'linear-gradient(135deg, #3D4EE8, #5B6CF9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>One intelligence engine.</span>
            </h2>
          </div>
          <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: 480 }}>
            Every product on the Supinfor platform shares the same underlying engine. You can license a single module or scale to the full suite without re-onboarding.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {window.FEATURES.map((f, i) => (
            <div key={i} style={{
              padding: 32, borderRadius: 20,
              background: '#fff',
              border: '1px solid rgba(10,15,61,0.06)',
              boxShadow: '0 4px 20px -4px rgba(10,15,61,0.04)',
              transition: 'all .25s',
              cursor: 'default',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 20px 40px -10px rgba(61,78,232,0.15)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px -4px rgba(10,15,61,0.04)'; }}
            >
              <div style={{
                width: 48, height: 48, borderRadius: 12,
                background: 'var(--gradient-card)',
                color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 20, marginBottom: 20,
                boxShadow: '0 8px 20px -6px rgba(61,78,232,0.4)',
              }}>{f.icon}</div>
              <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 10, letterSpacing: '-0.01em' }}>{f.title}</h3>
              <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function UseCasesSection() {
  const [active, setActive] = uS('strategy');
  const use = window.USE_CASES.find(u => u.id === active);
  const matchedProducts = use.products.map(pid => window.PRODUCTS.find(p => p.id === pid));
  const RI = {
    strategy: (s=24) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/></svg>,
    research:  (s=24) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>,
    comms:     (s=24) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
    marketing: (s=24) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>,
    risk:      (s=24) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9,12 11,14 15,10"/></svg>,
    gov:       (s=24) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="22" x2="21" y2="22"/><line x1="6" y1="18" x2="6" y2="11"/><line x1="10" y1="18" x2="10" y2="11"/><line x1="14" y1="18" x2="14" y2="11"/><line x1="18" y1="18" x2="18" y2="11"/><polygon points="12,2 20,7 4,7"/></svg>,
  };
  return (
    <section style={{
      padding: '120px 40px',
      background: 'var(--gradient-hero)',
      color: '#fff', position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', top: '20%', right: -100, width: 500, height: 500, background: 'radial-gradient(circle, rgba(232,182,89,0.15), transparent 60%)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 1440, margin: '0 auto', position: 'relative' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <window.Pill variant="light" icon="◈" style={{ marginBottom: 20 }}>WHO WE SERVE</window.Pill>
          <h2 style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.05 }}>
            Intelligence for every<br />
            <span style={{ background: 'linear-gradient(135deg, #F4CB7A, #E8B659)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>decision-maker.</span>
          </h2>
        </div>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 40 }}>
          {window.USE_CASES.map(u => {
            const isActive = u.id === active;
            return (
              <button key={u.id} onClick={() => setActive(u.id)} style={{
                padding: '14px 18px', borderRadius: 12, minWidth: 110,
                background: isActive ? 'linear-gradient(135deg, #F4CB7A, #E8B659)' : 'rgba(255,255,255,0.05)',
                color: isActive ? '#0A0F3D' : '#fff',
                border: isActive ? 'none' : '1px solid rgba(255,255,255,0.15)',
                fontSize: 13, fontWeight: 600,
                transition: 'all .2s',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
              }}>
                <span style={{ opacity: isActive ? 1 : 0.6 }}>{RI[u.id] && RI[u.id]()}</span>
                <span>{u.label}</span>
              </button>
            );
          })}
        </div>
        {(() => {
          const PHOTOS = {
            strategy: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=700&q=80&auto=format&fit=crop',
            research:  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&q=80&auto=format&fit=crop',
            comms:     'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=700&q=80&auto=format&fit=crop',
            marketing: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&q=80&auto=format&fit=crop',
            risk:      'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=700&q=80&auto=format&fit=crop',
            gov:       'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=700&q=80&auto=format&fit=crop',
          };
          return (
            <window.GlossyCard variant="deep" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr' }}>
                {/* Photo panel */}
                <div style={{ position: 'relative', minHeight: 440 }}>
                  <div style={{
                    position: 'absolute', inset: 0,
                    backgroundImage: `url(${PHOTOS[use.id]})`,
                    backgroundSize: 'cover', backgroundPosition: 'center',
                  }} />
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to right, rgba(8,12,42,0.55) 0%, rgba(8,12,42,0.15) 100%)',
                  }} />
                  <div style={{ position: 'absolute', bottom: 28, left: 24 }}>
                    <div style={{ width: 48, height: 48, borderRadius: 14, background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', marginBottom: 10 }}>
                      {RI[use.id] && RI[use.id](22)}
                    </div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.75)', letterSpacing: '.1em', fontWeight: 600 }}>{use.label.toUpperCase()}</div>
                  </div>
                </div>
                {/* Content panel */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 40, padding: 48, alignItems: 'start' }}>
                  <div>
                    <div style={{ fontSize: 11, color: '#E8B659', letterSpacing: '.1em', marginBottom: 14 }}>{use.label.toUpperCase()}</div>
                    <h3 style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 18 }}>
                      {use.headline}
                    </h3>
                    <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.72)', lineHeight: 1.65 }}>{use.desc}</p>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: '.1em', marginBottom: 14 }}>RECOMMENDED PRODUCTS</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                      {matchedProducts.map((p, i) => (
                        <div key={i} style={{
                          padding: 18, borderRadius: 12,
                          background: 'rgba(255,255,255,0.06)',
                          border: '1px solid rgba(255,255,255,0.12)',
                          display: 'flex', alignItems: 'center', gap: 14,
                        }}>
                          <div style={{
                            width: 40, height: 40, borderRadius: 10,
                            background: 'linear-gradient(135deg, #F4CB7A, #E8B659)',
                            color: '#0A0F3D',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 17, fontWeight: 700, flexShrink: 0,
                          }}>{p.name[0]}</div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 14, fontWeight: 600 }}>{p.name}</div>
                            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.58)', marginTop: 3, lineHeight: 1.45 }}>{(use.productNotes && use.productNotes[p.id]) || p.tagline}</div>
                          </div>
                          <span style={{ fontSize: 16, color: '#E8B659', flexShrink: 0 }}>→</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </window.GlossyCard>
          );
        })()}
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section style={{ padding: '120px 40px', background: 'var(--paper)' }}>
      <div style={{ maxWidth: 1440, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <window.Pill variant="outline" icon="✦" style={{ marginBottom: 20 }}>IN PRACTICE</window.Pill>
          <h2 style={{ fontSize: 'clamp(40px, 5vw, 60px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.05 }}>
            What our clients are saying.
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {window.TESTIMONIALS.map((t, i) => (
            <div key={i} style={{
              padding: 32, borderRadius: 20,
              background: '#fff',
              boxShadow: '0 4px 20px -4px rgba(10,15,61,0.06)',
              border: '1px solid rgba(10,15,61,0.06)',
              display: 'flex', flexDirection: 'column',
            }}>
              <div style={{ fontSize: 36, color: t.color, fontWeight: 700, lineHeight: 1, marginBottom: 12 }}>"</div>
              <p style={{ fontSize: 16, lineHeight: 1.55, color: 'var(--text)', marginBottom: 24, flex: 1 }}>{t.quote}</p>
              <div style={{ paddingTop: 20, borderTop: '1px solid rgba(10,15,61,0.08)' }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{t.who}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{t.org}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AIQuestionDesk() {
  const [q, setQ] = uS('How is the EV battery supply chain repositioning in Q2?');
  const [loading, setLoading] = uS(false);
  const [answer, setAnswer] = uS(null);
  const presets = [
    'How is the EV battery supply chain repositioning in Q2?',
    'Which regulators are most active on AI in SEA this month?',
    'Summarize sentiment on our brand across Indonesia in the last 30 days.',
  ];
  const ask = () => {
    setLoading(true);
    setTimeout(() => {
      setAnswer({
        summary: 'Across 180+ outlets and 12 regulatory feeds, three repositioning patterns are emerging: Chinese cathode makers are securing LATAM lithium offtakes, Korean cell producers are accelerating US capacity, and Japanese OEMs are signaling solid-state pilots.',
        sources: ['Nikkei Asia · Apr 18', 'Reuters · Apr 19', 'Caixin · Apr 21', 'S&P Global Commodity Insights · Apr 20'],
      });
      setLoading(false);
    }, 900);
  };
  return (
    <section style={{ padding: '120px 40px', background: '#fff' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <window.Pill variant="gold" icon="✦" style={{ marginBottom: 20 }}>2026 NEW · AI QUESTION DESK</window.Pill>
          <h2 style={{ fontSize: 'clamp(40px, 5vw, 60px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 16 }}>
            Ask. Get cited answers.<br />
            <span style={{ background: 'linear-gradient(135deg, #3D4EE8, #5B6CF9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>In under three seconds.</span>
          </h2>
          <p style={{ fontSize: 17, color: 'var(--text-muted)', maxWidth: 640, margin: '0 auto' }}>
            Your intelligence team's new co-pilot. Ask any question in natural language across every knowledge base you have licensed.
          </p>
        </div>
        <window.GlossyCard variant="white" style={{ padding: 36, boxShadow: '0 30px 80px -20px rgba(10,15,61,0.15)' }}>
          <div style={{
            display: 'flex', gap: 10, padding: '16px 20px',
            borderRadius: 14, background: 'var(--paper)', marginBottom: 20,
            border: '1px solid rgba(10,15,61,0.08)',
          }}>
            <span style={{ fontSize: 20, color: '#5B6CF9' }}>✦</span>
            <input value={q} onChange={e => setQ(e.target.value)} style={{
              flex: 1, border: 'none', background: 'transparent', outline: 'none',
              fontSize: 16, fontFamily: 'var(--sans)', color: 'var(--text)',
            }} />
            <button onClick={ask} style={{
              padding: '10px 20px', borderRadius: 10,
              background: 'var(--gradient-card)', color: '#fff',
              fontWeight: 600, fontSize: 14,
            }}>{loading ? 'Analyzing…' : 'Ask ↵'}</button>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
            {presets.map((p, i) => (
              <button key={i} onClick={() => { setQ(p); setAnswer(null); }} style={{
                fontSize: 12, padding: '6px 12px', borderRadius: 999,
                background: 'var(--paper)', border: '1px solid rgba(10,15,61,0.08)',
                color: 'var(--text-soft)',
              }}>{p.substring(0, 48)}…</button>
            ))}
          </div>
          {answer && (
            <div style={{
              padding: 24, borderRadius: 14,
              background: 'linear-gradient(135deg, rgba(61,78,232,0.04), rgba(232,182,89,0.04))',
              border: '1px solid rgba(61,78,232,0.12)',
              animation: 'fadeUp .4s',
            }}>
              <div style={{ fontSize: 11, color: '#5B6CF9', letterSpacing: '.1em', marginBottom: 10, fontWeight: 600 }}>✦ SUPINFOR AI · SYNTHESIS</div>
              <p style={{ fontSize: 15, lineHeight: 1.65, marginBottom: 16 }}>{answer.summary}</p>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', letterSpacing: '.08em', marginBottom: 8 }}>CITED SOURCES</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {answer.sources.map((s, i) => (
                  <span key={i} style={{
                    fontSize: 12, padding: '6px 10px', borderRadius: 6,
                    background: '#fff', border: '1px solid rgba(10,15,61,0.08)',
                  }}>{s}</span>
                ))}
              </div>
            </div>
          )}
        </window.GlossyCard>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section style={{
      padding: '140px 40px',
      background: 'var(--gradient-hero)',
      color: '#fff', position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', top: '-10%', left: '20%', width: 700, height: 700, background: 'radial-gradient(circle, rgba(232,182,89,0.2), transparent 60%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-30%', right: '10%', width: 600, height: 600, background: 'radial-gradient(circle, rgba(91,108,249,0.25), transparent 60%)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
        <window.Pill variant="gold" icon="◆" style={{ marginBottom: 32 }}>BEGIN YOUR ENGAGEMENT</window.Pill>
        <h2 style={{ fontSize: 'clamp(56px, 7vw, 96px)', fontWeight: 700, letterSpacing: '-0.035em', lineHeight: 0.98, marginBottom: 32 }}>
          Ready to see<br />
          <span style={{ background: 'linear-gradient(135deg, #F4CB7A, #E8B659 50%, #D4DAFF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            what Supinfor sees?
          </span>
        </h2>
        <p style={{ fontSize: 18, maxWidth: 640, margin: '0 auto 48px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.6 }}>
          Book a 30-minute demo with a senior analyst. We will show you the exact product modules that would serve your mandate.
        </p>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 56 }}>
          <button style={{
            background: 'linear-gradient(135deg, #F4CB7A, #E8B659)',
            color: '#0A0F3D',
            padding: '18px 32px', borderRadius: 12,
            fontSize: 16, fontWeight: 600,
            boxShadow: '0 20px 40px -10px rgba(232,182,89,0.4)',
          }}>Request a demo →</button>
          <button style={{
            background: 'rgba(255,255,255,0.08)',
            color: '#fff',
            padding: '18px 28px', borderRadius: 12,
            fontSize: 16, fontWeight: 500,
            border: '1px solid rgba(255,255,255,0.2)',
          }}>Talk to sales →</button>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 40, fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: '.12em', flexWrap: 'wrap' }}>
          <span>30-min tailored demo</span>
          <span>Dedicated analyst assigned</span>
          <span>Live platform walkthrough</span>
          <span>No commitment required</span>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { ClientStrip, FeaturesSection, UseCasesSection, TestimonialsSection, AIQuestionDesk, CTASection });
