import React, { useEffect, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import sr from '@utils/sr';
import { srConfig } from '@config';
import { usePrefersReducedMotion } from '@hooks';

const StyledProjectsGrid = styled.ul`
  ${({ theme }) => theme.mixins.resetList};
`;

const StyledProject = styled.li`
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(250px, 0.82fr);
  gap: 30px;
  align-items: center;
  padding: 28px;
  border: 1px solid var(--lightest-navy);
  border-radius: 12px;
  background-color: var(--white);
  box-shadow: 0 14px 35px -24px var(--navy-shadow);

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 22px;
    padding: 24px;
  }

  @media (max-width: 480px) {
    padding: 20px;
  }

  &:not(:last-of-type) {
    margin-bottom: 48px;

    @media (max-width: 768px) {
      margin-bottom: 42px;
    }

    @media (max-width: 480px) {
      margin-bottom: 30px;
    }
  }

  &:nth-of-type(odd) {
    .project-content {
      order: 2;
    }

    .project-image {
      order: 1;
    }
  }

  &:nth-of-type(even) {
    .project-content {
      order: 1;
    }

    .project-image {
      order: 2;
    }
  }

  @media (max-width: 900px) {
    &:nth-of-type(odd),
    &:nth-of-type(even) {
      .project-content {
        order: 1;
      }

      .project-image {
        order: 2;
      }
    }
  }

  .project-content {
    position: relative;
    display: flex;
    align-items: center;
    min-width: 0;
    z-index: 2;
  }

  .project-overline {
    margin: 10px 0;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    font-weight: 400;
  }

  .project-title {
    margin: 0 0 18px;
    color: var(--lightest-slate);
    font-size: clamp(24px, 5vw, 28px);
    line-height: 1.15;
  }

  .project-description {
    position: relative;
    z-index: 2;
    padding: 0;
    border-radius: var(--border-radius);
    background-color: transparent;
    color: var(--light-slate);
    font-size: var(--fz-lg);
    line-height: 1.45;
    box-shadow: none;

    a {
      ${({ theme }) => theme.mixins.inlineLink};
    }

    strong {
      color: var(--lightest-slate);
      font-weight: 600;
    }
  }

  .project-tech-list {
    display: flex;
    flex-wrap: wrap;
    position: relative;
    z-index: 2;
    margin: 25px 0 10px;
    padding: 0;
    list-style: none;

    li {
      margin: 0 10px 5px 0;
      color: var(--light-slate);
      font-family: var(--font-mono);
      font-size: var(--fz-xs);
      white-space: normal;
    }

    @media (max-width: 768px) {
      margin: 18px 0 10px;

      li {
        color: var(--light-slate);
      }
    }
  }

  .project-links {
    display: flex;
    align-items: center;
    position: relative;
    margin-top: 10px;
    margin-left: -10px;
    color: var(--lightest-slate);

    a {
      ${({ theme }) => theme.mixins.flexCenter};
      padding: 10px;

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

    .cta {
      ${({ theme }) => theme.mixins.smallButton};
      margin: 10px;
    }
  }

  .project-image {
    position: relative;
    z-index: 1;
    overflow: hidden;
    min-width: 0;
    align-self: stretch;
    border: 1px solid var(--lightest-navy);
    border-radius: 10px;
    background-color: var(--navy);

    @media (max-width: 900px) {
      align-self: auto;
    }

    .img {
      height: 100%;
      min-height: 280px;
      border-radius: 0;
      mix-blend-mode: normal;
      filter: none;

      @media (max-width: 900px) {
        object-fit: cover;
        width: 100%;
        min-height: 210px;
        filter: none;
      }

      @media (max-width: 480px) {
        min-height: 170px;
      }
    }
  }
`;

const Featured = () => {
  const data = useStaticQuery(graphql`
    {
      featured: allMarkdownRemark(
        filter: {
          fileAbsolutePath: { regex: "/content/featured/" }
          frontmatter: { personalized: { eq: true } }
        }
        sort: { fields: [frontmatter___date], order: ASC }
      ) {
        edges {
          node {
            frontmatter {
              title
              cover {
                childImageSharp {
                  gatsbyImageData(width: 700, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
                }
              }
              tech
            }
            html
          }
        }
      }
    }
  `);

  const featuredProjects = data.featured.edges.filter(({ node }) => node);
  const revealTitle = useRef(null);
  const revealProjects = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealTitle.current, srConfig());
    revealProjects.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
  }, []);

  return (
    <section id="projects">
      <h2 className="numbered-heading" ref={revealTitle}>
        Research Projects
      </h2>

      <StyledProjectsGrid>
        {featuredProjects &&
          featuredProjects.map(({ node }, i) => {
            const { frontmatter, html } = node;
            const { title, tech, cover } = frontmatter;
            const image = getImage(cover);

            return (
              <StyledProject key={i} ref={el => (revealProjects.current[i] = el)}>
                <div className="project-content">
                  <div>
                    <p className="project-overline">Selected Research</p>

                    <h3 className="project-title">
                      <span>{title}</span>
                    </h3>

                    <div
                      className="project-description"
                      dangerouslySetInnerHTML={{ __html: html }}
                    />

                    {tech.length && (
                      <ul className="project-tech-list">
                        {tech.map((tech, i) => (
                          <li key={i}>{tech}</li>
                        ))}
                      </ul>
                    )}

                    <div className="project-links" />
                  </div>
                </div>

                <div className="project-image">
                  <GatsbyImage image={image} alt={title} className="img" />
                </div>
              </StyledProject>
            );
          })}
      </StyledProjectsGrid>
    </section>
  );
};

export default Featured;
