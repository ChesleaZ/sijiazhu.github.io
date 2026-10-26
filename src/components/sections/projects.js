import React from 'react';
import styled from 'styled-components';
import { Icon } from '@components/icons';
import { useSite } from '../../context/site';

// Author names to highlight in each publication's author list.
const MY_NAMES = /(Sijia Zhu|S\. Zhu)/;

const highlightName = authors => {
  if (!authors || !MY_NAMES.test(authors)) {
    return authors;
  }
  return authors.split(MY_NAMES).map((part, i) =>
    i % 2 === 1 ? (
      <strong className="my-name" key={i}>
        {part}
      </strong>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    ),
  );
};

// Show the journal name in the venue line in the accent colour.
// "Submitted to Cell" -> "Submitted to " + [Cell]; "Journal, date" -> [Journal] + ", date".
const VENUE_PREFIX = /^(Submitted to |Under review at |Accepted at |Accepted in )/i;

const formatVenue = venue => {
  if (!venue || /^manuscript\b/i.test(venue)) {
    return venue;
  }
  const prefixMatch = venue.match(VENUE_PREFIX);
  const prefix = prefixMatch ? prefixMatch[0] : '';
  const rest = venue.slice(prefix.length);
  // Split off a trailing date such as ", August 9, 2026" (journal names can contain commas).
  const dateMatch = rest.match(/^(.*?)(,\s+(?:[A-Z][a-z]+\s+\d{1,2},\s+)?\d{4}.*)$/);
  const journal = dateMatch ? dateMatch[1] : rest;
  const suffix = dateMatch ? dateMatch[2] : '';
  return (
    <>
      {prefix}
      <span className="venue-journal">{journal}</span>
      {suffix}
    </>
  );
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
    font-size: 24px;
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
    border: 1px solid transparent;
    background-color: var(--light-navy);
    cursor: pointer;
    transition: var(--transition);
  }

  &:hover .project-inner,
  &:focus-within .project-inner {
    border-color: var(--green);
    box-shadow: 0 18px 40px -26px var(--green);
  }

  &:hover .project-title a,
  &:focus-within .project-title a {
    color: var(--green);
  }

  .project-title {
    margin: 0 0 8px;
    color: var(--lightest-slate);
    font-size: var(--fz-xxl);
    line-height: 1.3;

    a {
      position: static;

      /* Stretch the title link over the whole card so the card is clickable. */
      &:before {
        content: '';
        display: block;
        position: absolute;
        z-index: 1;
        inset: 0;
        border-radius: inherit;
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

    .venue-journal {
      color: var(--green);
      font-style: normal;
      font-weight: 600;
    }
  }

  .project-links {
    position: relative;
    z-index: 2;
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
          <p className="project-venue" {...edit('publications.items.' + index + '.venue')}>
            {preview ? venue : formatVenue(venue)}
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
