import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig, email } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';
import { IconLinkedin } from '@components/icons';

const IconMail = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <title>Email</title>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const IconScholar = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <title>Google Scholar</title>
    <path d="M22 10L12 5 2 10l10 5 10-5z" />
    <path d="M6 12v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5" />
  </svg>
);

const StyledContactSection = styled.section`
  max-width: 680px;
  margin: 0 auto 100px;
  text-align: center;

  @media (max-width: 768px) {
    margin: 0 auto 50px;
  }

  .title {
    font-size: clamp(40px, 5vw, 60px);
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }

  .contact-list {
    ${({ theme }) => theme.mixins.resetList};
    display: grid;
    gap: 16px;
    max-width: 760px;
    margin: 36px auto 0;
    text-align: left;
  }

  .contact-card {
    display: grid;
    grid-template-columns: 24px minmax(0, 1fr) 24px;
    gap: 22px;
    align-items: center;
    padding: 22px 24px;
    border: 1px solid var(--lightest-navy);
    border-radius: 8px;
    background-color: var(--white);
    color: var(--slate);
    text-decoration: none;
    transition: var(--transition);

    &:hover,
    &:focus {
      border-color: var(--green);
      transform: translateY(-2px);
      box-shadow: 0 14px 35px -24px var(--navy-shadow);

      .arrow {
        transform: translateX(4px);
      }
    }

    @media (max-width: 560px) {
      grid-template-columns: 22px minmax(0, 1fr) 20px;
      gap: 14px;
      padding: 18px;
    }
  }

  .icon {
    color: var(--green);
  }

  .icon svg {
    width: 22px;
    height: 22px;
  }

  .label {
    display: block;
    margin-bottom: 4px;
    color: var(--light-slate);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
  }

  .value {
    display: block;
    color: var(--slate);
    font-size: var(--fz-lg);
    line-height: 1.2;
  }

  .arrow {
    justify-self: end;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-xl);
    line-height: 1;
    transition: var(--transition);
  }
`;

const Contact = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  return (
    <StyledContactSection id="contact" ref={revealContainer}>
      <h2 className="title">Get In Touch</h2>

      <p>
        I am happy to connect about biostatistics, biomedical data science, research collaborations,
        and graduate study.
      </p>

      <ul className="contact-list">
        <li>
          <a className="contact-card" href={`mailto:${email}`}>
            <span className="icon">
              <IconMail />
            </span>
            <span>
              <span className="label">Email</span>
              <span className="value">{email}</span>
            </span>
            <span className="arrow" aria-hidden="true">
              &rarr;
            </span>
          </a>
        </li>
        <li>
          <a className="contact-card" href="https://www.linkedin.com/in/sijia-zhu-66862a307/">
            <span className="icon">
              <IconLinkedin />
            </span>
            <span>
              <span className="label">LinkedIn</span>
              <span className="value">Sijia Zhu</span>
            </span>
            <span className="arrow" aria-hidden="true">
              &rarr;
            </span>
          </a>
        </li>
        <li>
          <a
            className="contact-card"
            href="https://scholar.google.com/citations?user=hN1J4bUAAAAJ&hl=en">
            <span className="icon">
              <IconScholar />
            </span>
            <span>
              <span className="label">Google Scholar</span>
              <span className="value">Google Scholar Profile</span>
            </span>
            <span className="arrow" aria-hidden="true">
              &rarr;
            </span>
          </a>
        </li>
      </ul>
    </StyledContactSection>
  );
};

export default Contact;
