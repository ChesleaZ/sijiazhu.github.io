import React from 'react';
import PropTypes from 'prop-types';
import { withPrefix } from 'gatsby';
import { useSite } from '../context/site';
import '../../static/science/backdrop.css';

const motifs = [
  ['network', '0 0 230 150'], ['cells', '0 0 175 145'],
  ['surface', '0 0 245 195'], ['umap', '0 0 214 186'],
  ['objective', '0 0 586 86'], ['attention', '0 0 566 102'],
  ['robot', '0 0 125 143'], ['tubes', '0 0 133 148'],
];

const ScienceBackdrop = ({ page }) => {
  const { config } = useSite();
  const settings = config[page] || config.home;
  if (!settings.backgroundEnabled) return null;
  return (
    <div className="science-backdrop" aria-hidden="true" data-page={page}
      data-animated={String(settings.backgroundAnimated && settings.backgroundOpacity > 0)}
      style={{ '--science-opacity': settings.backgroundOpacity / 100 }}>
      {motifs.map(([id, viewBox]) => (
        <div className={'science-motif science-' + id} key={id}>
          <svg viewBox={viewBox} fill="none" stroke="currentColor" strokeWidth="1.4" focusable="false">
            <use href={withPrefix('/science/motifs.svg?v=curves-20261018#' + id)} />
          </svg>
        </div>
      ))}
    </div>
  );
};
ScienceBackdrop.propTypes = { page: PropTypes.string.isRequired };
export default ScienceBackdrop;
