import React from 'react';
import styled from 'styled-components';
import { Icon } from '@components/icons';
import { useSite } from '../../context/site';

// Author name to highlight in each publication's author list.
const MY_NAME = 'S. Zhu';

const highlightName = authors => {
  if (!authors || !authors.includes(MY_NAME)) {
    return authors;
  }
  const parts = authors.split(MY_NAME);
  return parts.map((part, i) => (
    <React.Fragment key={i}>
      {part}
      {i < parts.length - 1 && <strong className="my-name">{MY_NAME}</strong>}
    </React.Fragment>
  ));
};

const StyledProjectsSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    font-size: clamp(24px, 5vw, var(--fz-heading));
  }

  .publication-list {
    ${({ theme }) => theme.mixins.resetList};
    display: flex;
    flex-direction: column;
    gap: 14px;
    width: 100%;
    max-width: 900px;
    margin-top: 40px;
  }
`;

const StyledProject = styled.li`
  position: relative;
  transition: var(--transition);

  @media (prefers-reduced-motion: no-preference) {
    &:hover,
    &:focus-within {
      .project-inner {
        transform: translateY(-3px);
      }
    }
  }

  a {
    position: relative;
    z-index: 1;
  }

  .project-inner {
    ${({ theme }) => theme.mixins.boxShadow};
    display: grid;
    grid-template-columns: 56px minmax(0, 1fr) auto;
    column-gap: 20px;
    align-items: start;
    position: relative;
    padding: 22px 26px;
    border-radius: var(--border-radius);
    background-color: var(--light-navy);
    transition: var(--transition);
  }

  .project-year {
    padding-top: 3px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
  }

  .project-title {
    margin: 0 0 8px;
    color: var(--lightest-slate);
    font-size: var(--fz-xl);
    line-height: 1.3;

    a {
      position: static;

      &:before {
        content: '';
        display: block;
        position: absolute;
        z-index: 0;
        pointer-events: none;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
      }
    }
  }

  .project-authors {
    margin: 0 0 4px;
    color: var(--light-slate);
    font-size: var(--fz-sm);
    line-height: 1.4;

    .my-name {
      color: var(--lightest-slate);
      font-weight: 700;
    }
  }

  .project-venue {
    margin: 0;
    color: var(--slate);
    font-size: var(--fz-sm);
    font-style: italic;
    line-height: 1.4;
  }

  .project-tech-list {
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    margin: 12px 0 0 0;
    list-style: none;

    li {
      color: var(--slate);
      font-family: var(--font-mono);
      font-size: var(--fz-xxs);
      line-height: 1.75;

      &:not(:last-of-type) {
        margin-right: 15px;
      }
    }
  }

  .project-links {
    display: flex;
    align-items: center;
    margin-right: -7px;
    color: var(--light-slate);

    a {
      ${({ theme }) => theme.mixins.flexCenter};
      padding: 2px 7px;

      &:hover,
      &:focus {
        color: var(--green);
      }

      svg {
        width: 20px;
        height: 20px;
      }
    }
  }

  @media (max-width: 600px) {
    .project-inner {
      grid-template-columns: minmax(0, 1fr) auto;
      row-gap: 6px;
      padding: 20px;
    }

    .project-year {
      grid-column: 1 / 2;
      grid-row: 1;
      padding-top: 0;
    }

    .project-links {
      grid-column: 2 / 3;
      grid-row: 1;
    }

    .project-body {
      grid-column: 1 / -1;
    }
  }
`;

const Projects = () => {
  const { config, edit, preview } = useSite();
  const publications = config.publications.items;

  // Show every publication, in the order they are listed in the site config (newest first).
  const projectsToShow = publications.map((publication, index) => ({ ...publication, index }));

  const projectInner = publication => {
    const { year, title, authors, venue, keywords, url, index } = publication;

    return (
      <div className="project-inner">
        <div className="project-year">{year}</div>

        <div className="project-body">
          <h3 className="project-title">
            {url ? (
              <a href={url} target="_blank" rel="noreferrer">
                <span {...edit('publications.items.' + index + '.title')}>{title}</span>
              </a>
            ) : (
              <span {...edit('publications.items.' + index + '.title')}>{title}</span>
            )}
          </h3>

          <p className="project-authors" {...edit('publications.items.' + index + '.authors')}>
            {preview ? authors : highlightName(authors)}
          </p>
          <p className="project-venue" {...edit('publications.items.' + index + '.venue')}>{venue}</p>

          {keywords && keywords.length > 0 && (
            <ul className="project-tech-list">
              {keywords.map((keyword, i) => (
                <li key={i} {...edit('publications.items.' + index + '.keywords.' + i)}>{keyword}</li>
              ))}
            </ul>
          )}
        </div>

        <div className="project-links">
          {url && (
            <a href={url} aria-label="External Link" className="external" target="_blank" rel="noreferrer">
              <Icon name="External" />
            </a>
          )}
        </div>
      </div>
    );
  };

  return (
    <StyledProjectsSection id="publications">
      <h2 {...edit('publications.title')}>{config.publications.title}</h2>

      <ul className="publication-list">
        {projectsToShow.map(publication => (
          <StyledProject key={publication.index}>{projectInner(publication)}</StyledProject>
        ))}
      </ul>
    </StyledProjectsSection>
  );
};

export default Projects;
