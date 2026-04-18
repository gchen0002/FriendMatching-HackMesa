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
            {q.type === 'multi' ? (
              <div style={{ width: '100%', maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', marginBottom: 30 }}>
                  {q.options.map(o => {
                    const arr = answers[q.id] || [];
                    const isSel = arr.includes(o.key);
                    return (
                      <button
                        key={o.key}
                        style={{ padding: '10px 18px', borderRadius: 20, border: '1px solid var(--line)', background: isSel ? 'var(--ink)' : 'transparent', color: isSel ? 'var(--paper)' : 'var(--ink)', cursor: 'pointer', fontSize: 13, transition: 'all 0.2s' }}
                        onClick={() => {
                          let nextArr = [...arr];
                          if (o.key === 'Any') {
                            nextArr = ['Any'];
                          } else {
                            nextArr = nextArr.filter(k => k !== 'Any');
                            if (nextArr.includes(o.key)) nextArr = nextArr.filter(k => k !== o.key);
                            else nextArr.push(o.key);
                          }
                          setAnswers({ ...answers, [q.id]: nextArr });
                        }}
                      >
                        {o.label}
                      </button>
                    );
                  })}
                </div>
                <button className="btn" onClick={() => {
                  setTimeout(() => { if (i < total - 1) goTo(i + 1); else onNav('results'); }, 150);
                }}>Continue <Icon.arrowR size={14}/></button>
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
