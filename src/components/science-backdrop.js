import React from 'react';
import styled from 'styled-components';
import { useSite } from '../context/site';

const StyledBackdrop = styled.div`
  position: absolute;
  left: 50%;
  top: 0;
  width: 100vw;
  height: 100%;
  transform: translateX(-50%);
  overflow: hidden;
  pointer-events: none;
  user-select: none;
  z-index: 0;
  color: var(--green);
  opacity: var(--science-opacity, .14);
  mask-image: radial-gradient(ellipse 48% 32% at 50% 46%, transparent 20%, #000 90%);

  .motif { position: absolute; }
  svg { display: block; width: 100%; height: auto; overflow: visible; fill: none; stroke: currentColor; stroke-width: 1.6; stroke-linecap: round; stroke-linejoin: round; }
  svg text { fill: currentColor; stroke: none; font-family: Georgia, 'Times New Roman', serif; }
  .network { left: 2.5%; top: 9%; width: clamp(150px, 17vw, 220px); }
  .cells { left: 2.5%; bottom: 12%; width: clamp(125px, 14vw, 180px); }
  .formula-one { left: 33%; top: 10%; width: 185px; color: var(--light-slate); transform: rotate(-5deg); }
  .axes-three { right: 2%; top: 12%; width: 145px; color: var(--light-slate); }
  .axes-two { left: 24%; bottom: 5%; width: 170px; color: var(--light-slate); }
  .tubes { left: 57%; bottom: 5%; width: 105px; transform: rotate(9deg); }
  .robot { right: 3%; bottom: 9%; width: 118px; }
  .formula-two { right: 30%; bottom: 2%; width: 145px; color: var(--light-slate); transform: rotate(3deg); }

  &[data-animated='true'] .network .drift,
  &[data-animated='true'] .cells .drift,
  &[data-animated='true'] .robot .drift { animation: scienceDrift 22s ease-in-out infinite alternate; transform-origin: center; }
  &[data-animated='true'] .cells .drift { animation-duration: 26s; animation-delay: -9s; }
  &[data-animated='true'] .robot .drift { animation-duration: 24s; animation-delay: -5s; }
  &[data-animated='true'] .signal { animation: scienceSignal 9s ease-in-out infinite alternate; }
  @keyframes scienceDrift { from { transform: translateY(0) rotate(-1deg); } to { transform: translateY(-7px) rotate(1deg); } }
  @keyframes scienceSignal { from { opacity: .45; } to { opacity: 1; } }
  @media (prefers-reduced-motion: reduce) {
    .drift, .signal { animation: none !important; }
  }
  @media (max-width: 1099px) {
    .network { left: -20px; top: 11%; width: 165px; }
    .axes-three { right: -8px; top: 10%; width: 120px; }
    .formula-one { left: 7%; top: 42%; width: 160px; }
    .cells { left: 2%; bottom: 8%; width: 130px; }
    .axes-two { left: 25%; bottom: 3%; width: 140px; }
    .tubes { left: auto; right: 4%; top: 48%; bottom: auto; width: 85px; }
    .robot { right: 2%; bottom: 7%; width: 95px; }
    .formula-two { right: 26%; bottom: 1%; width: 125px; }
  }
  @media (max-width: 600px) {
    mask-image: radial-gradient(ellipse 50% 36% at 50% 45%, transparent 20%, #000 88%);
    .network { left: -40px; width: 140px; }
    .axes-three { right: -30px; width: 112px; }
    .formula-one { left: -16px; top: 40%; width: 130px; }
    .cells { left: -30px; bottom: 5%; width: 125px; }
    .axes-two { left: -30px; bottom: 28%; width: 115px; }
    .tubes { right: -18px; top: 43%; width: 75px; }
    .robot { right: -12px; bottom: 6%; width: 95px; }
    .formula-two { display: none; }
  }
  @media print { display: none; }
`;

const ScienceBackdrop = () => {
  const { config } = useSite();
  const settings = config.home;
  if (!settings.backgroundEnabled) return null;
  return (
    <StyledBackdrop
      className="science-backdrop"
      aria-hidden="true"
      data-animated={settings.backgroundAnimated && settings.backgroundOpacity > 0 ? 'true' : 'false'}
      style={{ '--science-opacity': settings.backgroundOpacity / 100 }}>
      <div className="motif network">
        <svg viewBox="0 0 220 165" focusable="false">
          <g className="drift">
            <g opacity=".7"><path d="M24 45 86 20 147 43 201 76M24 45 84 83 147 43M24 45 36 123 84 83 92 146M86 20 84 83 147 112 201 76M36 123 92 146 147 112 147 43M84 83 201 76" /></g>
            <circle cx="24" cy="45" r="8" /><circle cx="86" cy="20" r="7" /><circle cx="147" cy="43" r="9" /><circle cx="201" cy="76" r="7" /><circle cx="36" cy="123" r="7" /><circle cx="84" cy="83" r="10" /><circle cx="92" cy="146" r="6" /><circle cx="147" cy="112" r="8" />
            <circle className="signal" cx="84" cy="83" r="3" fill="currentColor" stroke="none" />
          </g>
        </svg>
      </div>
      <div className="motif cells">
        <svg viewBox="0 0 180 150" focusable="false">
          <g className="drift">
            <path d="M19 59C6 35 23 13 49 13 71 5 94 20 91 43 101 62 78 82 58 78 37 90 17 80 19 59Z" />
            <path d="M44 35C54 26 70 33 71 44 74 59 53 65 44 55 37 50 37 41 44 35Z" /><path d="M27 37q6-7 11-3M69 22q7 1 8 7M28 65q7 4 11 0" opacity=".65" />
            <path d="M106 59C118 42 145 44 158 61 177 69 175 94 161 106 151 128 122 129 108 112 88 103 92 74 106 59Z" />
            <ellipse cx="133" cy="85" rx="17" ry="14" transform="rotate(-24 133 85)" /><path d="M110 72q5-7 11-3M151 106q-6 7-12 2M158 77q4 5 1 10" opacity=".65" />
            <path d="M42 109C50 93 76 93 84 108 99 119 86 141 71 139 51 149 33 127 42 109Z" /><ellipse cx="64" cy="119" rx="10" ry="8" />
            <g fill="currentColor" stroke="none"><circle cx="56" cy="45" r="2" /><circle cx="127" cy="81" r="2" /><circle cx="138" cy="89" r="2" /><circle cx="65" cy="118" r="1.5" /><circle cx="80" cy="57" r="1.6" /><circle cx="115" cy="104" r="1.7" /></g>
          </g>
        </svg>
      </div>
      <div className="motif formula-one"><svg viewBox="0 0 190 48" focusable="false"><text x="5" y="29" fontSize="23" fontStyle="italic">L(N) = L∞ + aN⁻ᵅ</text><path d="M11 38q54 4 101-1" strokeWidth=".8" opacity=".5" /></svg></div>
      <div className="motif axes-three">
        <svg viewBox="0 0 150 150" focusable="false"><path d="M47 111 132 83M47 111 15 64M47 111 50 14M126 81l6 2-4 6M14 72l1-8 7 3M45 21l5-7 5 7" /><path d="M23 77 108 49 127 79M35 94 120 66M66 105 36 58M87 98 56 51M108 91 77 44" opacity=".4" /><path d="M50 102C65 81 73 83 84 62S106 50 117 40" strokeDasharray="3 6" /><g fill="currentColor" stroke="none"><circle cx="65" cy="87" r="2.5" /><circle cx="84" cy="62" r="2.5" /><circle cx="106" cy="47" r="2.5" /></g><text x="135" y="85" fontSize="14">x</text><text x="4" y="61" fontSize="14">y</text><text x="55" y="15" fontSize="14">z</text></svg>
      </div>
      <div className="motif axes-two">
        <svg viewBox="0 0 180 124" focusable="false"><path d="M27 12v88h140M22 20l5-8 5 8M159 95l8 5-8 5" /><path d="M38 28C48 58 64 76 86 82S127 89 153 90" /><path d="M32 90h126" strokeDasharray="3 7" opacity=".4" /><text x="5" y="13" fontSize="14" fontStyle="italic">L</text><text x="164" y="120" fontSize="14" fontStyle="italic">N</text><g fill="currentColor" stroke="none"><circle cx="48" cy="50" r="2" /><circle cx="69" cy="75" r="2" /><circle cx="105" cy="87" r="2" /></g></svg>
      </div>
      <div className="motif tubes">
        <svg viewBox="0 0 110 150" focusable="false"><path d="M17 13h29v8H17zM20 21v92a11 11 0 0 0 22 0V21M63 28h29v8H63zM66 36v77a11 11 0 0 0 22 0V36" /><path d="M21 83q10-7 20 0v29q0 10-10 10t-10-10ZM67 71q10 6 20 0v42q0 10-10 10t-10-10Z" fill="currentColor" fillOpacity=".12" /><path d="M15 133h82M24 128v5M85 128v5" /><circle cx="31" cy="98" r="3" /><circle cx="77" cy="91" r="3" /><circle cx="76" cy="58" r="2" /><circle className="signal" cx="30" cy="65" r="2" /></svg>
      </div>
      <div className="motif robot">
        <svg viewBox="0 0 130 150" focusable="false"><g className="drift"><path d="M62 27V14" /><circle className="signal" cx="62" cy="9" r="5" /><rect x="25" y="29" width="76" height="56" rx="15" /><path d="M24 48h-8v22h8M102 48h8v22h-8" /><circle cx="46" cy="54" r="5" /><circle cx="80" cy="54" r="5" /><path d="M49 70q14 9 28 0M45 87v10M81 87v10" /><rect x="39" y="96" width="49" height="32" rx="9" /><path d="M51 129v12H35M77 129v12h16M38 103l-15 8-9-9M88 103l13 4 8-14" /><path d="M61 106v12M55 112h12" /><path d="M108 92c-7-2-8-13-2-17 5-5 16-1 15 6 2 9-6 14-13 11Z" /><circle cx="112" cy="83" r="3" /></g></svg>
      </div>
      <div className="motif formula-two"><svg viewBox="0 0 155 70" focusable="false"><text x="5" y="24" fontSize="22" fontStyle="italic">z = fθ(x)</text><text x="35" y="57" fontSize="20" fontStyle="italic">p(y | z)</text><path d="M16 36v16h10m-5-4 5 4-5 4" opacity=".6" /></svg></div>
    </StyledBackdrop>
  );
};

export default ScienceBackdrop;
