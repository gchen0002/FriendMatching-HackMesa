import { useEffect, useState } from 'react';

import { UserButton, useUser } from '@clerk/nextjs';

import { useNavigation } from './navigation-context';

function clampScore(score) {
  return Math.max(0, Math.min(100, Number(score) || 0));
}

function compatibilityHue(score) {
  return Math.round((clampScore(score) / 100) * 120);
}

export function getCompatibilityColor(score) {
  return `hsl(${compatibilityHue(score)} 72% 42%)`;
}

export function getCompatibilityBadgeStyle(score) {
  const hue = compatibilityHue(score);

  return {
    color: `hsl(${hue} 72% 34%)`,
    borderColor: `hsl(${hue} 48% 76%)`,
    background: `hsl(${hue} 100% 97%)`,
  };
}

export function MonoAvatar({ initials, size = 40, emoji = null, src = null }) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  return (
    <span className="mono-avatar" style={{
      width: size, height: size, borderRadius: 0,
      fontSize: emoji ? size * 0.5 : size * 0.36,
      background: '#F6F6F6', color: '#000',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center'
    }}>
      {src && !failed ? (
        <img
          src={src}
          alt=""
          onError={() => setFailed(true)}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      ) : (emoji || initials)}
    </span>
  );
}

export function Placeholder({ label, height = 160 }) {
  return (
    <div className="ph" style={{ height }}>
      {label && <span>{label}</span>}
    </div>
  );
}

export function SchoolImage({ src, alt, label, height = 160 }) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  if (!src || failed) {
    return <Placeholder label={label} height={height} />;
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      style={{
        width: '100%',
        height,
        objectFit: 'cover',
        border: '1px solid var(--line)',
        background: 'var(--paper)',
        display: 'block',
      }}
    />
  );
}

export function Logo({ onNav, small }) {
  return (
    <a href="#" className="brand" onClick={(e)=>{ e.preventDefault(); onNav('landing'); }}>
      <span className="brand-mark">College Compass</span>
    </a>
  );
}

export function Nav({ route, onNav, showLogin = false }) {
  const { items, isDemoMode, showAccountChrome } = useNavigation();
  const { isSignedIn } = useUser();

  return (
    <div className="nav">
      <Logo onNav={onNav} />
      <div className="nav-links">
        {items.map(i => (
          <a key={i.id} href="#" onClick={(e)=>{e.preventDefault(); onNav(i.id);}}
             style={{ color: route === i.id ? 'var(--ink)' : 'var(--ink-2)', fontWeight: route === i.id ? 500 : 400 }}>
            {i.label}
          </a>
        ))}
      </div>
      <div className="nav-right">
        {showAccountChrome && isSignedIn ? (
          <UserButton />
        ) : showAccountChrome && isDemoMode ? (
          <>
            <span className="mono-tag" style={{ marginRight: 10 }}>demo mode</span>
            <button className="btn outline" style={{ marginRight: 10, fontSize: 13, padding: '6px 14px' }} onClick={() => onNav('auth')}>Signup / Login</button>
            <MonoAvatar initials="YOU" emoji="🧑" size={36} />
          </>
        ) : null}
      </div>
    </div>
  );
}

export const Icon = {
  heart: (p) => (
    <svg width={p.size||18} height={p.size||18} viewBox="0 0 24 24" fill={p.fill||'none'} stroke="currentColor" strokeWidth="1.5">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  ),
  bookmark: (p) => (
    <svg width={p.size||18} height={p.size||18} viewBox="0 0 24 24" fill={p.fill||'none'} stroke="currentColor" strokeWidth="1.5">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
    </svg>
  ),
  x: (p) => (
    <svg width={p.size||18} height={p.size||18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M18 6 6 18M6 6l12 12"/>
    </svg>
  ),
  check: (p) => (
    <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 6 9 17l-5-5"/>
    </svg>
  ),
  arrowR: (p) => (
    <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M5 12h14M13 5l7 7-7 7"/>
    </svg>
  ),
  arrowL: (p) => (
    <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M19 12H5M11 5l-7 7 7 7"/>
    </svg>
  ),
  plus: (p) => (
    <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 5v14M5 12h14"/>
    </svg>
  ),
  msg: (p) => (
    <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  ),
  search: (p) => (
    <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
    </svg>
  ),
  instagram: (p) => (
    <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  linkedin: (p) => (
    <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="currentColor">
      <path d="M6.94 8.5H3.56V20h3.38V8.5Zm-1.7-1.54c1.08 0 1.76-.72 1.76-1.62C7 4.42 6.32 3.7 5.26 3.7 4.2 3.7 3.5 4.42 3.5 5.34c0 .9.68 1.62 1.72 1.62h.02ZM20.5 20h-3.38v-6.05c0-1.52-.54-2.56-1.9-2.56-1.03 0-1.64.7-1.9 1.38-.1.24-.12.58-.12.92V20H9.82s.04-10.42 0-11.5h3.38v1.63c.45-.69 1.26-1.67 3.07-1.67 2.24 0 3.93 1.46 3.93 4.61V20Z" />
    </svg>
  ),
  tiktok: (p) => (
    <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="currentColor">
      <path d="M14.5 3c.32 1.78 1.39 3.18 3.1 3.95.8.36 1.63.54 2.4.55v3.07c-1.48-.04-2.9-.43-4.12-1.12v5.88c0 3.45-2.46 5.67-5.59 5.67-3.26 0-5.29-2.49-5.29-5.1 0-3.17 2.48-5.45 5.6-5.45.33 0 .62.03.9.08v3.18a2.6 2.6 0 0 0-.88-.14c-1.5 0-2.72 1-2.72 2.46 0 1.3 1.01 2.38 2.41 2.38 1.52 0 2.6-.99 2.6-2.98V3h3.59Z" />
    </svg>
  ),
  xLogo: (p) => (
    <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.9 3H21l-6.86 7.84L22 21h-6.2l-4.86-6.35L5.4 21H3.3l7.34-8.39L2 3h6.35l4.39 5.8L18.9 3Zm-1.09 16.14h1.16L7.72 4.8H6.48l11.33 14.34Z" />
    </svg>
  ),
};
