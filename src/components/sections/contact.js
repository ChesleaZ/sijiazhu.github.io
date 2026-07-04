import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig, email } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledContactSection = styled.section`
  max-width: 680px;
  margin: 0 auto 100px;
  text-align: center;

  @media (max-width: 768px) {
    margin: 0 auto 50px;
  }

  .overline {
    display: block;
    margin-bottom: 20px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-md);
    font-weight: 400;

    &:before {
      bottom: 0;
      font-size: var(--fz-sm);
    }

    &:after {
      display: none;
    }
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
    max-width: 560px;
    margin: 36px auto 0;
    text-align: left;
  }

  .contact-list li {
    display: grid;
    grid-template-columns: 140px minmax(0, 1fr);
    gap: 16px;
    align-items: baseline;
    padding: 18px 20px;
    border: 1px solid var(--lightest-navy);
    border-radius: 8px;
    background-color: var(--white);

    @media (max-width: 560px) {
      grid-template-columns: 1fr;
      gap: 6px;
    }
  }

  .label {
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
  }

  .contact-list a {
    ${({ theme }) => theme.mixins.inlineLink};
    min-width: 0;
    overflow-wrap: anywhere;
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
      <h2 className="numbered-heading overline">Contact</h2>

      <h2 className="title">Get In Touch</h2>

      <p>
        I am happy to connect about biostatistics, biomedical data science, research collaborations,
        and graduate study.
      </p>

      <ul className="contact-list">
        <li>
          <span className="label">Email</span>
          <a href={`mailto:${email}`}>{email}</a>
        </li>
        <li>
          <span className="label">LinkedIn</span>
          <a href="https://www.linkedin.com/in/sijia-zhu-66862a307/">
            linkedin.com/in/sijia-zhu-66862a307
          </a>
        </li>
        <li>
          <span className="label">Google Scholar</span>
          <a href="https://scholar.google.com/citations?user=hN1J4bUAAAAJ&hl=en">
            scholar.google.com/citations?user=hN1J4bUAAAAJ
          </a>
        </li>
      </ul>
    </StyledContactSection>
  );
};

export default Contact;
