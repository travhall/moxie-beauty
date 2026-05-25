interface MarqueeTickerProps {
  items: string[];
}

export default function MarqueeTicker({ items }: MarqueeTickerProps) {
  const doubled = [...items, ...items];
  return (
    <div className="marquee-ticker" aria-hidden="true">
      <div className="marquee-ticker-track">
        {doubled.flatMap((s, i) => [
          <span key={i}>{s}</span>,
          <span key={`d${i}`} className="marquee-dot" />,
        ])}
      </div>
    </div>
  );
}
