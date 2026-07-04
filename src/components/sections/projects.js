import React, { useEffect, useRef } from 'react';
import { Link } from 'gatsby';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { Icon } from '@components/icons';
import { usePrefersReducedMotion } from '@hooks';
import publications from '../../data/publications';

const StyledProjectsSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    font-size: clamp(24px, 5vw, var(--fz-heading));
  }

  .archive-link {
    ${({ theme }) => theme.mixins.button};
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-top: 18px;
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
    line-height: 1;
  }

  .projects-grid {
    ${({ theme }) => theme.mixins.resetList};
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 15px;
    position: relative;
    margin-top: 50px;

    @media (max-width: 1080px) {
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }
  }

  .more-button {
    ${({ theme }) => theme.mixins.button};
    margin: 80px auto 0;
  }
`;

const StyledProject = styled.li`
  position: relative;
  cursor: default;
  transition: var(--transition);

  @media (prefers-reduced-motion: no-preference) {
    &:hover,
    &:focus-within {
      .project-inner {
        transform: translateY(-7px);
      }
    }
  }

  a {
    position: relative;
    z-index: 1;
  }

  .project-inner {
    ${({ theme }) => theme.mixins.boxShadow};
    ${({ theme }) => theme.mixins.flexBetween};
    flex-direction: column;
    align-items: flex-start;
    position: relative;
    height: 100%;
    padding: 2rem 1.75rem;
    border-radius: var(--border-radius);
    background-color: var(--light-navy);
    transition: var(--transition);
    overflow: auto;
  }

  .project-top {
    ${({ theme }) => theme.mixins.flexBetween};
    margin-bottom: 35px;

    .folder {
      color: var(--green);
      svg {
        width: 40px;
        height: 40px;
      }
    }

    .project-links {
      display: flex;
      align-items: center;
      margin-right: -10px;
      color: var(--light-slate);

      a {
        ${({ theme }) => theme.mixins.flexCenter};
        padding: 5px 7px;

        &.external {
          svg {
            width: 22px;
            height: 22px;
            margin-top: -4px;
          }
        }

        svg {
          width: 20px;
          height: 20px;
        }
      }
    }
  }

  .project-title {
    margin: 0 0 10px;
    color: var(--lightest-slate);
    font-size: var(--fz-xxl);

    a {
      position: static;

      &:before {
        content: '';
        display: block;
        position: absolute;
        z-index: 0;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
      }
    }
  }

  .project-description {
    color: var(--light-slate);
    font-size: 17px;

    a {
      ${({ theme }) => theme.mixins.inlineLink};
    }
  }

  .project-authors {
    margin: 0 0 12px;
    color: var(--light-slate);
    font-size: var(--fz-sm);
    line-height: 1.35;
  }

  .project-venue {
    margin: 0;
    color: var(--slate);
    font-size: var(--fz-md);
    line-height: 1.35;
  }

  .project-tech-list {
    display: flex;
    align-items: flex-end;
    flex-grow: 1;
    flex-wrap: wrap;
    padding: 0;
    margin: 20px 0 0 0;
    list-style: none;

    li {
      font-family: var(--font-mono);
      font-size: var(--fz-xxs);
      line-height: 1.75;

      &:not(:last-of-type) {
        margin-right: 15px;
      }
    }
  }
`;

const Projects = () => {
  const revealTitle = useRef(null);
  const revealArchiveLink = useRef(null);
  const revealProjects = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealTitle.current, srConfig());
    sr.reveal(revealArchiveLink.current, srConfig());
    revealProjects.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
  }, []);

  const GRID_LIMIT = 6;
  const projectsToShow = publications.filter(publication => publication.selected).slice(0, GRID_LIMIT);

  const projectInner = publication => {
    const { title, authors, venue, keywords, url } = publication;

    return (
      <div className="project-inner">
        <header>
          <div className="project-top">
            <div className="folder">
              <Icon name="Folder" />
            </div>
            <div className="project-links">
              <a href={url} aria-label="External Link" className="external" target="_blank" rel="noreferrer">
                <Icon name="External" />
              </a>
            </div>
          </div>

          <h3 className="project-title">
            <a href={url} target="_blank" rel="noreferrer">
              {title}
            </a>
          </h3>

          <p className="project-authors">{authors}</p>
          <p className="project-venue">{venue}</p>
        </header>

        <footer>
          {keywords && (
            <ul className="project-tech-list">
              {keywords.map((keyword, i) => (
                <li key={i}>{keyword}</li>
              ))}
            </ul>
          )}
        </footer>
      </div>
    );
  };

  return (
    <StyledProjectsSection>
      <h2 ref={revealTitle}>Selected Publication</h2>

      <Link className="archive-link" to="/archive" ref={revealArchiveLink}>
        View all
      </Link>

      <ul className="projects-grid">
        {prefersReducedMotion ? (
          <>
            {projectsToShow &&
              projectsToShow.map((publication, i) => (
                <StyledProject key={publication.title}>{projectInner(publication)}</StyledProject>
              ))}
          </>
        ) : (
          <TransitionGroup component={null}>
            {projectsToShow &&
              projectsToShow.map((publication, i) => (
                <CSSTransition
                  key={publication.title}
                  classNames="fadeup"
                  timeout={300}
                  exit={false}>
                  <StyledProject
                    key={publication.title}
                    ref={el => (revealProjects.current[i] = el)}
                    style={{
                      transitionDelay: `${i * 100}ms`,
                    }}>
                    {projectInner(publication)}
                  </StyledProject>
                </CSSTransition>
              ))}
          </TransitionGroup>
        )}
      </ul>
    </StyledProjectsSection>
  );
};

export default Projects;
