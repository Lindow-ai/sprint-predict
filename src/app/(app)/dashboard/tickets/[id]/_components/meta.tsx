type Props = {
  label: string;
  children: React.ReactNode;
};

/** Single key/value cell inside the ticket meta panel. */
export const Meta = ({ label, children }: Props) => (
  <div>
    <dt className="font-mono text-[10px] uppercase text-ink-faint tracking-[0.05em] mb-1">
      {label}
    </dt>
    <dd className="text-ink">{children}</dd>
  </div>
);
