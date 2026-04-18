import { useEffect, useState } from 'react';

import { UNIVERSITIES } from './data';
import { Icon, Nav, Placeholder } from './shared';

export default function Results({ onNav, saved, toggleSave, answers, colleges, setColleges }) {
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchMatches() {
      setLoading(true);
      try {
        const res = await fetch('/api/match', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ answers }),
        });

        if (!res.ok) {
          console.error('Match error', await res.text());
          return;
        }

        const data = await res.json();
        setColleges(data);
      } catch (error) {
        console.error('Fetch failed', error);
      } finally {
        setLoading(false);
      }
    }

    if (answers && Object.keys(answers).length > 0) {
      fetchMatches();
    } else {
      setColleges(UNIVERSITIES);
    }
  }, [answers, setColleges]);

  const collegeList = colleges?.length ? colleges : UNIVERSITIES;
  const filters = [
    { id: 'all', label: 'All matches' },
    { id: 'high', label: 'Best fit (90+)' },
    { id: 'small', label: 'Small campus' },
    { id: 'outdoor', label: 'Outdoorsy' },
    { id: 'affordable', label: 'Affordable' },
  ];

  const list = collegeList.filter((u) => {
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
                    <button className="btn sm" onClick={() => onNav('selection')}>View</button>
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
    </div>
  );
}
