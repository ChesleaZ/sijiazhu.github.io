import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import sr from '@utils/sr';
import { srConfig } from '@config';
import { usePrefersReducedMotion } from '@hooks';

const researchItems = [
  {
    institution: 'Massachusetts General Hospital',
    role: 'Research Collaborator',
    range: 'June 2026 - Present',
    topic: 'Pathway-Independent Genetic Signals in Type 2 Diabetes Clusters',
    tags: ['Type 2 diabetes', 'Polygenic scores', 'Genetic clustering'],
    bullets: [
      'Investigating whether data-driven genetic clusters in type 2 diabetes capture biological information beyond curated pathway-based polygenic scores.',
      'Constructing individual-level cluster-specific scores from variant-level disease clusters and comparing them with pathway-based pPGS derived from Reactome and KEGG.',
      'Studying whether residual cluster signals can reveal novel or cross-pathway disease mechanisms.',
    ],
  },
  {
    institution: 'Harvard T.H. Chan School of Public Health',
    role: 'Research Assistant',
    range: 'February 2026 - Present',
    topic: 'Scaling Laws in Single-Cell Representation Learning',
    tags: ['Single-cell multi-omics', 'Random Matrix Theory', 'Representation learning'],
    bullets: [
      'Applying Random Matrix Theory to derive mutual-information-based measures for biological signal recovery in single-cell multi-omics data.',
      'Developing theoretical scaling laws for cell number, sequencing depth, and batch effects in single-cell data.',
      'Conducting real-data analyses to evaluate how representation learning embeddings recover biological information.',
    ],
  },
  {
    institution: 'Johns Hopkins University',
    role: 'Research Assistant',
    range: 'October 2025 - February 2026',
    topic: 'Survival Analysis in Oncology Clinical Trials',
    tags: ['Survival analysis', 'Cox modeling', 'Clinical trials'],
    bullets: [
      'Performed survival analysis on multi-arm oncology clinical trial data.',
      'Constructed time-to-event endpoints for staggered therapy initiation, treatment discontinuation, and right-censoring.',
      'Conducted Kaplan-Meier analysis, median survival estimation, and Cox proportional hazards modeling with clinical covariates.',
    ],
  },
  {
    institution: 'The Chinese University of Hong Kong',
    role: 'Research Assistant',
    range: 'May 2022 - January 2023',
    topic: 'Single-Cell Sequencing Analysis of Blood Tissue Samples',
    tags: ['Single-cell analysis', 'Leiden clustering', 'Cell annotation'],
    bullets: [
      'Analyzed single-cell sequencing data from blood tissue samples to study cellular-level molecular profiles.',
      'Used PCA and Leiden clustering to identify heterogeneous cell populations and annotate cells with marker genes.',
      'Applied cellular enrichment analysis to connect marker genes with disease-related biological signals.',
    ],
  },
];

const academicItems = [
  {
    title: 'Teaching Assistant',
    institution: 'Johns Hopkins University',
    details: ['Bayesian Statistics'],
  },
  {
    title: 'Peer Reviewer',
    institution: 'Academic Service',
    details: [
      'Current Medical Imaging',
      'CMC-Computers, Materials & Continua',
      'Journal of Intelligent & Fuzzy Systems',
      'Journal of Computer Science',
      'Journal of Fuzzy Logic and Modeling in Engineering',
    ],
  },
];

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
    background-color: var(--white);
    box-shadow: 0 14px 35px -24px var(--navy-shadow);

    @media (max-width: 600px) {
      padding: 22px;
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
    background-color: var(--white);
    box-shadow: 0 14px 35px -24px var(--navy-shadow);

    @media (max-width: 600px) {
      padding: 22px;
    }
  }
`;

const Research = () => {
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
        <h3 className="section-heading">Research</h3>
        <ul className="research-list">
          {researchItems.map(({ institution, role, range, topic, tags, bullets }, i) => (
            <li
              className="research-card"
              key={institution}
              ref={el => (revealItems.current[i] = el)}>
              <p className="research-meta">{range}</p>
              <h3>{topic}</h3>
              <p className="institution">
                <strong>{role}</strong>, {institution}
              </p>
              <ul className="details">
                {bullets.map(bullet => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
              <ul className="tag-list">
                {tags.map(tag => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>

      <div className="experience-group">
        <h3 className="section-heading">Academic</h3>
        <ul className="academic-list">
          {academicItems.map(({ title, institution, details }, i) => (
            <li
              className="academic-card"
              key={title}
              ref={el => (revealAcademicItems.current[i] = el)}>
              <p className="research-meta">{institution}</p>
              <h3>{title}</h3>
              <ul className="details">
                {details.map(detail => (
                  <li key={detail}>{detail}</li>
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
