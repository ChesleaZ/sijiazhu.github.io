import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';

const StyledHeroSection = styled.section`
  display: grid;
  grid-template-columns: minmax(0, 790px) minmax(280px, 360px);
  align-items: center;
  justify-content: center;
  gap: clamp(34px, 4vw, 56px);
  min-height: 100vh;
  height: auto;
  padding: calc(var(--nav-height) + 24px) 0 80px;

  @media (max-height: 700px) and (min-width: 700px), (max-width: 360px) {
    padding-top: calc(var(--nav-height) + 18px);
  }

  @media (max-width: 1500px) {
    grid-template-columns: 1fr;
    gap: 26px;
    min-height: 100vh;
    padding: calc(var(--nav-height) + 12px) 0 72px;
  }

  .hero-content {
    max-width: 790px;
    min-width: 0;

    @media (max-width: 1500px) {
      justify-self: center;
      width: min(790px, 82vw);
    }
  }

  h2.big-heading {
    font-size: clamp(64px, 6.8vw, 90px);
    line-height: 1.03;

    @media (max-width: 1500px) {
      font-size: clamp(46px, 11vw, 68px);
    }
  }

  .hero-photo {
    justify-self: end;
    width: min(360px, 100%);
    max-width: 100%;

    @media (max-width: 1500px) {
      justify-self: center;
      width: min(300px, 44vw);
      order: -1;
    }

    @media (max-width: 480px) {
      width: min(210px, 64vw);
    }
  }

  .hero-photo-inner {
    ${({ theme }) => theme.mixins.boxShadow};
    position: relative;
    overflow: hidden;
    border: 1px solid var(--lightest-navy);
    border-radius: 16px;
    background-color: var(--white);

    &:after {
      content: '';
      position: absolute;
      inset: 14px;
      border: 2px solid var(--green);
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
    max-width: 790px;
    font-size: clamp(42px, 3.95vw, 54px);

    @media (max-width: 1500px) {
      max-width: min(760px, 82vw);
      font-size: clamp(36px, 5.4vw, 50px);
    }

    @media (max-width: 480px) {
      font-size: clamp(26px, 7.8vw, 36px);
    }
  }

  .hero-title-prefix {
    display: block;
    white-space: nowrap;
  }

  .rotating-topic {
    display: block;
    color: var(--green);
    white-space: nowrap;
    overflow-wrap: normal;
    animation: topicFade 3.2s ease-in-out infinite;
  }

  @keyframes topicFade {
    0% {
      opacity: 0;
      transform: translateY(8px);
    }
    14%,
    82% {
      opacity: 1;
      transform: translateY(0);
    }
    100% {
      opacity: 0;
      transform: translateY(-8px);
    }
  }

  p {
    margin: 20px 0 0;
    max-width: 540px;
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
  const [topicIndex, setTopicIndex] = useState(0);
  const prefersReducedMotion = usePrefersReducedMotion();

  const researchTopics = [
    'complex biomedical data',
    'single\u2011cell multi\u2011omics',
    'genomic mechanisms of disease',
  ];

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const interval = setInterval(() => {
      setTopicIndex(index => (index + 1) % researchTopics.length);
    }, 3200);

    return () => clearInterval(interval);
  }, [prefersReducedMotion, researchTopics.length]);

  const one = <h1>Hello, my name is</h1>;
  const two = <h2 className="big-heading">Sijia Zhu.</h2>;
  const three = (
    <h3 className="big-heading">
      <span className="hero-title-prefix">I develop statistical methods for</span>
      <span key={researchTopics[topicIndex]} className="rotating-topic">
        {researchTopics[topicIndex]}.
      </span>
    </h3>
  );
  const items = [one, two, three];

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
        <StyledHeroPhoto />
      ) : (
        <TransitionGroup component={null}>
          {isMounted && (
            <CSSTransition classNames="fadeup" timeout={loaderDelay}>
              <div style={{ transitionDelay: '600ms' }}>
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
