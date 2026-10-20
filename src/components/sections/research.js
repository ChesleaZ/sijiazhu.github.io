import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { withPrefix } from 'gatsby';
import sr from '@utils/sr';
import { srConfig } from '@config';
import { usePrefersReducedMotion } from '@hooks';
import { useSite } from '../../context/site';

const StyledResearchSection = styled.section`
  max-width: 960px;

  .section-heading {
    margin: 0 0 24px;
    color: var(--lightest-slate);
    font-size: clamp(28px, 4vw, 38px);
  }

  .experience-group:not(:last-of-type) {
    margin-bottom: 72px;
  }

  .research-list {
    ${({ theme }) => theme.mixins.resetList};
    display: grid;
    gap: 28px;
  }

  .research-card {
    padding: 28px;
    border: 1px solid var(--lightest-navy);
    border-radius: 10px;
    background-color: var(--surface);
    box-shadow: 0 14px 35px -24px var(--navy-shadow);

    @media (max-width: 600px) {
      padding: 22px;
    }
  }

  .research-card.has-image {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 240px;
    gap: 28px;
    align-items: start;

    @media (max-width: 760px) {
      grid-template-columns: 1fr;
      gap: 20px;
    }
  }

  .research-card.compact {
    position: relative;
    grid-template-columns: minmax(0, 1fr) 280px;
    gap: 40px;
    align-items: stretch;
    padding: 32px;
    transition: border-color 0.25s ease, box-shadow 0.25s ease;

    &:hover,
    &:focus-within {
      border-color: var(--green);
      box-shadow: 0 18px 40px -26px var(--green);

      h3 a {
        color: var(--green);
      }
    }

    .research-body {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 24px;
    }

    h3 {
      margin: 0;
      line-height: 1.25;
    }

    /* Make the whole card clickable through the title link. */
    h3 a {
      position: static;
    }

    h3 a::after {
      content: '';
      position: absolute;
      inset: 0;
      z-index: 1;
    }

    .tag-list {
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
      margin-top: 0;
    }

    .tag-list li {
      padding: 4px 12px;
      border: 1px solid rgba(122, 216, 199, 0.35);
      border-radius: 999px;
      background-color: rgba(122, 216, 199, 0.08);
    }

    .research-figure {
      align-self: center;
      padding: 8px;

      &:hover,
      &:focus {
        transform: none;
      }
    }

    @media (max-width: 760px) {
      grid-template-columns: 1fr;
      gap: 24px;
      padding: 22px;

      .research-figure {
        max-width: 340px;
      }
    }
  }

  .research-figure {
    display: block;
    padding: 10px;
    border: 1px solid var(--lightest-navy);
    border-radius: 8px;
    background-color: #fff;
    transition: var(--transition);

    &:hover,
    &:focus {
      transform: translateY(-2px);
      border-color: var(--green);
    }

    img {
      display: block;
      width: 100%;
      height: auto;
    }

    @media (max-width: 760px) {
      max-width: 320px;
    }
  }

  h3 a {
    color: inherit;

    &:hover,
    &:focus {
      color: var(--green);
    }
  }

  .research-meta {
    margin: 0 0 10px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
  }

  h3 {
    margin: 0 0 8px;
    color: var(--lightest-slate);
    font-size: clamp(24px, 4vw, 30px);
    line-height: 1.2;
  }

  .institution {
    margin: 0 0 18px;
    color: var(--slate);
    font-size: var(--fz-md);
  }

  .institution strong {
    color: var(--lightest-slate);
    font-weight: 600;
  }

  ul.details {
    ${({ theme }) => theme.mixins.fancyList};
    margin: 0;
  }

  .tag-list {
    ${({ theme }) => theme.mixins.resetList};
    display: flex;
    flex-wrap: wrap;
    gap: 8px 12px;
    margin-top: 22px;
  }

  .tag-list li {
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
  }

  .academic-list {
    ${({ theme }) => theme.mixins.resetList};
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 24px;

    @media (max-width: 760px) {
      grid-template-columns: 1fr;
    }
  }

  .academic-card {
    padding: 28px;
    border: 1px solid var(--lightest-navy);
    border-radius: 10px;
    background-color: var(--surface);
    box-shadow: 0 14px 35px -24px var(--navy-shadow);

    @media (max-width: 600px) {
      padding: 22px;
    }
  }
`;

const Research = () => {
  const { config, edit } = useSite();
  const researchItems = config.research.items;
  const academicItems = config.research.academicItems;
  const revealItems = useRef([]);
  const revealAcademicItems = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    revealItems.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
    revealAcademicItems.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
  }, []);

  return (
    <StyledResearchSection id="research">
      <div className="experience-group">
        <h3 className="section-heading" {...edit('research.heading')}>{config.research.heading}</h3>
        <ul className="research-list">
          {researchItems.map(({ institution, role, topic, tags, bullets, image, detailUrl }, i) => {
            const detailHref = detailUrl ? withPrefix('/' + detailUrl.replace(/^\/+/, '')) : '';
            const imageSrc = image ? withPrefix('/' + image.replace(/^\/+/, '')) : '';
            // Projects with a detail page show only title, figure and keywords; the full write-up lives on the detail page.
            const compact = Boolean(detailHref);
            return (
              <li
                className={'research-card' + (imageSrc ? ' has-image' : '') + (compact ? ' compact' : '')}
                key={i}
                ref={el => (revealItems.current[i] = el)}>
                <div className="research-body">
                  <h3>
                    {detailHref ? (
                      <a href={detailHref} {...edit('research.items.' + i + '.topic')}>{topic}</a>
                    ) : (
                      <span {...edit('research.items.' + i + '.topic')}>{topic}</span>
                    )}
                  </h3>
                  {!compact && (
                    <>
                      <p className="institution">
                        <strong {...edit('research.items.' + i + '.role')}>{role}</strong>, <span {...edit('research.items.' + i + '.institution')}>{institution}</span>
                      </p>
                      <ul className="details">
                        {bullets.map((bullet, j) => (
                          <li key={j} {...edit('research.items.' + i + '.bullets.' + j)}>{bullet}</li>
                        ))}
                      </ul>
                    </>
                  )}
                  <ul className="tag-list">
                    {tags.map((tag, j) => (
                      <li key={j} {...edit('research.items.' + i + '.tags.' + j)}>{tag}</li>
                    ))}
                  </ul>
                </div>
                {imageSrc && (
                  <a className="research-figure" href={detailHref || imageSrc} aria-label={'Open ' + topic}>
                    <img src={imageSrc} alt={'Overview figure for ' + topic} loading="lazy" />
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="experience-group">
        <h3 className="section-heading" {...edit('research.academicHeading')}>{config.research.academicHeading}</h3>
        <ul className="academic-list">
          {academicItems.map(({ title, institution, details }, i) => (
            <li
              className="academic-card"
              key={i}
              ref={el => (revealAcademicItems.current[i] = el)}>
              <p className="research-meta" {...edit('research.academicItems.' + i + '.institution')}>{institution}</p>
              <h3 {...edit('research.academicItems.' + i + '.title')}>{title}</h3>
              <ul className="details">
                {details.map((detail, j) => (
                  <li key={j} {...edit('research.academicItems.' + i + '.details.' + j)}>{detail}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </StyledResearchSection>
  );
};

export default Research;

