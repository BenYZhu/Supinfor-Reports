// Three-product showcase section
const { useState: uP } = React;

function ProductsSection() {
  const [active, setActive] = uP('media');
  const product = window.PRODUCTS.find(p => p.id === active);

  return (
    <section style={{ padding: '120px 40px', background: 'var(--gradient-hero)', position: 'relative', color: '#fff' }}>
      <div style={{ maxWidth: 1440, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <window.Pill variant="light" icon="◆" style={{ marginBottom: 20 }}>THREE PRODUCTS · ONE PLATFORM</window.Pill>
          <h2 style={{
            fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 700, letterSpacing: '-0.03em',
            lineHeight: 1.05, marginBottom: 16,
          }}>
            Media, Region, Industry,<br />
            <span style={{
              background: 'linear-gradient(135deg, #F4CB7A, #E8B659)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>one intelligence platform.</span>
          </h2>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.7)', maxWidth: 640, margin: '0 auto' }}>
            Monitor what matters, research what's changing, track what's next — all from one platform.
          </p>
        </div>

        {/* Product tabs */}
        <div style={{
          display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap',
          marginBottom: 40,
        }}>
          {window.PRODUCTS.map(p => {
            const isActive = p.id === active;
            return (
              <button key={p.id} onClick={() => setActive(p.id)} style={{
                padding: '14px 28px',
                borderRadius: 12,
                background: isActive ? 'linear-gradient(135deg, #F4CB7A, #E8B659)' : 'rgba(255,255,255,0.06)',
                color: isActive ? '#0A0F3D' : '#fff',
                fontSize: 15, fontWeight: 600,
                boxShadow: isActive ? '0 10px 30px -10px rgba(244,203,122,0.45)' : 'none',
                border: isActive ? 'none' : '1px solid rgba(255,255,255,0.14)',
                display: 'flex', alignItems: 'center', gap: 10,
                transition: 'all .25s',
              }}>
                <span style={{ fontSize: 12, opacity: 0.7, fontFamily: 'var(--mono)' }}>0{window.PRODUCTS.indexOf(p) + 1}</span>
                <span>{p.name}</span>
              </button>
            );
          })}
        </div>

        {/* Product panel — light card */}
        <div style={{
          background: '#fff', borderRadius: 20, overflow: 'hidden',
          boxShadow: '0 4px 6px -1px rgba(10,15,61,0.06), 0 24px 60px -12px rgba(10,15,61,0.18)',
          border: '1px solid rgba(10,15,61,0.07)',
          minHeight: 520,
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '0.85fr 1.35fr', alignItems: 'stretch' }}>
            {/* Left: product info */}
            <div style={{ padding: '52px 48px', borderRight: '1px solid rgba(10,15,61,0.07)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 22 }}>
                <div style={{ width: 28, height: 28, borderRadius: 7, background: 'linear-gradient(135deg, #3D4EE8, #5B6CF9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src={window.__resources.logoWhite} style={{ height: 14 }} />
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.06em', color: '#3D4EE8' }}>{product.name.toUpperCase()}</span>
              </div>
              <h3 style={{
                fontSize: 42, fontWeight: 700, letterSpacing: '-0.03em',
                lineHeight: 1.05, marginBottom: 8, color: '#0A0F3D',
              }}>{product.tagline}</h3>
              <div style={{ fontSize: 16, color: '#5B6CF9', fontWeight: 600, marginBottom: 22 }}>{product.name}</div>
              <p style={{ fontSize: 15, lineHeight: 1.65, color: '#475569', marginBottom: 28, maxWidth: 420 }}>{product.desc}</p>

              <div style={{ marginBottom: 26 }}>
                <div style={{ fontSize: 10, color: '#94A3B8', letterSpacing: '.1em', marginBottom: 10 }}>BUILT FOR</div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {product.clients.map((c, i) => (
                    <span key={i} style={{
                      fontSize: 11, padding: '5px 12px', borderRadius: 20,
                      background: '#EEF2FF', color: '#3D4EE8', fontWeight: 500,
                    }}>{c}</span>
                  ))}
                </div>
              </div>

              <div>
                <div style={{ fontSize: 10, color: '#94A3B8', letterSpacing: '.1em', marginBottom: 14 }}>✦ HIGHLIGHTS</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  {product.highlights.map((h, i) => (
                    <div key={i} style={{
                      padding: 14, borderRadius: 10,
                      background: '#F8FAFF',
                      border: '1px solid #E2E8F5',
                    }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: '#3D4EE8', marginBottom: 5 }}>{h.k}</div>
                      <div style={{ fontSize: 11, color: '#64748B', lineHeight: 1.45 }}>{h.v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: screen mockup */}
            <div style={{
              padding: '36px 40px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: '#F1F5FB',
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(ellipse 80% 70% at 60% 50%, rgba(91,108,249,0.08), transparent 70%)',
              }} />
              <div style={{ position: 'relative', width: '100%' }}>
                {active === 'industry' && <IndustryDashboard />}
                {active === 'region' && <RegionDashboard />}
                {active === 'media' && <MediaDashboard />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function IndustryDashboard() {
  const containerRef = React.useRef(null);
  const [dims, setDims] = React.useState({ w: 700, h: 480 });
  React.useEffect(() => {
    if (containerRef.current) {
      const w = containerRef.current.offsetWidth;
      setDims({ w, h: Math.round(w * 0.65) });
    }
  }, []);
  const iframeScale = dims.w / 1300;
  return (
    <div ref={containerRef} style={{
      width: '100%', borderRadius: 14,
      background: '#0f1923',
      boxShadow: '0 8px 32px -8px rgba(10,15,61,0.22), 0 2px 8px -2px rgba(10,15,61,0.08)',
      overflow: 'hidden',
      position: 'relative',
      height: dims.h,
    }}>
      <iframe
        src="industry-mockup.html"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: Math.round(dims.w / iframeScale),
          height: Math.round(dims.h / iframeScale),
          border: 'none',
          transform: 'scale(' + iframeScale + ')',
          transformOrigin: 'top left',
          pointerEvents: 'none',
        }}
        title="IndustryInsight Mockup"
      />
    </div>
  );
}
function RegionDashboard() {
  const containerRef = React.useRef(null);
  const [dims, setDims] = React.useState({ w: 700, h: 480 });
  React.useEffect(() => {
    if (containerRef.current) {
      const w = containerRef.current.offsetWidth;
      setDims({ w, h: Math.round(w * 0.62) });
    }
  }, []);
  const iframeScale = dims.w / 1200;
  return (
    <div ref={containerRef} style={{
      width: '100%', borderRadius: 14,
      background: '#080c18',
      boxShadow: '0 8px 32px -8px rgba(10,15,61,0.22), 0 2px 8px -2px rgba(10,15,61,0.08)',
      overflow: 'hidden',
      position: 'relative',
      height: dims.h,
    }}>
      <iframe
        src="region-radar-mockup.html"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: Math.round(dims.w / iframeScale),
          height: Math.round(dims.h / iframeScale),
          border: 'none',
          transform: 'scale(' + iframeScale + ')',
          transformOrigin: 'top left',
          pointerEvents: 'none',
        }}
        title="RegionRadar Mockup"
      />
    </div>
  );
}
function MediaDashboard() {
  React.useEffect(() => {
    if (!document.getElementById('mm-kf')) {
      const s = document.createElement('style');
      s.id = 'mm-kf';
      s.textContent = '@keyframes mmFU{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}@keyframes mmFD{0%,100%{transform:translateY(0)}50%{transform:translateY(6px)}}.mm-up{animation:mmFU 6s ease-in-out infinite}.mm-upa{animation:mmFU 5s ease-in-out infinite}.mm-upb{animation:mmFU 6.5s ease-in-out infinite}.mm-dn{animation:mmFD 7s ease-in-out infinite}.mm-dna{animation:mmFD 5.5s ease-in-out infinite}.mm-dnb{animation:mmFD 5.8s ease-in-out infinite .2s}';
      document.head.appendChild(s);
    }
  }, []);

  const scale = 0.8;
  const W = 1400, H = 920;
  const containerW = Math.round(W * scale);
  const containerH = Math.round(H * scale);

  const fp = (pos, extra) => Object.assign({
    position: 'absolute', background: '#fff', borderRadius: 12,
    boxShadow: '0 12px 40px rgba(0,0,0,.12)', border: '1px solid rgba(0,0,0,.05)',
    overflow: 'hidden',
  }, pos, extra);

  const phdr = { padding: '10px 14px 6px', display: 'flex', alignItems: 'center', gap: 6 };
  const h4s = { fontSize: 11, fontWeight: 700, color: '#374151', margin: 0 };
  const pbdy = { padding: '6px 14px 12px' };
  const tag = (bg, fg) => ({ fontSize: 9, padding: '2px 6px', borderRadius: 4, fontWeight: 600, background: bg, color: fg });

  return (
    <div style={{ position: 'relative', width: '100%', height: containerH, overflow: 'hidden', borderRadius: 12, margin: '0 auto' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: W, height: H, transform: `scale(${scale})`, transformOrigin: 'top left', background: 'linear-gradient(160deg,#f0f4ff 0%,#fafbff 40%,#f5f0ff 100%)' }}>

        {/* Decorative blobs */}
        <div style={{ position:'absolute', width:400, height:400, background:'#2563EB', borderRadius:'50%', opacity:.06, top:-100, left:-120, pointerEvents:'none' }} />
        <div style={{ position:'absolute', width:250, height:250, background:'#7C3AED', borderRadius:'50%', opacity:.06, bottom:-60, right:-60, pointerEvents:'none' }} />
        <div style={{ position:'absolute', width:180, height:180, background:'#16A34A', borderRadius:'50%', opacity:.06, top:'50%', right:180, transform:'translateY(-50%)', pointerEvents:'none' }} />

        {/* Connectors */}
        <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none', zIndex:5 }} viewBox="0 0 1400 920" preserveAspectRatio="none">
          {[
            "M 280 180 Q 340 220 380 260", "M 1100 200 Q 1050 240 1000 270",
            "M 290 680 Q 350 620 390 570", "M 1080 720 Q 1030 670 1000 630",
            "M 240 440 Q 300 430 370 400", "M 820 120 Q 860 150 880 200",
            "M 560 750 Q 580 700 600 660", "M 1120 460 Q 1060 460 1010 450",
          ].map((d, i) => <path key={i} d={d} stroke="#BFDBFE" strokeWidth="1.5" strokeDasharray="4 3" opacity=".4" fill="none" />)}
        </svg>

        {/* Panel 1 — Sentiment */}
        <div className="mm-up" style={fp({ top:30, left:20, width:280 })}>
          <div style={phdr}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
            <h4 style={h4s}>Sentiment Analysis</h4>
            <span style={tag('#DCFCE7','#16A34A')}>Live</span>
          </div>
          <div style={pbdy}>
            {[['Positive','62%','#16A34A',62],['Neutral','24%','#9CA3AF',24],['Negative','14%','#DC2626',14]].map(([lbl,val,c,pct])=>(
              <div key={lbl} style={{ display:'flex', alignItems:'center', gap:8, marginBottom:6 }}>
                <span style={{ fontSize:10, color:'#6B7280', width:55, textAlign:'right' }}>{lbl}</span>
                <div style={{ flex:1, height:8, borderRadius:4, background:'#F3F4F6', overflow:'hidden' }}>
                  <div style={{ width:`${pct}%`, height:'100%', borderRadius:4, background:c }} />
                </div>
                <span style={{ fontSize:10, fontWeight:600, width:32, color:c }}>{val}</span>
              </div>
            ))}
            <div style={{ marginTop:10, display:'flex', gap:6, flexWrap:'wrap' }}>
              <span style={{ fontSize:9, padding:'2px 6px', background:'#DCFCE7', color:'#16A34A', borderRadius:4 }}>innovation +18%</span>
              <span style={{ fontSize:9, padding:'2px 6px', background:'#FEE2E2', color:'#DC2626', borderRadius:4 }}>pricing -5%</span>
              <span style={{ fontSize:9, padding:'2px 6px', background:'#DBEAFE', color:'#2563EB', borderRadius:4 }}>reliability +12%</span>
            </div>
          </div>
        </div>

        {/* Panel 2 — AI Summary */}
        <div className="mm-dn" style={fp({ top:60, right:20, width:300 })}>
          <div style={phdr}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
            <h4 style={h4s}>AI Summary</h4>
            <span style={{ display:'inline-flex', alignItems:'center', gap:4, padding:'3px 8px', borderRadius:6, background:'linear-gradient(135deg,#EEF2FF,#F5F3FF)', border:'1px solid #E0E7FF', fontSize:9, fontWeight:700, color:'#7C3AED' }}>⚡ AI Generated</span>
          </div>
          <div style={{ ...pbdy, fontSize:11, lineHeight:1.6, color:'#4B5563' }}>
            This week shows <span style={{ background:'linear-gradient(120deg,#DBEAFE,#EDE9FE)', padding:'1px 4px', borderRadius:3, fontWeight:500, color:'#1F2937' }}>strong positive momentum</span> in SE Asian markets. Coverage from <span style={{ background:'linear-gradient(120deg,#DBEAFE,#EDE9FE)', padding:'1px 4px', borderRadius:3, fontWeight:500, color:'#1F2937' }}>23 major outlets</span> and viral social engagement.
          </div>
        </div>

        {/* Panel 3 — World Map */}
        <div className="mm-dna" style={fp({ bottom:50, left:10, width:300 })}>
          <div style={phdr}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
            <h4 style={h4s}>Global Coverage</h4>
            <span style={tag('#DBEAFE','#2563EB')}>48 countries</span>
          </div>
          <div style={pbdy}>
            <window.WorldMap height={110} highlights={[]} />
            <div style={{ display:'flex', gap:10, marginTop:6 }}>
              {[['High','#DC2626'],['Growing','#EA580C'],['Stable','#2563EB'],['Emerging','#0D9488']].map(([lbl,c])=>(
                <div key={lbl} style={{ display:'flex', alignItems:'center', gap:4, fontSize:9, color:'#6B7280' }}>
                  <div style={{ width:6, height:6, borderRadius:'50%', background:c }} />{lbl}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Panel 4 — Trend */}
        <div className="mm-upb" style={fp({ bottom:30, right:30, width:290 })}>
          <div style={phdr}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
            <h4 style={h4s}>Mention Trend (7 days)</h4>
            <span style={tag('#DCFCE7','#16A34A')}>+23%</span>
          </div>
          <div style={pbdy}>
            <div style={{ height:70, marginTop:4 }}>
              <svg viewBox="0 0 260 70" preserveAspectRatio="none" style={{ width:'100%', height:'100%' }}>
                <defs><linearGradient id="mmTG" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#2563EB" stopOpacity=".4"/><stop offset="100%" stopColor="#2563EB" stopOpacity="0"/></linearGradient></defs>
                <path d="M0 60 L37 48 L74 52 L111 35 L148 28 L185 18 L222 22 L260 10 L260 70 L0 70 Z" fill="url(#mmTG)" opacity=".3"/>
                <path d="M0 60 L37 48 L74 52 L111 35 L148 28 L185 18 L222 22 L260 10" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                {[[0,60],[37,48],[74,52],[111,35],[148,28],[185,18],[222,22]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="3" fill="#2563EB"/>)}
                <circle cx="260" cy="10" r="3.5" fill="#2563EB" stroke="#fff" strokeWidth="2"/>
              </svg>
            </div>
            <div style={{ display:'flex', justifyContent:'space-between', fontSize:9, color:'#9CA3AF', marginTop:4 }}>
              {['Apr 22','Apr 23','Apr 24','Apr 25','Apr 26','Apr 27','Apr 28','Today'].map(d=><span key={d}>{d}</span>)}
            </div>
          </div>
        </div>

        {/* Panel 5 — Viewpoint */}
        <div className="mm-upa" style={fp({ top:290, left:-10, width:260, zIndex:4 })}>
          <div style={phdr}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#EA580C" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            <h4 style={h4s}>Viewpoint Analysis</h4>
          </div>
          <div style={pbdy}>
            {[['#16A34A','👍','Pro','Innovative market intelligence approach'],['#DC2626','⚠️','Con','Enterprise pricing limits emerging market adoption'],['#2563EB','💡','Insight','BI tool integration is key differentiator']].map(([c,ic,tp,tx])=>(
              <div key={tp} style={{ display:'flex', alignItems:'flex-start', gap:8, padding:'6px 8px', background:'#F9FAFB', borderRadius:6, borderLeft:`3px solid ${c}`, marginBottom:6 }}>
                <span style={{ fontSize:12 }}>{ic}</span>
                <span style={{ fontSize:10, color:'#4B5563', lineHeight:1.4 }}><strong style={{ color:'#1F2937' }}>{tp}:</strong> {tx}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Panel 6 — KOL */}
        <div className="mm-dnb" style={fp({ top:10, right:400, width:240, zIndex:4 })}>
          <div style={phdr}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            <h4 style={h4s}>Key Opinion Leaders</h4>
            <span style={tag('#F3E8FF','#7C3AED')}>Top KOLs</span>
          </div>
          <div style={pbdy}>
            {[['TK','TechKaizen','YouTube','1.2M','#3B82F6,#1D4ED8'],['MR','MarketRadar','X','890K','#8B5CF6,#6D28D9'],['AI','AI Insights Daily','Newsletter','340K','#10B981,#059669'],['BN','BizNews Asia','News','520K','#F59E0B,#D97706']].map(([init,name,ch,stat,grad])=>(
              <div key={name} style={{ display:'flex', alignItems:'center', gap:8, marginBottom:8 }}>
                <div style={{ width:28, height:28, borderRadius:'50%', background:`linear-gradient(135deg,${grad})`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:700, color:'#fff', flexShrink:0 }}>{init}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:10, fontWeight:600, color:'#1F2937' }}>{name}</div>
                  <div style={{ fontSize:9, color:'#9CA3AF' }}>{ch}</div>
                </div>
                <div style={{ fontSize:9, fontWeight:600, color:'#2563EB', textAlign:'right' }}>{stat}<small style={{ display:'block', fontWeight:400, color:'#9CA3AF' }}>followers</small></div>
              </div>
            ))}
          </div>
        </div>

        {/* Panel 7 — Word Cloud */}
        <div className="mm-upa" style={fp({ bottom:10, left:400, width:240, zIndex:4 })}>
          <div style={phdr}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0D9488" strokeWidth="2"><path d="M4 7V4h16v3"/><path d="M9 20h6"/><path d="M12 4v16"/></svg>
            <h4 style={h4s}>Trending Keywords</h4>
          </div>
          <div style={pbdy}>
            <div style={{ display:'flex', flexWrap:'wrap', alignItems:'center', justifyContent:'center', gap:'4px 6px' }}>
              {[['AI',20,700,'#2563EB'],['market',14,600,'#374151'],['growth',11,400,'#6B7280'],['intelligence',17,700,'#7C3AED'],['data',10,400,'#9CA3AF'],['innovation',15,600,'#16A34A'],['APAC',13,500,'#EA580C'],['analytics',11,400,'#6B7280'],['monitoring',16,700,'#1E40AF'],['real-time',12,500,'#0D9488'],['competitor',14,600,'#DC2626'],['insights',13,500,'#7C3AED']].map(([w,sz,fw,c])=>(
                <span key={w} style={{ display:'inline-block', fontSize:sz, fontWeight:fw, color:c, lineHeight:1 }}>{w}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Panel 8 — Pie */}
        <div className="mm-dnb" style={fp({ top:330, right:-10, width:220, zIndex:4 })}>
          <div style={phdr}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#EA580C" strokeWidth="2"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>
            <h4 style={h4s}>Source Distribution</h4>
          </div>
          <div style={pbdy}>
            <div style={{ display:'flex', alignItems:'center', gap:12 }}>
              <svg viewBox="0 0 100 100" style={{ width:80, height:80, flexShrink:0 }}>
                <circle cx="50" cy="50" r="40" fill="none" stroke="#2563EB" strokeWidth="20" strokeDasharray="88 163" strokeDashoffset="0" transform="rotate(-90 50 50)"/>
                <circle cx="50" cy="50" r="40" fill="none" stroke="#7C3AED" strokeWidth="20" strokeDasharray="50 201" strokeDashoffset="-88" transform="rotate(-90 50 50)"/>
                <circle cx="50" cy="50" r="40" fill="none" stroke="#16A34A" strokeWidth="20" strokeDasharray="38 213" strokeDashoffset="-138" transform="rotate(-90 50 50)"/>
                <circle cx="50" cy="50" r="40" fill="none" stroke="#EA580C" strokeWidth="20" strokeDasharray="25 226" strokeDashoffset="-176" transform="rotate(-90 50 50)"/>
                <circle cx="50" cy="50" r="40" fill="none" stroke="#0D9488" strokeWidth="20" strokeDasharray="50 201" strokeDashoffset="-201" transform="rotate(-90 50 50)"/>
                <circle cx="50" cy="50" r="28" fill="#fff"/>
                <text x="50" y="48" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1F2937">1,247</text>
                <text x="50" y="58" textAnchor="middle" fontSize="6" fill="#9CA3AF">total mentions</text>
              </svg>
              <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
                {[['#2563EB','News 35%'],['#7C3AED','Social 20%'],['#16A34A','YouTube 15%'],['#EA580C','Forums 10%'],['#0D9488','Blogs 20%']].map(([c,lbl])=>(
                  <div key={lbl} style={{ display:'flex', alignItems:'center', gap:5, fontSize:9, color:'#4B5563' }}>
                    <div style={{ width:8, height:8, borderRadius:2, background:c, flexShrink:0 }} />{lbl}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Central Mock */}
        <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:780, height:520, background:'#fff', borderRadius:20, boxShadow:'0 20px 60px rgba(0,0,0,.15)', overflow:'hidden', border:'1px solid rgba(0,0,0,.06)', zIndex:10 }}>
          {/* Topbar */}
          <div style={{ height:40, background:'#fff', borderBottom:'1px solid #E5E7EB', display:'flex', alignItems:'center', padding:'0 14px', gap:10 }}>
            <div style={{ display:'flex', alignItems:'center', gap:6, fontWeight:700, fontSize:13, color:'#2563EB' }}>
              {window.__resources && window.__resources.logoBlue && <img src={window.__resources.logoBlue} style={{ height:22 }} />}
              Supinfor
            </div>
            <div style={{ display:'flex', gap:2, marginLeft:16 }}>
              {[['Search',true],['Trends',false],['Reports',false],['Explorer',false]].map(([t,a])=>(
                <div key={t} style={{ padding:'4px 10px', fontSize:11, color: a ? '#2563EB' : '#9CA3AF', borderRadius:4, background: a ? '#EFF6FF' : 'transparent', fontWeight: a ? 600 : 400 }}>{t}</div>
              ))}
            </div>
            <div style={{ flex:1 }} />
            <div style={{ display:'flex', gap:4 }}>
              {[1,2,3].map(i=><span key={i} style={{ width:8, height:8, borderRadius:'50%', background:'#E5E7EB', display:'block' }} />)}
            </div>
          </div>
          {/* Body */}
          <div style={{ display:'flex', height:'calc(100% - 40px)' }}>
            {/* Sidebar */}
            <div style={{ width:160, background:'#F9FAFB', borderRight:'1px solid #F3F4F6', padding:'12px 8px' }}>
              <div style={{ fontSize:9, fontWeight:600, color:'#9CA3AF', textTransform:'uppercase', letterSpacing:'.05em', padding:'4px 8px', marginBottom:4 }}>Monitoring</div>
              {[['Product Health',true],['Brand Mentions',false],['Influencers',false]].map(([item,a])=>(
                <div key={item} style={{ display:'flex', alignItems:'center', gap:6, padding:'5px 8px', borderRadius:6, fontSize:11, color: a ? '#2563EB' : '#4B5563', background: a ? '#EFF6FF' : 'transparent', fontWeight: a ? 600 : 400, marginBottom:2 }}>
                  <span style={{ width:6, height:6, borderRadius:'50%', background: a ? '#2563EB' : '#D1D5DB' }} />{item}
                </div>
              ))}
              <div style={{ height:1, background:'#E5E7EB', margin:'8px 4px' }} />
              <div style={{ fontSize:9, fontWeight:600, color:'#9CA3AF', textTransform:'uppercase', letterSpacing:'.05em', padding:'4px 8px', marginBottom:4 }}>Topics</div>
              {[['Brand Awareness','#3B82F6'],['Product Launch','#10B981'],['Customer Feedback','#F59E0B'],['Crisis Watch','#EF4444']].map(([item,c])=>(
                <div key={item} style={{ display:'flex', alignItems:'center', gap:6, padding:'5px 8px', borderRadius:6, fontSize:11, color:'#4B5563', marginBottom:2 }}>
                  <span style={{ width:6, height:6, borderRadius:'50%', background:c }} />{item}
                </div>
              ))}
              <div style={{ height:1, background:'#E5E7EB', margin:'8px 4px' }} />
              <div style={{ fontSize:9, fontWeight:600, color:'#9CA3AF', textTransform:'uppercase', letterSpacing:'.05em', padding:'4px 8px', marginBottom:4 }}>Saved Filters</div>
              {['Japan Market','Social Only'].map(item=>(
                <div key={item} style={{ padding:'5px 8px', fontSize:11, color:'#4B5563' }}>{item}</div>
              ))}
            </div>
            {/* Content */}
            <div style={{ flex:1, padding:12, overflow:'hidden', display:'flex', flexDirection:'column', gap:8 }}>
              <div style={{ display:'flex', alignItems:'center', gap:6, padding:'6px 10px', background:'#fff', border:'1px solid #F3F4F6', borderRadius:8 }}>
                {[['All Media',true],['YouTube',false],['X',false],['News',false]].map(([p,a])=>(
                  <div key={p} style={{ padding:'3px 8px', borderRadius:12, fontSize:10, background: a ? '#2563EB' : '#F3F4F6', color: a ? '#fff' : '#6B7280' }}>{p}</div>
                ))}
                <div style={{ flex:1 }} />
                <div style={{ fontSize:10, color:'#9CA3AF', padding:'3px 8px', border:'1px solid #E5E7EB', borderRadius:6 }}>Apr 21 – Apr 28</div>
              </div>
              <div style={{ flex:1, display:'flex', flexDirection:'column', gap:6, overflow:'hidden' }}>
                {[
                  ['#FEE2E2','#DC2626','新製品レビュー：市場を変える革新的アプローチ','Industry analysts praise the new approach to market intelligence...','pos','Positive'],
                  ['#1a1a1a','#fff','Breaking: Major partnership announced for APAC expansion','Strategic alliance with regional leaders signals aggressive growth plans...','pos','Positive'],
                  ['#F0FDF4','#16A34A','Análise de mercado: concorrência intensifica na região','Market analysis: Competition intensifies in the region as new entrants...','neu','Neutral'],
                  ['#EFF6FF','#1D4ED8','Datenschutzbedenken bei neuer KI-Integration geäußert','Privacy concerns raised regarding new AI integration — regulatory review expected...','neg','Negative'],
                  ['#FEE2E2','#DC2626','用户评价：产品体验超出预期','User review: Product experience exceeds expectations — impressed with real-time analytics...','pos','Positive'],
                ].map(([ibg,ic,title,text,badge,blbl],i)=>(
                  <div key={i} style={{ background:'#fff', border:'1px solid #F3F4F6', borderRadius:8, padding:'10px 12px', display:'flex', gap:10, alignItems:'flex-start' }}>
                    <div style={{ width:28, height:28, borderRadius:6, background:ibg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, fontSize:14, color:ic }}>■</div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontSize:11, fontWeight:600, color:'#1F2937', marginBottom:3, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{title}</div>
                      <div style={{ fontSize:10, color:'#6B7280', lineHeight:1.4, overflow:'hidden', display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical' }}>{text}</div>
                    </div>
                    <div style={{ padding:'2px 6px', borderRadius:4, fontSize:9, fontWeight:600, flexShrink:0, alignSelf:'center', background: badge==='pos'?'#DCFCE7':badge==='neg'?'#FEE2E2':'#F3F4F6', color: badge==='pos'?'#16A34A':badge==='neg'?'#DC2626':'#6B7280' }}>{blbl}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
Object.assign(window, { ProductsSection });
