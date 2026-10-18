import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { StaticImage } from 'gatsby-plugin-image';
import { withPrefix } from 'gatsby';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';

const DEFAULT_SETTINGS = {
  greeting: 'Hello, my name is',
  name: 'Sijia Zhu.',
  prefix: 'My research explores',
  topics: ['AI for biology', 'biological foundation models', 'multimodal learning for biology', 'cell-to-text generation'],
  background: '#0b1220', text: '#e6edf4', accent: '#7ad8c7',
  photoSide: 'right', photoWidth: 340, titleSize: 64, topicSize: 43,
};

const normalizeSettings = value => {
  const input = value && typeof value === 'object' ? value : {};
  const settings = { ...DEFAULT_SETTINGS };
  ['greeting', 'name', 'prefix'].forEach(key => {
    if (typeof input[key] === 'string') settings[key] = input[key].slice(0, 120);
  });
  if (Array.isArray(input.topics)) {
    const topics = input.topics.filter(x => typeof x === 'string' && x.trim()).slice(0, 8).map(x => x.trim().slice(0, 120));
    if (topics.length) settings.topics = topics;
  }
  ['background', 'text', 'accent'].forEach(key => {
    if (/^#[0-9a-f]{6}$/i.test(input[key])) settings[key] = input[key];
  });
  if (input.photoSide === 'left') settings.photoSide = 'left';
  [['photoWidth', 240, 400], ['titleSize', 46, 80], ['topicSize', 26, 46]].forEach(([key, min, max]) => {
    if (typeof input[key] === 'number' && Number.isFinite(input[key])) settings[key] = Math.min(max, Math.max(min, input[key]));
  });
  return settings;
};

const StyledHeroSection = styled.section`
  --hero-name-size: 64px;
  --hero-topic-size: 43px;
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  justify-content: center;
  gap: 26px;
  min-height: 100vh;
  height: auto;
  padding: calc(var(--nav-height) + 12px) 0 72px;

  @media (max-height: 700px) and (min-width: 700px), (max-width: 360px) {
    padding-top: calc(var(--nav-height) + 18px);
  }

  @media (min-width: 1100px) {
    grid-template-columns: minmax(0, 700px) minmax(240px, var(--hero-photo-width, 340px));
    gap: clamp(40px, 5vw, 72px);
    padding: calc(var(--nav-height) + 24px) 0 80px;
  }

  .hero-content {
    justify-self: center;
    width: min(760px, 82vw);
    max-width: 760px;
    min-width: 0;

    @media (min-width: 1100px) {
      justify-self: end;
      width: 100%;
      max-width: 700px;
    }
  }

  h2.big-heading {
    font-size: clamp(46px, 9vw, 68px);
    line-height: 1.03;

    @media (min-width: 1100px) {
      font-size: var(--hero-name-size);
    }
  }

  .hero-photo {
    justify-self: center;
    width: min(300px, 44vw);
    max-width: 100%;

    @media (min-width: 1100px) {
      width: min(var(--hero-photo-width, 340px), 100%);
    }

    @media (max-width: 480px) {
      width: min(210px, 64vw);
    }
  }

  .hero-photo-slot {
    justify-self: center;
    order: -1;

    @media (min-width: 1100px) {
      justify-self: start;
      order: 0;
    }
  }

  @media (min-width: 1100px) {
    &.photo-left {
      grid-template-columns: minmax(240px, var(--hero-photo-width, 340px)) minmax(0, 700px);
    }
    &.photo-left .hero-photo-slot { order: -1; }
  }

  [contenteditable='true']:focus {
    outline: 1px dashed var(--green);
    outline-offset: 6px;
  }

  .hero-photo-inner {
    ${({ theme }) => theme.mixins.boxShadow};
    position: relative;
    overflow: hidden;
    border: 1px solid var(--lightest-navy);
    border-radius: 16px;
    background-color: var(--surface);

    &:after {
      content: '';
      position: absolute;
      inset: 14px;
      border: 1px solid rgba(122, 216, 199, 0.4);
      border-radius: 12px;
      pointer-events: none;
    }
  }

  .hero-img {
    display: block;
    filter: none;
    mix-blend-mode: normal;
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-lg), 5vw, var(--fz-xl));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h3 {
    margin-top: 12px;
    color: var(--slate);
    line-height: 1.12;
    max-width: min(760px, 82vw);
    font-size: clamp(34px, 4.6vw, 48px);

    @media (min-width: 1100px) {
      max-width: 700px;
      font-size: var(--hero-topic-size);
    }

    @media (max-width: 480px) {
      font-size: clamp(26px, 7.8vw, 36px);
    }
  }

  .hero-title-prefix {
    display: block;
    white-space: normal;
  }

  .rotating-topic {
    display: grid;
    min-width: 0;
    max-width: 100%;
    color: var(--green);
  }

  .topic-sizer,
  .topic-text {
    grid-area: 1 / 1;
    min-width: 0;
    white-space: normal;
    overflow-wrap: anywhere;
  }

  /* Reserve the largest phrase at the current width to avoid layout shifts. */
  .topic-sizer {
    visibility: hidden;
    pointer-events: none;
  }

  .typewriter-cursor,
  .cursor-space {
    display: inline-block;
    margin-left: 0;
    width: 0;
    font-weight: 400;
  }

  .typewriter-cursor {
    animation: cursorBlink 1s steps(1, end) infinite;
  }

  @keyframes cursorBlink {
    0%, 49% { opacity: 1; }
    50%, 100% { opacity: 0; }
  }

  @media (prefers-reduced-motion: reduce) {
    .typewriter-cursor {
      display: none;
      animation: none;
    }
  }

  p {
    margin: 20px 0 0;
    max-width: 540px;
  }

  .hero-description {
    margin-top: 24px;
    color: var(--light-slate);
    font-size: clamp(18px, 1.6vw, 21px);
    line-height: 1.5;
    max-width: 500px;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    font-size: var(--fz-md);
    margin-top: 50px;
  }
`;

const StyledHeroPhoto = () => (
  <div className="hero-photo">
    <div className="hero-photo-inner">
      <StaticImage
        className="hero-img"
        src="../../images/me.jpg"
        width={680}
        quality={95}
        formats={['AUTO', 'WEBP', 'AVIF']}
        alt="Sijia Zhu portrait"
      />
    </div>
  </div>
);

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [typedTopic, setTypedTopic] = useState('');
  const prefersReducedMotion = usePrefersReducedMotion();
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [isPreview, setIsPreview] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const preview = new URLSearchParams(window.location.search).get('preview') === '1' && window.parent !== window;
    setIsPreview(preview);
    const receive = event => {
      if (preview && event.origin === window.location.origin && event.source === window.parent && event.data?.type === 'homepage-config') {
        setSettings(normalizeSettings(event.data.settings));
      }
    };
    window.addEventListener('message', receive);
    if (preview) {
      window.parent.postMessage({ type: 'homepage-editor-ready' }, window.location.origin);
    } else {
      fetch(withPrefix('/homepage-config.json'))
        .then(response => response.ok ? response.json() : null)
        .then(value => { if (!cancelled && value) setSettings(normalizeSettings(value)); })
        .catch(() => {});
    }
    return () => { cancelled = true; window.removeEventListener('message', receive); };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const values = {
      '--navy': settings.background, '--dark-navy': settings.background,
      '--green': settings.accent, '--lightest-slate': settings.text,
      '--slate': settings.text, '--light-slate': settings.text,
    };
    const previous = {};
    Object.keys(values).forEach(key => { previous[key] = root.style.getPropertyValue(key); root.style.setProperty(key, values[key]); });
    return () => Object.keys(values).forEach(key => {
      if (previous[key]) root.style.setProperty(key, previous[key]); else root.style.removeProperty(key);
    });
  }, [settings.background, settings.text, settings.accent]);

  const editText = key => isPreview ? {
    contentEditable: true, suppressContentEditableWarning: true,
    onBlur: event => window.parent.postMessage({
      type: 'homepage-text-edit', key, value: event.currentTarget.textContent,
    }, window.location.origin),
  } : {};

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion || !isMounted) {
      return;
    }

    let topicIndex = 0;
    let characterCount = 0;
    let deleting = false;
    let timeout;

    const tick = () => {
      const phrase = settings.topics[topicIndex] + '.';
      characterCount += deleting ? -1 : 1;
      setTypedTopic(phrase.slice(0, characterCount));

      let delay = deleting ? 35 : 75;
      if (!deleting && characterCount === phrase.length) {
        deleting = true;
        delay = 1700;
      } else if (deleting && characterCount === 0) {
        deleting = false;
        topicIndex = (topicIndex + 1) % settings.topics.length;
        delay = 400;
      }

      timeout = setTimeout(tick, delay);
    };

    setTypedTopic('');
    timeout = setTimeout(tick, 700);
    return () => clearTimeout(timeout);
  }, [isMounted, prefersReducedMotion, settings.topics]);

  const one = <h1 {...editText('greeting')}>{settings.greeting}</h1>;
  const two = <h2 className="big-heading" {...editText('name')}>{settings.name}</h2>;
  const three = (
    <h3
      className="big-heading"
      aria-label={`${settings.prefix} ${settings.topics.join(', ')}.`}>
      <span className="hero-title-prefix" aria-hidden="true" {...editText('prefix')}>
        {settings.prefix}
      </span>
      <span className="rotating-topic" aria-hidden="true">
        {settings.topics.map(topic => (
          <span className="topic-sizer" key={topic}>
            {topic}.<span className="cursor-space">|</span>
          </span>
        ))}
        <span className="topic-text">
          {prefersReducedMotion ? settings.topics[0] + '.' : typedTopic}
          {!prefersReducedMotion && <span className="typewriter-cursor">|</span>}
        </span>
      </span>
    </h3>
  );
  const items = [one, two, three];

  return (
    <StyledHeroSection className={settings.photoSide === 'left' ? 'photo-left' : ''} style={{ '--hero-photo-width': `${settings.photoWidth}px`, '--hero-name-size': `${settings.titleSize}px`, '--hero-topic-size': `${settings.topicSize}px` }}>
      <div className="hero-content">
        {prefersReducedMotion ? (
          <>
            {items.map((item, i) => (
              <div key={i}>{item}</div>
            ))}
          </>
        ) : (
          <TransitionGroup component={null}>
            {isMounted &&
              items.map((item, i) => (
                <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                  <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
                </CSSTransition>
              ))}
          </TransitionGroup>
        )}
      </div>

      {prefersReducedMotion ? (
        <div className="hero-photo-slot">
          <StyledHeroPhoto />
        </div>
      ) : (
        <TransitionGroup component={null}>
          {isMounted && (
            <CSSTransition classNames="fadeup" timeout={loaderDelay}>
              <div className="hero-photo-slot" style={{ transitionDelay: '600ms' }}>
                <StyledHeroPhoto />
              </div>
            </CSSTransition>
          )}
        </TransitionGroup>
      )}
    </StyledHeroSection>
  );
};

export default Hero;

