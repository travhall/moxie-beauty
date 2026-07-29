/**
 * Ambient background wash — three gradient shapes drifting via CSS keyframes,
 * blurred into a soft ambient glow. No JS: theme sync is plain CSS custom
 * properties reacting to the .dark class.
 */
export default function Blob() {
  return (
    <div aria-hidden="true" className="blob-canvas">
      <div className="blob-shape blob-shape--a" />
      <div className="blob-shape blob-shape--b" />
      <div className="blob-shape blob-shape--c" />
    </div>
  );
}
