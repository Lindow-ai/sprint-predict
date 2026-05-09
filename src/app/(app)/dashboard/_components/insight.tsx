/** Single bullet point inside an "AI insight" panel. */
export const Insight = ({ children }: { children: React.ReactNode }) => (
  <li className="flex gap-2.5">
    <span className="mt-1.5 size-1.5 rounded-full bg-orange shrink-0" />
    <span>{children}</span>
  </li>
);
