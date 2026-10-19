import React, { useEffect, useRef } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';
import { useSite } from '../../context/site';

const StyledAboutSection = styled.section`
  max-width: 800px;

  &.text-only {
    .inner { grid-template-columns: minmax(0, 1fr); gap: 0; }
    .about-text { width: 100%; min-width: 0; line-height: 1.65; }
    .about-text p { margin: 0 0 22px; }
    .about-text .skills-label { margin: 30px 0 0; color: var(--light-slate); }
    .skills-list {
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 12px 24px;
      margin-top: 18px;
      overflow: visible;
    }
    .skills-list li { min-width: 0; margin-bottom: 0; line-height: 1.5; }
    @media (max-width: 640px) {
      .skills-list { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px 18px; }
      .about-text p { margin-bottom: 20px; }
    }
  }

  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 50px;

    @media (max-width: 768px) {
      display: block;
    }
  }
`;
const StyledText = styled.div`
  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(140px, 200px));
    grid-gap: 0 10px;
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--green);
        font-size: var(--fz-sm);
        line-height: 12px;
      }
    }
  }
`;
const StyledPic = styled.div`
  position: relative;
  max-width: 300px;

  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 70%;
  }

  .wrapper {
    ${({ theme }) => theme.mixins.boxShadow};
    display: block;
    position: relative;
    width: 100%;
    border-radius: var(--border-radius);
    background-color: var(--green-tint);

    &:hover,
    &:focus {
      outline: 0;
      transform: translate(-4px, -4px);

      &:after {
        transform: translate(8px, 8px);
      }

      .img {
        filter: none;
        mix-blend-mode: normal;
      }
    }

    .img {
      position: relative;
      border-radius: var(--border-radius);
      mix-blend-mode: normal;
      filter: none;
      transition: var(--transition);
    }

    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius);
      transition: var(--transition);
    }

    &:before {
      top: 0;
      left: 0;
      background-color: transparent;
      mix-blend-mode: normal;
    }

    &:after {
      border: 2px solid var(--green);
      top: 14px;
      left: 14px;
      z-index: -1;
    }
  }
`;

const About = () => {
  const { config, edit } = useSite();
  const content = config.about;
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const skills = content.skills;

  return (
    <StyledAboutSection id="about" ref={revealContainer} className={content.photoVisible ? 'with-photo' : 'text-only'}>
      <h2 className="numbered-heading" {...edit('about.title')}>{content.title}</h2>

      <div className="inner">
        <StyledText className="about-text">
          <div>
            {content.paragraphs.map((paragraph, i) => <p key={i} {...edit('about.paragraphs.' + i)}>{paragraph}</p>)}
            <p className="skills-label" {...edit('about.skillsLabel')}>{content.skillsLabel}</p>
          </div>

          <ul className="skills-list">
            {skills && skills.map((skill, i) => <li key={i} {...edit('about.skills.' + i)}>{skill}</li>)}
          </ul>
        </StyledText>

        {content.photoVisible && <StyledPic className="about-photo">
          <div className="wrapper">
            <StaticImage
              className="img"
              src="../../images/me.jpg"
              width={500}
              quality={95}
              formats={['AUTO', 'WEBP', 'AVIF']}
              alt="Headshot"
            />
          </div>
        </StyledPic>}
      </div>
    </StyledAboutSection>
  );
};

export default About;

