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
