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
  return (
    <div
      className={`service-card service-card-${
        cardIndex + 1
      } rounded-lg rounded-tl rounded-tr-2xl rounded-br rounded-bl-2xl border border-(--accent)/20 p-6 transition-all hover:shadow-[-8px_8px_0_0_var(--accent)] hover:translate-x-2 hover:-translate-y-2 cursor-pointer group`}
      onClick={onOpenOverlay}
    >
      <h3 className="font-nyght text-2xl mb-3 bg-linear-to-r from-(--foreground) to-(--accent) bg-clip-text text-transparent text-balance">
        {title}
      </h3>
      <p className="text-base mb-4 text-pretty">{preview}</p>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onOpenOverlay();
        }}
        className="inline-flex self-start items-center gap-2 text-(--accent) mt-6 before:absolute before:-bottom-0.5 before:left-0 before:w-full before:h-0.5 before:bg-(--accent) before:transform before:scale-x-0 before:origin-right before:transition-transform before:duration-300 before:ease-in-out group-hover:before:scale-x-100 group-hover:before:origin-left relative"
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
      </button>
    </div>
  );
};

export default ServiceCard;
