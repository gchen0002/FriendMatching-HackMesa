// Curated Unsplash campus photos for each university
const CAMPUS_IMAGES = {
  u1: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=200&h=200&fit=crop&auto=format', // Pomona — liberal arts campus
  u2: 'https://images.unsplash.com/photo-1562774053-701939374585?w=200&h=200&fit=crop&auto=format', // Oberlin — college hall
  u3: 'https://images.unsplash.com/photo-1580537659466-0a9bfa916a54?w=200&h=200&fit=crop&auto=format', // UC Santa Cruz — redwoods
  u4: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=200&h=200&fit=crop&auto=format', // Macalester — urban campus
  u5: 'https://images.unsplash.com/photo-1576495199011-eb94736d05d6?w=200&h=200&fit=crop&auto=format', // Bowdoin — coastal college
  u6: 'https://images.unsplash.com/photo-1568792923760-d70635a89fdc?w=200&h=200&fit=crop&auto=format', // Kenyon — rural literary
  u7: 'https://images.unsplash.com/photo-1599687267812-35c05ff70ee9?w=200&h=200&fit=crop&auto=format', // Reed — Portland campus
  u8: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=200&h=200&fit=crop&auto=format', // UVM — Burlington
};

// Zone positions: [minLeft%, maxLeft%, minTop%, maxTop%] — avoids center where text sits
const BUBBLE_ZONES = [
  [3, 16, 6, 30],     // top-left
  [78, 94, 6, 28],    // top-right
  [2, 14, 60, 84],    // bottom-left
  [82, 96, 58, 82],   // bottom-right
  [28, 42, 3, 16],    // top-center-left
  [58, 72, 3, 16],    // top-center-right
  [22, 38, 80, 94],   // bottom-center-left
  [62, 76, 80, 94],   // bottom-center-right
];

// Deterministic pseudo-random from index to avoid layout shifts on re-render
function seededOffset(index, min, max) {
  const hash = ((index * 2654435761) >>> 0) / 4294967296;
  return min + hash * (max - min);
}

// --- useTypewriter hook ---
function useTypewriter(text, speed, delay) {
  const [charIndex, setCharIndex] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!started || charIndex >= text.length) return;
    const timer = setTimeout(
      () => setCharIndex(prev => prev + 1),
      speed
    );
    return () => clearTimeout(timer);
  }, [started, charIndex, text, speed]);

  return {
    displayed: text.slice(0, charIndex),
    isDone: charIndex >= text.length,
  };
}

// --- Bubble component (defined outside Landing per rerender-no-inline-components) ---
function Bubble({ uni, index, size }) {
  const zone = BUBBLE_ZONES[index % BUBBLE_ZONES.length];
  const left = seededOffset(index, zone[0], zone[1]);
  const top = seededOffset(index + 8, zone[2], zone[3]);
  const animName = index % 2 === 0 ? 'floatA' : 'floatB';
  const duration = 18 + index * 3;
  const animDelay = 0.3 + index * 0.25;
  const imgSrc = CAMPUS_IMAGES[uni.id];

  // Hide some bubbles on tablet/mobile via CSS classes
  const hideClass = index >= 6 ? ' hide-tablet hide-mobile' : index >= 4 ? ' hide-mobile' : '';

  const [imgError, setImgError] = useState(false);

  return (
    <div
      className={'bubble' + hideClass}
      style={{
        left: left + '%',
        top: top + '%',
        width: size,
        height: size + 28, // extra room for label
        animation: `bubbleIn .6s ease ${animDelay}s forwards, ${animName} ${duration}s ease-in-out ${animDelay + 0.6}s infinite`,
      }}
    >
      {imgError ? (
        <div className="ph" style={{
          width: size, height: size, borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 10
        }}>
          {uni.name.split(' ')[0]}
        </div>
      ) : (
        <img
          src={imgSrc}
          alt={uni.name + ' campus'}
          width={size}
          height={size}
          loading="lazy"
          onError={() => setImgError(true)}
        />
      )}
      <span className="bubble-label">{uni.name.split(',')[0]}</span>
    </div>
  );
}

// --- Bubble sizes per index for visual variety ---
const BUBBLE_SIZES = [130, 110, 140, 100, 120, 105, 135, 115];

function Landing({ onNav }) {
  const titleText = "Find your college.\nFind your people.";
  const { displayed, isDone } = useTypewriter(titleText, 60, 400);
  const universities = window.UNIVERSITIES || [];

  // Split displayed text on newlines and render with <br/>
  const titleParts = displayed.split('\n');

  return (
    <div className="page landing-screen" data-screen-label="01 Landing">
      <Nav route="landing" onNav={onNav} showLogin />

      <div className="landing-hero-wrap">
        <div className="bubble-field">
          {universities.map((uni, i) => (
            <Bubble
              key={uni.id}
              uni={uni}
              index={i}
              size={BUBBLE_SIZES[i % BUBBLE_SIZES.length]}
            />
          ))}
        </div>

        <div className="landing-hero-content">
          <span className="eyebrow">A calmer way to pick your college</span>
          <h1 className={isDone ? 'typewriter-done' : 'typewriter-cursor'}>
            {titleParts.map((part, i) => (
              <React.Fragment key={i}>
                {i > 0 ? <br/> : null}
                {part}
              </React.Fragment>
            ))}
          </h1>
          <p className={'lede' + (isDone ? ' lede-enter' : '')}>
            Mesa is a quiet place to figure out where you're going and who you want to be there with. Take a short quiz, get real matches, meet your future classmates before move-in.
          </p>
          <div className={'ctas' + (isDone ? ' ctas-enter' : '')}>
            <button className="btn" onClick={() => onNav('quiz')}>
              Get matched <Icon.arrowR size={14}/>
            </button>
            <button className="btn ghost" onClick={() => onNav('auth')}>
              Try demo mode
            </button>
          </div>
        </div>
      </div>

      <div className="landing-foot">
        <span>&copy; 2026 Mesa</span>
        <span className="mono-tag">Free for students. Always.</span>
        <span>About &middot; Privacy &middot; For counselors</span>
      </div>
    </div>
  );
}

window.Landing = Landing;
