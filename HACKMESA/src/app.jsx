'use client';

import { useEffect, useState } from 'react';

import Auth from './auth';
import { UNIVERSITIES } from './data';
import Friends from './friends';
import Landing from './landing';
import Posts from './posts';
import Quiz from './quiz';
import Results from './results';
import Selection from './selection';

export default function MesaApp() {
  const [route, setRoute] = useState('landing');
  const [answers, setAnswers] = useState({});
  const [saved, setSaved] = useState([]);
  const [selected, setSelected] = useState([]);
  const [savedFriends, setSavedFriends] = useState([]);
  const [variant, setVariant] = useState('hinge');
  const [routeLoaded, setRouteLoaded] = useState(false);

  useEffect(() => {
    const savedRoute = window.localStorage.getItem('mesa.route');
    if (savedRoute) {
      setRoute(savedRoute);
    }
    setRouteLoaded(true);
  }, []);

  useEffect(() => {
    if (!routeLoaded) {
      return;
    }

    window.localStorage.setItem('mesa.route', route);
    window.scrollTo({ top: 0 });
  }, [route, routeLoaded]);

  useEffect(() => {
    if (route === 'friends' && selected.length === 0) {
      setSelected([UNIVERSITIES[0].id, UNIVERSITIES[1].id]);
    }
  }, [route, selected.length]);

  const toggleSave = (id) => {
    setSaved((current) =>
      current.includes(id) ? current.filter((value) => value !== id) : [...current, id],
    );
  };

  const toggleSelect = (id) => {
    setSelected((current) =>
      current.includes(id)
        ? current.filter((value) => value !== id)
        : [...current, id].slice(0, 3),
    );
  };

  const toggleSaveFriend = (id) => {
    setSavedFriends((current) =>
      current.includes(id) ? current.filter((value) => value !== id) : [...current, id],
    );
  };

  switch (route) {
    case 'auth':
      return <Auth onNav={setRoute} onLogin={() => setRoute('quiz')} />;
    case 'quiz':
      return <Quiz onNav={setRoute} answers={answers} setAnswers={setAnswers} />;
    case 'results':
      return <Results onNav={setRoute} saved={saved} toggleSave={toggleSave} />;
    case 'selection':
      return <Selection onNav={setRoute} selected={selected} toggleSelect={toggleSelect} />;
    case 'friends':
      return (
        <Friends
          onNav={setRoute}
          selected={selected}
          variant={variant}
          setVariant={setVariant}
          savedFriends={savedFriends}
          toggleSaveFriend={toggleSaveFriend}
        />
      );
    case 'posts':
      return <Posts onNav={setRoute} />;
    default:
      return <Landing onNav={setRoute} />;
  }
}
