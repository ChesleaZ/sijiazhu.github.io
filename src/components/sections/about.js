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
    .numbered-heading:after { flex-basis: 0; min-width: 0; width: auto; }
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

  .about-block + .about-block { margin-top: 36px; padding-top: 30px; border-top: 1px solid var(--lightest-navy); }
  .about-block h3 { color: var(--lightest-slate); font-size: 24px; margin: 0 0 22px; }
  .about-block h4 { color: var(--green); font-size: var(--fz-md); font-weight: 500; margin: 24px 0 12px; }
  .background-group + .background-group { margin-top: 26px; }
  .background-group h4 { margin: 0 0 12px; font-size: var(--fz-lg); font-weight: 600; line-height: 1.45; }
  .interest-item { text-align: left; }
  .interest-item strong { color: var(--lightest-slate); font-weight: 700; }
  .advisor-list { list-style: none; margin: 4px 0 2px 12px; padding: 0; }
  .background-list .advisor-list li { font-size: .92em; line-height: 1.4; padding-left: 13px; margin: 0; }
  .background-list .advisor-list li:before { content: '•'; font-size: .8em; top: .2em; }
  .advisor-list a { display: inline; color: var(--light-slate); text-decoration: underline; text-decoration-color: var(--green); text-underline-offset: 3px; text-decoration-thickness: 1px; }
  .advisor-list a:hover, .advisor-list a:focus-visible { color: var(--green); }
  .background-list { list-style: none; padding: 0; margin: 0; }
  .background-list li { position: relative; padding-left: 20px; margin: 0 0 14px; line-height: 1.65; overflow-wrap: break-word; }
  .background-list li:before { content: '▹'; position: absolute; left: 0; color: var(--green); }
  .about-block .skills-list { margin-top: 0; }
  @media (max-width: 640px) {
    .about-block + .about-block { margin-top: 30px; padding-top: 26px; }
    .about-block h3 { font-size: 22px; }
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

  return (
    <StyledAboutSection id="about" ref={revealContainer} className={content.photoVisible ? 'with-photo' : 'text-only'}>
      <h2 className="numbered-heading" {...edit('about.title')}>{content.title}</h2>

      <div className="inner">
        <StyledText className="about-text">
          <div className="about-block" aria-labelledby="about-background">
            <h3 id="about-background" {...edit('about.backgroundTitle')}>{content.backgroundTitle}</h3>
            {content.backgroundGroups.map((group, i) => (
              <div className="background-group" key={i}>
                <h4 {...edit('about.backgroundGroups.' + i + '.institution')}>{group.institution}</h4>
                <ul className="background-list">
                  {group.details.map((item, j) => (
                    <li key={j}>
                      <span {...edit('about.backgroundGroups.' + i + '.details.' + j)}>{item}</span>
                      {j === 0 && group.advisors.length > 0 && (
                        <ul className="advisor-list">
                          <li>
                            <span {...edit('about.backgroundGroups.' + i + '.advisorLabel')}>{group.advisorLabel}</span>{' '}
                            {group.advisors.map((advisor, k) => (
                              <React.Fragment key={k}>
                                {k > 0 && ' and '}
                                <a href={advisor.url} target="_blank" rel="noopener noreferrer" {...edit('about.backgroundGroups.' + i + '.advisors.' + k + '.name')}>{advisor.name}</a>
                              </React.Fragment>
                            ))}
                          </li>
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="about-block" aria-labelledby="about-interests">
            <h3 id="about-interests" {...edit('about.researchInterestsTitle')}>{content.researchInterestsTitle}</h3>
            {content.interests.map((interest, i) => (
              <p className="interest-item" key={i}>
                <strong {...edit('about.interests.' + i + '.title')}>{interest.title}</strong>{' '}
                <span {...edit('about.interests.' + i + '.description')}>{interest.description}</span>
              </p>
            ))}
          </div>
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

