interface StatusBadgeProps {
  active: boolean;
}

export default function StatusBadge({ active }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ${
        active
          ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/10"
          : "bg-surface text-brand-muted ring-1 ring-brand-border"
      }`}
    >
      {active ? "Active" : "Hidden"}
    </span>
  );
}
