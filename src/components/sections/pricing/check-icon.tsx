type Props = { className?: string };

/** Bold check mark used inside pricing feature lists. */
export const CheckIcon = ({ className }: Props) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    className={className}
  >
    <path d="M5 13l4 4L19 7" />
  </svg>
);
