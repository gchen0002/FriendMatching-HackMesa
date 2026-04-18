function Results({ onNav, saved, toggleSave, answers }) {
  const [filter, setFilter] = React.useState('all');
  const [colleges, setColleges] = React.useState(window.UNIVERSITIES);
  const [loading, setLoading] = React.useState(false);
  const [popupCollege, setPopupCollege] = React.useState(null);
  const [pitch, setPitch] = React.useState(null);

  const openPitch = async (u) => {
    setPopupCollege(u);
    setPitch(null);
    try {
      const res = await fetch('/api/pitch', { method: 'POST', body: JSON.stringify({ name: u.name }) });
      const data = await res.json();
      setPitch(data.pitch || 'Could not load pitch.');
    } catch {
      setPitch('Could not load pitch.');
    }
  };

  React.useEffect(() => {
    async function fetchMatches() {
      setLoading(true);
      try {
        const res = await fetch('/api/match', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ answers, quizDetails: window.QUIZ })
        });
        if (res.ok) {
          const data = await res.json();
          setColleges(data);
          
          // Update the global window.UNIVERSITIES so other screens (like Selection/Friends)
          // use these exact colleges with our custom generated IDs.
          window.UNIVERSITIES = data; 
        } else {
          console.error("Match error", await res.text());
        }
      } catch (err) {
        console.error("Fetch failed", err);
      } finally {
        setLoading(false);
      }
    }
    
    // Only fetch if we actually have some custom answers to process
    if (answers && Object.keys(answers).length > 0) {
      fetchMatches();
    }
  }, [answers]);

  const filters = [
    { id: 'all', label: 'All matches' },
    { id: 'high', label: 'Best fit (90+)' },
    { id: 'small', label: 'Small campus' },
    { id: 'outdoor', label: 'Outdoorsy' },
    { id: 'affordable', label: 'Affordable' },
  ];

  const list = colleges.filter(u => {
    if (filter === 'all') return true;
    if (filter === 'high') return u.score >= 90;
    if (filter === 'small') return u.size.includes('Small');
    if (filter === 'outdoor') return u.tags.some(t => /outdoor|nature|coastal/i.test(t));
    if (filter === 'affordable') return u.band === 'low' || u.band === 'mid';
    return true;
  });

  return (
    <div className="page" data-screen-label="04 Results">
      <Nav route="results" onNav={onNav} />

      <div className="results">
        <div className="results-head">
          <div>
            <span className="eyebrow">Your matches · Based on 8 answers</span>
            <h1>Eight places that could feel like home.</h1>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
            <span className="mono-tag">{saved.length} saved · {list.length} shown</span>
            <button className="btn ghost sm" onClick={() => onNav('quiz')}>Retake quiz</button>
          </div>
        </div>

        <div className="filters">
          {filters.map(f => (
            <button key={f.id} className={'chip ' + (filter === f.id ? 'on' : '')} onClick={() => setFilter(f.id)}>{f.label}</button>
          ))}
        </div>

        {loading ? (
          <div style={{ padding: '60px 0', textAlign: 'center', color: 'var(--ink-2)' }}>
            <div className="mono-tag" style={{ animation: 'blink 1s infinite' }}>Analyzing compatibility...</div>
          </div>
        ) : (
          <div className="result-list">
            {list.map((u, idx) => (
              <div key={u.id} className={'result ' + (saved.includes(u.id) ? 'saved' : '')}>
                <div className="rank">{String(idx+1).padStart(2,'0')}</div>
                {u.imageUrl ? (
                  <div style={{ width: '100%' }}>
                    <img src={u.imageUrl} alt={u.name} style={{ width: '100%', height: 120, objectFit: 'cover', border: '1px solid var(--line)', background: 'var(--paper)', display: 'block' }} />
                  </div>
                ) : (
                  <div style={{ width: '100%' }}>
                    <Placeholder label={u.name.toLowerCase()} height={120} />
                  </div>
                )}
                <div className="info">
                  <h3>{u.name}</h3>
                  <div className="loc">{u.state} · {u.size} · tuition {u.tuition}</div>
                  <div className="why">"{u.why}"</div>
                  <div className="tags">
                    {u.tags.map(t => <span key={t} className="chip">{t}</span>)}
                  </div>
                </div>
                <div className="score">
                  <div className="n">{u.score}<span className="pct">%</span></div>
                  <div className="lab">Match</div>
                  <div className="row">
                    <button className={'icon-btn ' + (saved.includes(u.id) ? 'on' : '')}
                      onClick={() => toggleSave(u.id)}
                      title={saved.includes(u.id) ? 'Saved' : 'Save'}>
                      <Icon.bookmark size={14} fill={saved.includes(u.id) ? 'currentColor' : 'none'}/>
                    </button>
                    <button className="btn sm outline" onClick={() => openPitch(u)}>View Pitch</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{ marginTop: 40, textAlign: 'center' }}>
          <button className="btn" onClick={() => onNav('selection')}>
            I'm ready to select my schools <Icon.arrowR size={14}/>
          </button>
          <div className="mono-tag" style={{ marginTop: 10 }}>Pick 1 to 3 schools to shape your friend matches.</div>
        </div>
      </div>

      {popupCollege && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999 }}>
          <div style={{ background: 'var(--bg)', border: '1px solid var(--line)', borderRadius: 24, padding: 32, maxWidth: 500, width: '90%', position: 'relative' }}>
            <button onClick={() => setPopupCollege(null)} style={{ position: 'absolute', top: 16, right: 16, background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: '50%', width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
            <h2 style={{ marginTop: 0, marginBottom: 8, fontSize: 24 }}>Why {popupCollege.name}?</h2>
            <div style={{ color: 'var(--ink-sec)', marginBottom: 20, fontSize: 13, textTransform: 'uppercase', letterSpacing: 1 }}>Counselor's Pitch</div>
            <div style={{ fontSize: 16, lineHeight: 1.6, minHeight: 80 }}>
              {pitch ? pitch : <div style={{ opacity: 0.5, fontStyle: 'italic' }}>Generating dynamic pitch...</div>}
            </div>
            <div style={{ marginTop: 24 }}>
               <button className="btn" onClick={() => {toggleSave(popupCollege.id); setPopupCollege(null);}}>
                 {saved.includes(popupCollege.id) ? 'Saved to List' : 'Save College'}
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

window.Results = Results;
