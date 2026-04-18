import { useState } from 'react';

import { QUIZ } from './data';
import { Icon, Nav } from './shared';

export default function Quiz({ onNav, answers, setAnswers }) {
  const [i, setI] = useState(0);
  const [slideKey, setSlideKey] = useState(0);
  const q = QUIZ[i];
  const total = QUIZ.length;

  const goTo = (next) => {
    setSlideKey(prev => prev + 1);
    setI(next);
  };

  const choose = (key) => {
    setAnswers({ ...answers, [q.id]: key });
    setTimeout(() => {
      if (i < total - 1) goTo(i + 1);
      else onNav('results');
    }, 350);
  };

  const toggleMulti = (key) => {
    const current = Array.isArray(answers[q.id]) ? answers[q.id] : [];

    if (key === 'Any') {
      setAnswers({ ...answers, [q.id]: ['Any'] });
      return;
    }

    const withoutAny = current.filter((value) => value !== 'Any');
    const next = withoutAny.includes(key)
      ? withoutAny.filter((value) => value !== key)
      : [...withoutAny, key];

    setAnswers({ ...answers, [q.id]: next });
  };

  const submitMulti = () => {
    if (i < total - 1) {
      goTo(i + 1);
      return;
    }

    onNav('results');
  };

  const cur = answers[q.id];
  const multiCur = Array.isArray(cur) ? cur : [];

  return (
    <div className="page" data-screen-label={`03 Quiz · ${i+1}/${total}`}>
      <Nav route="quiz" onNav={onNav} />

      <div className="quiz">
        <div className="quiz-bar">
          <div className="quiz-bar-fill" style={{ width: ((i + 1) / total * 100) + '%' }}></div>
        </div>

        <div className="quiz-body">
          <div className="quiz-slide" key={slideKey}>
            <h2>{q.title}</h2>
            {q.type === 'select' ? (
              <div style={{ width: '100%', maxWidth: 400, margin: '0 auto', textAlign: 'left' }}>
                <select 
                  style={{ width: '100%', border: '1px solid var(--line)', background: 'var(--white)', padding: '16px 20px', fontFamily: 'inherit', fontSize: '16px', color: 'var(--ink)', outline: 'none', borderRadius: 14, cursor: 'pointer', appearance: 'none' }}
                  value={cur || ''}
                  onChange={e => choose(e.target.value)}
                >
                  <option value="" disabled>Select an option...</option>
                  {q.options.map(o => (
                    <option key={o.key} value={o.key}>{o.label}</option>
                  ))}
                </select>
              </div>
            ) : q.type === 'multi' ? (
              <div style={{ width: '100%', maxWidth: 720, margin: '0 auto' }}>
                <div className="quiz-options">
                  {q.options.map((o) => {
                    const selected = multiCur.includes(o.key);

                    return (
                      <button
                        key={o.key}
                        className={'q-option' + (selected ? ' sel' : '')}
                        onClick={() => toggleMulti(o.key)}
                      >
                        {o.label}
                      </button>
                    );
                  })}
                </div>

                <div style={{ marginTop: 18, textAlign: 'center', color: 'var(--ink-2)', fontSize: 14 }}>
                  {multiCur.length > 0 ? `${multiCur.length} selected` : 'Choose at least one option to continue'}
                </div>

                <div style={{ marginTop: 18, display: 'flex', justifyContent: 'center' }}>
                  <button
                    className="btn"
                    disabled={multiCur.length === 0}
                    style={multiCur.length === 0 ? { opacity: 0.35, cursor: 'not-allowed' } : undefined}
                    onClick={submitMulti}
                  >
                    Continue <Icon.arrowR size={14}/>
                  </button>
                </div>
              </div>
            ) : (
              <div className="quiz-options">
                {q.options.map(o => (
                  <button
                    key={o.key}
                    className={'q-option' + (cur === o.key ? ' sel' : '')}
                    onClick={() => choose(o.key)}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {i > 0 ? (
            <button className="quiz-back" onClick={() => goTo(i - 1)}>
              <Icon.arrowL size={14}/> Back
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
