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
// Homepage cell atlas: [symbol id, label].
const atlas = [
  ['cancer', 'Cancer cell'],
  ['tcell', 'T cell'],
  ['gpcr', 'GPCR'],
  ['rbc', 'Red blood cell'],
  ['macrophage', 'Macrophage'],
  ['igg', 'IgG antibody'],
  ['stem', 'Stem cell'],
  ['neuron', 'Neuron'],
  ['apoptosis', 'Apoptotic cell'],
  ['bcell', 'B cell'],
  ['ionchannel', 'Ion channel'],
  ['epithelial', 'Epithelial cell'],
  ['nk', 'NK cell'],
  ['dna', 'DNA'],
  ['dendritic', 'Dendritic cell'],
  ['helix', 'α-helix'],
  ['neutrophil', 'Neutrophil'],
  ['tnfr', 'TNF receptor'],
  ['basophil', 'Basophil'],
  ['platelet', 'Platelets'],
  ['monocyte', 'Monocyte'],
  ['protein', 'Protein fold'],
  ['virion', 'Virion'],
  ['polypeptide', 'Polypeptide'],
];
// Deterministic shuffle of repeated blocks so the tiling never lines up into stripes.
const atlasTiles = (() => {
  let seed = 7;
  const rand = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
  const out = [];
  for (let b = 0; b < 10; b += 1) {
    const block = atlas.map((_, i) => i);
    for (let i = block.length - 1; i > 0; i -= 1) {
      const j = Math.floor(rand() * (i + 1));
      [block[i], block[j]] = [block[j], block[i]];
    }
    if (out.length && block[0] === out[out.length - 1]) [block[0], block[1]] = [block[1], block[0]];
    out.push(...block);
  }
  return out;
})();
const sprite = '/science/motifs.svg?v=cells-20261023#';
const atlasSprite = '/science/atlas.svg?v=20261023#atlas-';
const origin = { x: 0, y: 0 };

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
      {page === 'home' ? (
        <div className="science-atlas">
          {atlasTiles.map((index, n) => (
            <div className="atlas-tile" key={n}>
              <svg viewBox="0 0 100 100" focusable="false">
                <use href={withPrefix(atlasSprite + atlas[index][0])} />
              </svg>
              <span>{atlas[index][1]}</span>
            </div>
          ))}
        </div>
      ) : motifs.map(([id, viewBox]) => {
        const position = settings.backgroundPositions[id] || origin;
        return (
        <div className={'science-motif science-' + id} key={id} data-artwork={id}
          data-position-x={position.x} data-position-y={position.y}
          style={{ '--science-dx': position.x + 'vw', '--science-dy': position.y + 'vh' }}>
          <svg viewBox={viewBox} fill="none" stroke="currentColor" strokeWidth="1.4" focusable="false">
            <use href={withPrefix(sprite + id)} />
          </svg>
        </div>
        );
      })}
    </div>
  );
};
ScienceBackdrop.propTypes = { page: PropTypes.string.isRequired };
export default ScienceBackdrop;

