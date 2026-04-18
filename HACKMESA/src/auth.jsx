import { useState } from 'react';

import { Icon, Nav } from './shared';

export default function Auth({ onNav, onLogin }) {
  const [mode, setMode] = useState('signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const submit = (e) => { e && e.preventDefault(); onLogin(name || 'You'); onNav('quiz'); };

  return (
    <div className="page" data-screen-label="02 Auth">
      <Nav route="auth" onNav={onNav} showLogin />
      <div className="auth">
        <div className="auth-copy">
          <span className="eyebrow">Almost there</span>
          <h1>The short part,<br/>then the fun part.</h1>
          <p>Make a free account to save your matches and come back to them. Or try demo mode if you just want to look around first. No pressure either way.</p>
        </div>

        <form className="auth-form" onSubmit={submit}>
          <div className="auth-tabs">
            <button type="button" className={mode==='signup' ? 'on' : ''} onClick={()=>setMode('signup')}>Create account</button>
            <button type="button" className={mode==='login' ? 'on' : ''} onClick={()=>setMode('login')}>Log in</button>
          </div>

          <h2 className="serif" style={{ fontWeight: 380, fontSize: 36, margin: '0 0 10px', lineHeight: 1 }}>
            {mode==='signup' ? 'Nice to meet you.' : 'Welcome back.'}
          </h2>
          <p style={{ color: 'var(--ink-2)', margin: 0, marginBottom: 28 }}>
            {mode==='signup' ? 'Takes about 20 seconds. You can change everything later.' : 'Pick up where you left off.'}
          </p>

          {mode==='signup' && (
            <div className="field">
              <label>Your first name</label>
              <input value={name} onChange={e=>setName(e.target.value)} placeholder="Alex" />
            </div>
          )}
          <div className="field">
            <label>Email</label>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@school.edu" />
          </div>
          <div className="field">
            <label>Password</label>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" />
          </div>

          <button className="btn" type="submit" style={{ justifyContent: 'center', marginTop: 10 }}>
            {mode==='signup' ? 'Create account and start quiz' : 'Log in'} <Icon.arrowR size={14}/>
          </button>

          <div className="divider">or</div>

          <button className="btn ghost" type="button" onClick={submit} style={{ justifyContent: 'center' }}>
            Continue in demo mode
          </button>
        </form>
      </div>
    </div>
  );
}
