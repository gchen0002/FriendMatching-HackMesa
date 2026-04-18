function Quiz({ onNav, answers, setAnswers }) {
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

  const cur = answers[q.id];

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

window.Quiz = Quiz;
