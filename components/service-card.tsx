// components/service-card.tsx
interface ServiceCardProps {
  title: string;
  preview: string;
  onOpenOverlay: () => void;
}

const ServiceCard = ({ title, preview, onOpenOverlay }: ServiceCardProps) => {
  return (
    <div
      className="service-card rounded-lg border border-(--accent)/20 p-6 transition-all hover:shadow-md cursor-pointer"
      onClick={onOpenOverlay}
    >
      <h3 className="font-nyght text-2xl mb-3 bg-linear-to-r from-(--foreground) to-(--accent) bg-clip-text text-transparent">
        {title}
      </h3>
      <p className="text-base mb-4">{preview}</p>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onOpenOverlay();
        }}
        className="flex items-center gap-2 text-(--accent) mt-2 hover:underline group"
      >
        <span>Read more</span>
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
