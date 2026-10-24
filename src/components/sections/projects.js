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

  .publication-years {
    width: 100%;
    max-width: 900px;
    margin-top: 40px;
  }

  .publication-year-group + .publication-year-group {
    margin-top: 44px;
  }

  .publication-year-heading {
    display: flex;
    align-items: center;
    gap: 16px;
    margin: 0 0 16px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-lg);
    font-weight: 400;

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

  // Group publications by year, keeping the order they are listed in the site config (newest first).
  const yearGroups = [];
  publications.forEach((publication, index) => {
    const year = String(publication.year || '').trim() || 'Other';
    let group = yearGroups.find(g => g.year === year);
    if (!group) {
      group = { year, items: [] };
      yearGroups.push(group);
    }
    group.items.push({ ...publication, index });
  });

  const projectInner = publication => {
    const { title, authors, venue, url, index } = publication;

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
          <p className="project-venue" {...edit('publications.items.' + index + '.venue')}>{venue}</p>
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
        {yearGroups.map(group => (
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
