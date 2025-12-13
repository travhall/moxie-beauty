// components/service-card.tsx
interface ServiceCardProps {
  title: string;
  preview: string;
  onOpenOverlay: () => void;
  readMoreLabel?: string;
  cardIndex: number;
}

const ServiceCard = ({
  title,
  preview,
  onOpenOverlay,
  readMoreLabel = "Read more",
  cardIndex,
}: ServiceCardProps) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onOpenOverlay();
    }
  };

  return (
    <div
      className={`service-card service-card-${
        cardIndex + 1
      } rounded-lg rounded-tl rounded-tr-2xl rounded-br rounded-bl-2xl border border-(--accent)/20 hover:border-(--accent) p-6 transition-all hover:shadow-[-8px_8px_0_0_var(--accent)] hover:translate-x-2 hover:-translate-y-2 cursor-pointer group focus-visible:ring-2 focus-visible:ring-(--accent)/50 focus-visible:ring-offset-2`}
      role="button"
      tabIndex={0}
      onClick={onOpenOverlay}
      onKeyDown={handleKeyDown}
      aria-label={`${title} - ${preview}`}
    >
      <h3 className="font-nyght text-3xl mb-3 bg-linear-to-r from-(--foreground) to-(--accent) bg-clip-text text-transparent text-balance">
        {title}
      </h3>
      <p className="text-base mb-4 text-pretty">{preview}</p>

      <span
        className="inline-flex self-start items-center gap-1 text-(--accent) mt-6 before:absolute before:-bottom-0.5 before:left-0 before:w-full before:h-0.5 before:bg-(--accent) before:transform before:scale-x-0 before:origin-right before:transition-transform before:duration-300 before:ease-in-out group-hover:before:scale-x-100 group-hover:before:origin-left relative"
        aria-hidden="true"
      >
        <span>{readMoreLabel}</span>
        <svg
          className="w-4 h-4 transition-transform group-hover:translate-x-1"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </span>
    </div>
  );
};

export default ServiceCard;
