import type { AnchorHTMLAttributes, ReactNode } from "react";

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string | { pathname?: string; hash?: string; search?: string };
  replace?: boolean;
  prefetch?: boolean;
  children?: ReactNode;
};

export default function Link({ href, children, ...props }: LinkProps) {
  const resolved =
    typeof href === "string"
      ? href
      : `${href.pathname ?? ""}${href.search ?? ""}${href.hash ?? ""}`;

  return (
    <a href={resolved} {...props}>
      {children}
    </a>
  );
}
