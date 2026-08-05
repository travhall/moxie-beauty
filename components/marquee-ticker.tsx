interface MarqueeTickerProps {
  items: string[];
}

export default function MarqueeTicker({ items }: MarqueeTickerProps) {
  const doubled = [...items, ...items];
  return (
    <div
      className="marquee-ticker bg-(--background)/60 backdrop-blur-md"
      aria-hidden="true"
    >
      <div className="marquee-ticker-track">
        {doubled.flatMap((s, i) => [
          <span key={i}>{s}</span>,
          <span key={`d${i}`} className="marquee-dot" />,
        ])}
      </div>
    </div>
  );
}
