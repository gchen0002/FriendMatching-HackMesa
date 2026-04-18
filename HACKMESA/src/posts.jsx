import { useState } from 'react';

import { POSTS } from './data';
import { Icon, MonoAvatar, Nav } from './shared';

export default function Posts({ onNav }) {
  const [posts, setPosts] = useState(POSTS);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [school, setSchool] = useState('Pomona');
  const [tags, setTags] = useState(['no-pressure']);
  const tagPool = ['hiking','study group','premed','music','gaming','coffee','mornings','no-pressure','creative','sports','roommate'];

  const toggleTag = (t) => setTags(tags.includes(t) ? tags.filter(x => x !== t) : [...tags, t].slice(0,4));

  const submit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    const post = {
      id: 'new-' + Date.now(), author: 'You', initials: 'YO', avatarEmoji: '🧑', school,
      title, body: body || '(no description)', tags, when: 'just now', saves: 0, replies: 0
    };
    setPosts([post, ...posts]);
    setTitle(''); setBody(''); setTags(['no-pressure']);
  };

  return (
    <div className="page" data-screen-label="07 Posts">
      <Nav route="posts" onNav={onNav} />
      <div className="posts">
        <div className="posts-head">
          <div>
            <span className="eyebrow">Plans · Posts · Quiet asks</span>
            <h1>Say what you're looking for. Let your people find you.</h1>
          </div>
          <span className="mono-tag">{posts.length} active posts</span>
        </div>

        <div className="posts-grid">
          <form className="compose" onSubmit={submit}>
            <span className="mono-tag">New post</span>
            <h3>What's on your mind?</h3>
            <span className="hint">Keep it small and specific. The best posts read like a text to a friend.</span>

            <div className="field">
              <label>Title</label>
              <input value={title} onChange={e=>setTitle(e.target.value)} placeholder='"Looking for gym friends at UCLA"' />
            </div>
            <div className="field">
              <label>A little more</label>
              <textarea value={body} onChange={e=>setBody(e.target.value)} placeholder="Two sentences is plenty." />
            </div>
            <div className="field">
              <label>School</label>
              <select value={school} onChange={e=>setSchool(e.target.value)}>
                {['Pomona','Oberlin','UC Santa Cruz','Macalester','Bowdoin','Kenyon','Reed'].map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 12, color: 'var(--ink-2)', fontWeight: 500, display: 'block', marginBottom: 10 }}>Tags · up to 4</label>
              <div className="tag-row">
                {tagPool.map(t => (
                  <span key={t} className={'chip ' + (tags.includes(t) ? 'on' : '')} onClick={()=>toggleTag(t)}>{t}</span>
                ))}
              </div>
            </div>
            <button className="btn" type="submit" style={{ justifyContent: 'center', marginTop: 8 }}>
              <Icon.plus size={14}/> Post it
            </button>
          </form>

          <div className="post-list">
            {posts.map(p => (
              <div key={p.id} className="post">
                <MonoAvatar initials={p.initials} emoji={p.avatarEmoji} size={48} />
                <div className="body">
                  <h4>{p.title}</h4>
                  <p>{p.body}</p>
                  <div className="tags">
                    {p.tags.map(t => <span key={t} className="chip">#{t}</span>)}
                  </div>
                  <div className="meta" style={{ marginTop: 14 }}>
                    <span>{p.author} · {p.school}</span>
                    <span>{p.when}</span>
                    <span><Icon.bookmark size={11}/> {p.saves}</span>
                    <span><Icon.msg size={11}/> {p.replies} replies</span>
                  </div>
                </div>
                <div className="actions">
                  <button className="icon-btn" title="Save"><Icon.bookmark size={14}/></button>
                  <button className="icon-btn" title="Reply"><Icon.msg size={14}/></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
