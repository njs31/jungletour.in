import Link from "next/link";
import { ChevronLeft, ExternalLink } from "lucide-react";
import AdminLogoutButton from "@/components/admin/AdminLogoutButton";

interface AdminShellProps {
  eyebrow?: string;
  title: string;
  backHref?: string;
  backLabel?: string;
  showSiteLink?: boolean;
  children: React.ReactNode;
}

export default function AdminShell({
  eyebrow = "Admin",
  title,
  backHref,
  backLabel = "Back",
  showSiteLink = true,
  children,
}: AdminShellProps) {
  return (
    <div className="min-h-screen bg-surface">
      <header className="sticky top-0 z-40 border-b border-brand-border/80 bg-white/95 backdrop-blur-md supports-[backdrop-filter]:bg-white/80">
        <div className="mx-auto flex max-w-6xl items-center gap-2 px-4 py-3 sm:gap-3 sm:px-6 sm:py-4">
          {backHref ? (
            <Link
              href={backHref}
              className="inline-flex shrink-0 items-center gap-1 rounded-lg px-2 py-2 text-sm font-medium text-brand-muted transition-colors hover:bg-surface hover:text-brand-text sm:px-3"
            >
              <ChevronLeft className="size-4" aria-hidden />
              <span className="hidden sm:inline">{backLabel}</span>
            </Link>
          ) : null}

          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-cta">
              {eyebrow}
            </p>
            <h1 className="truncate text-base font-bold text-brand-text sm:text-xl">
              {title}
            </h1>
          </div>

          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
            {showSiteLink ? (
              <Link
                href="/"
                className="hidden items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-brand-muted transition-colors hover:bg-surface hover:text-cta sm:inline-flex"
              >
                View site
                <ExternalLink className="size-3.5" aria-hidden />
              </Link>
            ) : null}
            <AdminLogoutButton />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:px-6 sm:py-8">
        {children}
      </main>
    </div>
  );
}
