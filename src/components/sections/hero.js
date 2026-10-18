import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';

const RESEARCH_TOPICS = [
  'AI for biology',
  'biological foundation models',
  'multimodal learning for biology',
  'cell-to-text generation',
];

const StyledHeroSection = styled.section`
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
    grid-template-columns: minmax(0, 700px) minmax(280px, 340px);
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
      font-size: clamp(56px, 5vw, 76px);
    }
  }

  .hero-photo {
    justify-self: center;
    width: min(300px, 44vw);
    max-width: 100%;

    @media (min-width: 1100px) {
      width: min(340px, 100%);
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
      font-size: clamp(36px, 3.4vw, 46px);
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
    margin-left: 0.06em;
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
      const phrase = RESEARCH_TOPICS[topicIndex] + '.';
      characterCount += deleting ? -1 : 1;
      setTypedTopic(phrase.slice(0, characterCount));

      let delay = deleting ? 35 : 75;
      if (!deleting && characterCount === phrase.length) {
        deleting = true;
        delay = 1700;
      } else if (deleting && characterCount === 0) {
        deleting = false;
        topicIndex = (topicIndex + 1) % RESEARCH_TOPICS.length;
        delay = 400;
      }

      timeout = setTimeout(tick, delay);
    };

    setTypedTopic('');
    timeout = setTimeout(tick, 700);
    return () => clearTimeout(timeout);
  }, [isMounted, prefersReducedMotion]);

  const one = <h1>Hello, my name is...</h1>;
  const two = <h2 className="big-heading">Sijia Zhu.</h2>;
  const three = (
    <h3
      className="big-heading"
      aria-label={`My research explores ${RESEARCH_TOPICS.join(', ')}.`}>
      <span className="hero-title-prefix" aria-hidden="true">
        My research explores
      </span>
      <span className="rotating-topic" aria-hidden="true">
        {RESEARCH_TOPICS.map(topic => (
          <span className="topic-sizer" key={topic}>
            {topic}.<span className="cursor-space">|</span>
          </span>
        ))}
        <span className="topic-text">
          {prefersReducedMotion ? RESEARCH_TOPICS[0] + '.' : typedTopic}
          {!prefersReducedMotion && <span className="typewriter-cursor">|</span>}
        </span>
      </span>
    </h3>
  );
  const four = (
    <p className="hero-description">
      I study how single-cell models learn biological information and connect cellular
      representations with language.
    </p>
  );
  const items = [one, two, three, four];

  return (
    <StyledHeroSection>
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
