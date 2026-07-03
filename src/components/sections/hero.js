import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';

const StyledHeroSection = styled.section`
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(220px, 320px);
  align-items: center;
  gap: clamp(32px, 5vw, 64px);
  min-height: 100vh;
  height: auto;
  padding: 0;

  @media (max-height: 700px) and (min-width: 700px), (max-width: 360px) {
    padding-top: var(--nav-height);
  }

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 28px;
    min-height: auto;
    padding: var(--nav-height) 0 80px;
  }

  .hero-content {
    max-width: 760px;
    min-width: 0;
  }

  .hero-photo {
    justify-self: end;
    width: min(320px, 100%);
    max-width: 100%;

    @media (max-width: 900px) {
      justify-self: center;
      width: min(220px, 58vw);
      order: -1;
    }

    @media (max-width: 480px) {
      width: min(180px, 60vw);
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
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h3 {
    margin-top: 5px;
    color: var(--slate);
    line-height: 1.08;
    max-width: 760px;
  }

  .rotating-topic {
    display: inline;
    color: var(--green);
    white-space: normal;
    overflow-wrap: anywhere;
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
    margin-top: 50px;
  }
`;

const StyledHeroPhoto = () => (
  <div className="hero-photo">
    <div className="hero-photo-inner">
      <StaticImage
        className="hero-img"
        src="../../images/me.jpg"
        width={520}
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
    'high-dimensional biomedical data',
    'single-cell multi-omics',
    'Bayesian modeling',
    'statistical machine learning',
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
      I develop statistical methods for{' '}
      <span key={researchTopics[topicIndex]} className="rotating-topic">
        {researchTopics[topicIndex]}
      </span>
      .
    </h3>
  );
  const four = (
    <>
      <p>
        I’m an M.S. student in Applied Mathematics and Statistics with a biostatistics focus at
        Johns Hopkins University. My research interests include high-dimensional inference,
        Bayesian modeling, statistical machine learning, and single-cell multi-omics.
      </p>
    </>
  );
  const five = (
    <a className="email-link" href="#projects">
      View Research
    </a>
  );

  const items = [one, two, three, four, five];

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
