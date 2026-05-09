type Props = { message: string };

export const EmptyState = ({ message }: Props) => (
  <div className="h-full flex flex-col items-center justify-center text-center text-ink-faint">
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="w-12 h-12 mb-4 opacity-40"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v4M12 16h.01" />
    </svg>
    <p className="font-serif italic text-base whitespace-pre-line">{message}</p>
  </div>
);
