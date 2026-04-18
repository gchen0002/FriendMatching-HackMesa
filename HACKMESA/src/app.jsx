const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "friendCard": "hinge"
}/*EDITMODE-END*/;

function App() {
  const [route, setRoute] = React.useState(() => localStorage.getItem('mesa.route') || 'landing');
  const [answers, setAnswers] = React.useState({});
  const [saved, setSaved] = React.useState([]);
  const [selected, setSelected] = React.useState([]);
  const [savedFriends, setSavedFriends] = React.useState([]);
  const [you, setYou] = React.useState('You');
  const [variant, setVariant] = React.useState(TWEAK_DEFAULTS.friendCard || 'hinge');

  React.useEffect(() => { localStorage.setItem('mesa.route', route); window.scrollTo({ top: 0 }); }, [route]);

  const onNav = (r) => setRoute(r);
  window.__goto = onNav;

  const toggleSave = (id) => setSaved(saved.includes(id) ? saved.filter(x=>x!==id) : [...saved, id]);
  const toggleSelect = (id) => setSelected(selected.includes(id) ? selected.filter(x=>x!==id) : [...selected, id].slice(0,3));
  const toggleSaveFriend = (id) => setSavedFriends(savedFriends.includes(id) ? savedFriends.filter(x=>x!==id) : [...savedFriends, id]);

  React.useEffect(() => {
    if (route === 'friends' && selected.length === 0) {
      setSelected([UNIVERSITIES[0].id, UNIVERSITIES[1].id]);
    }
  }, [route]);

  React.useEffect(() => {
    const onMsg = (ev) => {
      const d = ev.data || {};
      if (d.type === '__activate_edit_mode') document.getElementById('tweaks').classList.add('show');
      if (d.type === '__deactivate_edit_mode') document.getElementById('tweaks').classList.remove('show');
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);

  React.useEffect(() => {
    const root = document.getElementById('tweak-card');
    if (!root) return;
    const handler = (e) => {
      const b = e.target.closest('button[data-val]');
      if (!b) return;
      const val = b.dataset.val;
      root.querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b));
      setVariant(val);
      window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { friendCard: val } }, '*');
    };
    root.addEventListener('click', handler);
    const x = document.getElementById('tweaks-x');
    const xh = () => document.getElementById('tweaks').classList.remove('show');
    x && x.addEventListener('click', xh);
    document.querySelectorAll('#tweak-card button').forEach(b => b.classList.toggle('on', b.dataset.val === variant));
    return () => { root.removeEventListener('click', handler); x && x.removeEventListener('click', xh); };
  }, []);

  const pages = {
    landing: <Landing onNav={onNav}/>,
    auth: <Auth onNav={onNav} onLogin={setYou} />,
    quiz: <Quiz onNav={onNav} answers={answers} setAnswers={setAnswers} />,
    results: <Results onNav={onNav} saved={saved} toggleSave={toggleSave} />,
    selection: <Selection onNav={onNav} selected={selected} toggleSelect={toggleSelect}/>,
    friends: <Friends onNav={onNav} selected={selected} variant={variant} setVariant={setVariant}
                      savedFriends={savedFriends} toggleSaveFriend={toggleSaveFriend} />,
    posts: <Posts onNav={onNav}/>,
  };

  return pages[route] || pages.landing;
}

ReactDOM.createRoot(document.getElementById('app')).render(<App/>);
