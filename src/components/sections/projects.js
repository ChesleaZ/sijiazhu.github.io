import React from 'react';
import styled from 'styled-components';
import { Icon } from '@components/icons';
import { useSite } from '../../context/site';

// Author name to highlight in each publication's author list.
const MY_NAME = 'S. Zhu';

// Publications from this year on are listed under "Current research".
const CURRENT_FROM_YEAR = 2026;

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
  padding-top: 0;

  h2 {
    font-size: clamp(24px, 5vw, var(--fz-heading));
  }

  .publication-years {
    width: 100%;
    max-width: 900px;
    margin-top: 24px;
  }

  /* Year groups are <section>s; drop the global section padding. */
  .publication-year-group {
    padding: 0;
  }

  .publication-year-group + .publication-year-group {
    margin-top: 22px;
  }

  .publication-year-heading {
    display: flex;
    align-items: center;
    gap: 16px;
    margin: 0 0 12px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: 22px;
    font-weight: 500;

    &:after {
      content: '';
      flex: 1;
      height: 1px;
      background-color: var(--lightest-navy);
    }
  }

  .publication-list {
    ${({ theme }) => theme.mixins.resetList};
    display: flex;
    flex-direction: column;
    gap: 14px;
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
    grid-template-columns: minmax(0, 1fr) auto;
    column-gap: 20px;
    align-items: start;
    position: relative;
    padding: 22px 26px;
    border-radius: var(--border-radius);
    background-color: var(--light-navy);
    transition: var(--transition);
  }

  .project-title {
    margin: 0 0 8px;
    color: var(--lightest-slate);
    font-size: var(--fz-xxl);
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
    margin: 0 0 6px;
    color: var(--light-slate);
    font-size: 17px;
    line-height: 1.5;

    .my-name {
      color: var(--lightest-slate);
      font-weight: 700;
    }
  }

  .project-venue {
    margin: 0;
    color: var(--slate);
    font-size: 15px;
    font-style: italic;
    line-height: 1.5;

    .project-year {
      font-style: normal;
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
      column-gap: 12px;
      padding: 20px;
    }

  }
`;

const Projects = () => {
  const { config, edit, preview } = useSite();
  const publications = config.publications.items;

  // Split publications into current work and earlier work, keeping config order (newest first).
  const yearGroups = [
    { year: 'Current research', items: [] },
    { year: 'Earlier work', items: [] },
  ];
  publications.forEach((publication, index) => {
    const isCurrent = parseInt(publication.year, 10) >= CURRENT_FROM_YEAR;
    yearGroups[isCurrent ? 0 : 1].items.push({ ...publication, index });
  });
  const groupsToShow = yearGroups.filter(group => group.items.length > 0);

  const projectInner = publication => {
    const { year, title, authors, venue, url, index } = publication;

    return (
      <div className="project-inner">
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
          <p className="project-venue">
            <span {...edit('publications.items.' + index + '.venue')}>{venue}</span>
            {year && <span className="project-year">{', '}{year}</span>}
          </p>
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

      <div className="publication-years">
        {groupsToShow.map(group => (
          <section className="publication-year-group" key={group.year}>
            <h3 className="publication-year-heading">{group.year}</h3>
            <ul className="publication-list">
              {group.items.map(publication => (
                <StyledProject key={publication.index}>{projectInner(publication)}</StyledProject>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </StyledProjectsSection>
  );
};

export default Projects;
