interface AdminStatCardProps {
  label: string;
  value: string | number;
  hint?: string;
}

export default function AdminStatCard({ label, value, hint }: AdminStatCardProps) {
  return (
    <div className="rounded-xl border border-brand-border bg-white p-4 shadow-sm">
      <p className="text-xs font-medium text-brand-muted">{label}</p>
      <p className="mt-1 text-2xl font-bold tracking-tight text-brand-text">{value}</p>
      {hint ? <p className="mt-1 text-xs text-brand-subtle">{hint}</p> : null}
    </div>
  );
}
