// Scroll-reveal animations are turned off: section content is shown immediately.
// Components still call sr.reveal(...), so keep a no-op object with the same shape.
const sr = { reveal: () => {} };

export default sr;
