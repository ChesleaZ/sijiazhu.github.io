import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { withPrefix } from 'gatsby';
import { useSite } from '../context/site';
import '../../static/science/backdrop.css';
import positionEditor from '../../static/science/position-editor';

const motifs = [
  ['network', '0 0 230 150'], ['cells', '0 0 175 145'],
  ['surface', '0 0 245 195'], ['umap', '0 0 214 186'],
  ['objective', '0 0 586 86'], ['attention', '0 0 566 102'],
  ['robot', '0 0 125 143'], ['tubes', '0 0 133 148'],
];

const ScienceBackdrop = ({ page }) => {
  const { config, preview } = useSite();
  const layer = useRef(null);
  const settings = config[page] || config.home;
  useEffect(() => {
    if (!preview || !settings.backgroundEnabled || !layer.current) return undefined;
    const controller = positionEditor.attach(layer.current);
    return () => controller.destroy();
  }, [page, preview, settings.backgroundEnabled]);
  if (!settings.backgroundEnabled) return null;
  return (
    <div ref={layer} className="science-backdrop" aria-hidden="true" data-page={page}
      data-animated={String(settings.backgroundAnimated && settings.backgroundOpacity > 0)}
      style={{ '--science-opacity': settings.backgroundOpacity / 100 }}>
      {motifs.map(([id, viewBox]) => (
        <div className={'science-motif science-' + id} key={id} data-artwork={id}
          data-position-x={settings.backgroundPositions[id].x} data-position-y={settings.backgroundPositions[id].y}
          style={{ '--science-dx': settings.backgroundPositions[id].x + 'vw', '--science-dy': settings.backgroundPositions[id].y + 'vh' }}>
          <svg viewBox={viewBox} fill="none" stroke="currentColor" strokeWidth="1.4" focusable="false">
            <use href={withPrefix('/science/motifs.svg?v=neural-20261018#' + id)} />
          </svg>
        </div>
      ))}
    </div>
  );
};
ScienceBackdrop.propTypes = { page: PropTypes.string.isRequired };
export default ScienceBackdrop;

