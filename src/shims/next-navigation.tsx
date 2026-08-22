import { useCallback, useEffect, useMemo, useState } from "react";

function currentPathname(): string {
  if (typeof window === "undefined") return "/";
  return window.location.pathname;
}

export function usePathname(): string {
  const [pathname, setPathname] = useState(currentPathname);

  useEffect(() => {
    const update = () => setPathname(window.location.pathname);
    update();
    window.addEventListener("popstate", update);
    return () => window.removeEventListener("popstate", update);
  }, []);

  return pathname;
}

interface NextRouterLike {
  push: (url: string) => void;
  replace: (url: string) => void;
  refresh: () => void;
  back: () => void;
  forward: () => void;
  prefetch: (url: string) => void;
}

export function useRouter(): NextRouterLike {
  return useMemo<NextRouterLike>(
    () => ({
      push: (url) => window.location.assign(url),
      replace: (url) => window.location.replace(url),
      refresh: () => window.location.reload(),
      back: () => window.history.back(),
      forward: () => window.history.forward(),
      prefetch: () => {},
    }),
    []
  );
}

export function useParams<T extends Record<string, string | string[]>>() {
  const params = useMemo(() => {
    if (typeof window === "undefined") return {} as T;
    return Object.fromEntries(
      new URLSearchParams(window.location.search)
    ) as unknown as T;
  }, []);
  return params;
}

export function useSearchParams() {
  const getSearchParams = useCallback(
    () =>
      typeof window === "undefined"
        ? new URLSearchParams()
        : new URLSearchParams(window.location.search),
    []
  );
  const [searchParams, setSearchParams] = useState(getSearchParams);

  useEffect(() => {
    const update = () => setSearchParams(getSearchParams());
    update();
    window.addEventListener("popstate", update);
    return () => window.removeEventListener("popstate", update);
  }, [getSearchParams]);

  return searchParams as URLSearchParams & {
    get(name: string): string | null;
  };
}
