// Combined capabilities showcase with interactive feature selector
const { useState: uSh } = React;

function TagsViz() {
  const tags = [
    { label: 'Risk & Compliance', color: '#E8B659' },
    { label: 'New Product Launch', color: '#5B6CF9' },
    { label: 'Executive Change', color: '#7B8BFF' },
    { label: 'Market Expansion', color: '#E8B659' },
    { label: 'Policy Update', color: '#5B6CF9' },
    { label: 'Partnership', color: '#7B8BFF' },
    { label: 'Financial Result', color: '#E8B659' },
    { label: 'Crisis Event', color: '#FF8A80' },
    { label: 'R&D Milestone', color: '#5B6CF9' },
  ];
  return (
    <div style={{ width: '100%' }}>
      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: '.1em', marginBottom: 12 }}>12 DOMAINS · 100+ CUSTOM TAGS</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
        {tags.map((t, i) => (
          <span key={i} style={{
            padding: '6px 12px', borderRadius: 999,
            background: 'rgba(255,255,255,0.08)',
            border: `1px solid ${t.color}55`,
            color: t.color,
            fontSize: 12, fontWeight: 500,
          }}>{t.label}</span>
        ))}
      </div>
      <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 14, padding: 16, border: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 10, letterSpacing: '.08em' }}>ACTIVE FILTERS</div>
        {[
          { domain: 'Industry', tag: 'Automotive Manufacturing', count: 342 },
          { domain: 'Region', tag: 'Southeast Asia', count: 189 },
          { domain: 'Event Type', tag: 'Risk & Compliance', count: 67 },
        ].map((row, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 0', borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
            <div>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginRight: 8 }}>{row.domain}</span>
              <span style={{ fontSize: 13, color: '#fff', fontWeight: 500 }}>{row.tag}</span>
            </div>
            <span style={{ fontSize: 13, color: '#E8B659', fontWeight: 600 }}>{row.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReportViz() {
  return (
    <div style={{ width: '100%' }}>
      <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 14, padding: 20, border: '1px solid rgba(255,255,255,0.1)', marginBottom: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <div style={{ fontSize: 13, color: '#E8B659', fontWeight: 600 }}>◆ Weekly Intelligence Report</div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>Generated in 5 min</div>
        </div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', lineHeight: 1.65, marginBottom: 12 }}>
          Across 180+ outlets and 12 regulatory feeds, three repositioning patterns are emerging in the EV sector this week...
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {['Reuters', 'Nikkei Asia', 'S&P Global', '+18 more'].map((s, i) => (
            <span key={i} style={{ fontSize: 11, padding: '4px 8px', borderRadius: 6, background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)' }}>{s}</span>
          ))}
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {[
          { label: 'Daily Briefs', value: '50+', sub: 'insights / day' },
          { label: 'Weekly Reports', value: '52', sub: 'per year' },
          { label: 'Auto-Generated', value: '<5 min', sub: 'via AI agents' },
          { label: 'Report Formats', value: '4', sub: 'daily · weekly · monthly · ad-hoc' },
        ].map((s, i) => (
          <div key={i} style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 12, padding: '14px 16px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}>{s.label}</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: '#fff' }}>{s.value}</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>{s.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AIViz() {
  return (
    <div style={{ width: '100%' }}>
      <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 14, padding: '14px 16px', border: '1px solid rgba(255,255,255,0.15)', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 16, color: '#5B6CF9', flexShrink: 0 }}>✦</span>
        <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)' }}>How is the EV battery supply chain repositioning in Q2?</span>
      </div>
      <div style={{ background: 'rgba(61,78,232,0.15)', borderRadius: 14, padding: 18, border: '1px solid rgba(91,108,249,0.3)', marginBottom: 12 }}>
        <div style={{ fontSize: 11, color: '#7B8BFF', letterSpacing: '.1em', marginBottom: 8, fontWeight: 600 }}>✦ AI SYNTHESIS</div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', lineHeight: 1.65 }}>
          Three repositioning patterns are emerging: Chinese cathode makers are securing LATAM lithium offtakes, Korean cell producers are accelerating US capacity, and Japanese OEMs are signaling solid-state pilots.
        </div>
      </div>
      <div>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', letterSpacing: '.08em', marginBottom: 8 }}>CITED SOURCES</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {['Nikkei Asia · Apr 18', 'Reuters · Apr 19', 'Caixin · Apr 21', 'S&P Global · Apr 20'].map((s, i) => (
            <span key={i} style={{ fontSize: 11, padding: '5px 10px', borderRadius: 6, background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.08)' }}>{s}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ConsultViz() {
  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
        {[
          { role: 'Intelligence Expert', focus: 'Strategic analysis & insight delivery', icon: '◈' },
          { role: 'Industry Researcher', focus: 'Sector-specific monitoring & tagging', icon: '▲' },
          { role: 'AI Platform Specialist', focus: 'Custom tag & report configuration', icon: '◆' },
          { role: 'Regional Analyst', focus: 'Country & market deep coverage', icon: '●' },
        ].map((p, i) => (
          <div key={i} style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 12, padding: 16, border: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ fontSize: 18, marginBottom: 8, color: '#E8B659' }}>{p.icon}</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#fff', marginBottom: 4 }}>{p.role}</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', lineHeight: 1.4 }}>{p.focus}</div>
          </div>
        ))}
      </div>
      <div style={{ background: 'rgba(232,182,89,0.1)', borderRadius: 12, padding: '14px 16px', border: '1px solid rgba(232,182,89,0.2)', display: 'flex', gap: 12, alignItems: 'center' }}>
        <span style={{ fontSize: 20, color: '#E8B659', flexShrink: 0 }}>✦</span>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', lineHeight: 1.55 }}>
          Dedicated team responds to ad-hoc requests, optimizes your monitoring setup, and delivers strategic briefings for leadership.
        </div>
      </div>
    </div>
  );
}

function DashboardShowcase() {
  return (
    <section style={{
      padding: '140px 40px',
      background: 'var(--paper)',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: 600, height: 600, background: 'radial-gradient(circle, rgba(91,108,249,0.06), transparent 65%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-20%', left: '-5%', width: 700, height: 700, background: 'radial-gradient(circle, rgba(61,78,232,0.05), transparent 65%)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 1440, margin: '0 auto', position: 'relative' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <window.Pill variant="outline" icon="◆" style={{ marginBottom: 20 }}>THE SUPINFOR SOLUTION</window.Pill>
          <h2 style={{ fontSize: 'clamp(40px, 5vw, 68px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.02, marginBottom: 18, color: 'var(--text)' }}>
            One workspace for<br />
            <span style={{ background: 'linear-gradient(135deg, #3D4EE8, #5B6CF9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              every intelligence question.
            </span>
          </h2>
          <p style={{ fontSize: 17, color: 'var(--text-muted)', maxWidth: 620, margin: '0 auto', lineHeight: 1.55 }}>
            One intelligent workflow for monitoring, analysis, and reporting. Spend less time searching and more time deciding.
          </p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{
            width: '100%', maxWidth: 960,
            borderRadius: 20,
            background: 'rgba(61,78,232,0.04)',
            border: '1px solid rgba(61,78,232,0.12)',
            aspectRatio: '16/9',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            gap: 20, cursor: 'pointer',
            boxShadow: '0 20px 60px -20px rgba(61,78,232,0.15)',
          }}>
            <div style={{
              width: 72, height: 72, borderRadius: 999,
              background: 'linear-gradient(135deg, #3D4EE8, #5B6CF9)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 26, color: '#fff',
              boxShadow: '0 12px 32px -8px rgba(61,78,232,0.45)',
            }}>▶</div>
            <div style={{ fontSize: 15, color: 'var(--text-muted)', fontWeight: 500 }}>See Supinfor in action</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DataVizShowcase() {
  const [tab, setTab] = uSh('monitor');

  const features = [
    { id: 'monitor',   icon: '◈', label: 'Global News & Social Monitor',    desc: 'Live coverage across 100,000+ sources in 100+ countries.',      demo: 'Sentiment attribution by source type and region', viz: 'sentiment' },
    { id: 'tagging',   icon: '▲', label: 'Customizable Data Processing',    desc: 'Define tags once; applied across every source at scale.',        demo: '12 domains · 100+ custom tags · AI-filtered', viz: 'tags' },
    { id: 'reports',   icon: '■', label: 'Intelligent Reports & Analysis',  desc: 'Daily, weekly, and monthly briefs — auto-generated in minutes.', demo: 'AI-generated structured reports with cited sources', viz: 'report' },
    { id: 'ai',        icon: '◆', label: 'Real-Time AI Assistant',          desc: 'Ask any intelligence question; get cited answers instantly.',    demo: 'Natural-language Q&A across your knowledge base', viz: 'ai' },
    { id: 'knowledge', icon: '⬢', label: 'Personalized Knowledge Base',     desc: '3,000+ media profiles, entity graphs, and sector intelligence.', demo: 'EV supply chain — 9 entities, 9 relationships', viz: 'graph' },
    { id: 'consult',   icon: '●', label: 'Professional Consultation',       desc: 'Expert analysts paired with your intelligence workflow.',         demo: 'Dedicated intelligence team for your mandate', viz: 'consult' },
  ];

  const current = features.find(f => f.id === tab);

  const renderViz = () => {
    switch (current.viz) {
      case 'sentiment': return <window.SentimentFlow width={480} height={290} />;
      case 'graph':     return <window.KnowledgeGraph width={480} height={340} />;
      case 'tags':      return <TagsViz />;
      case 'report':    return <ReportViz />;
      case 'ai':        return <AIViz />;
      case 'consult':   return <ConsultViz />;
      default:          return <window.SentimentFlow width={480} height={290} />;
    }
  };

  return (
    <section style={{ padding: '140px 40px', background: '#fff', position: 'relative' }}>
      <div style={{ maxWidth: 1440, margin: '0 auto' }}>

        {/* Section header */}
        <div style={{ textAlign: 'center', marginBottom: 72 }}>
          <window.Pill variant="outline" icon="●" style={{ marginBottom: 24 }}>UNIQUE FEATURES</window.Pill>
          <h2 style={{ fontSize: 'clamp(38px, 4.5vw, 60px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 16 }}>
            Intelligence, reimagined.<br />
            <span style={{ background: 'linear-gradient(135deg, #3D4EE8, #5B6CF9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Built for the AI age.
            </span>
          </h2>
          <p style={{ fontSize: 17, color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: 560, margin: '0 auto' }}>
            Every feature on Supinfor is AI-native. Not a chatbot on top of a legacy platform. This is a new kind of intelligence tool, built from the ground up.
          </p>
        </div>

        {/* Two-column layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 60, alignItems: 'start' }}>

          {/* Left: feature selector tabs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {features.map(f => {
              const active = tab === f.id;
              return (
                <button key={f.id} onClick={() => setTab(f.id)} style={{
                  padding: '16px 20px', borderRadius: 14,
                  background: active ? 'var(--gradient-card)' : 'var(--paper)',
                  color: active ? '#fff' : 'var(--text)',
                  border: active ? 'none' : '1px solid rgba(10,15,61,0.08)',
                  textAlign: 'left',
                  transition: 'all .25s',
                  cursor: 'pointer',
                  boxShadow: active ? '0 14px 30px -10px rgba(61,78,232,0.4)' : 'none',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{
                      width: 36, height: 36, borderRadius: 10,
                      background: active ? 'rgba(255,255,255,0.15)' : '#fff',
                      display: 'grid', placeItems: 'center',
                      fontSize: 16, flexShrink: 0,
                    }}>{f.icon}</span>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 600 }}>{f.label}</div>
                      <div style={{ fontSize: 12, opacity: active ? 0.8 : 0.6, marginTop: 2 }}>{f.desc}</div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: visualization panel */}
          <div style={{
            padding: 32,
            borderRadius: 24,
            background: 'var(--gradient-hero)',
            position: 'sticky',
            top: 100,
            overflow: 'hidden',
            minHeight: 480,
            boxShadow: '0 30px 80px -20px rgba(10,15,61,0.3)',
          }}>
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: 'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)',
              backgroundSize: '20px 20px',
              opacity: 0.6,
            }} />
            <div style={{ position: 'relative' }}>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: '.12em', marginBottom: 6 }}>LIVE DEMO</div>
              <div style={{ fontSize: 15, color: '#fff', fontWeight: 600, marginBottom: 20 }}>{current.demo}</div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                {renderViz()}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

Object.assign(window, { DashboardShowcase, DataVizShowcase });
