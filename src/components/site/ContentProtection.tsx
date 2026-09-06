import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouterState } from "@tanstack/react-router";
import { siteContentQuery } from "@/lib/content";

const BLOCKED_WITH_MODIFIER = new Set(["c", "x", "a", "s", "p", "u"]);
const BLOCKED_DEVTOOLS = new Set(["i", "j", "c"]);

function isEditable(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) return false;
  return Boolean(target.closest("input, textarea, select, [contenteditable=''], [contenteditable='true']"));
}

export function ContentProtection() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const excluded = pathname.startsWith("/admin") || pathname.startsWith("/auth");

  const { data: content } = useQuery({ ...siteContentQuery, enabled: !excluded });
  const home = content?.pages.find((p) => p.slug === "home");
  const enabled = !excluded && home?.protectContent !== false && Boolean(content);

  useEffect(() => {
    if (!enabled) return;

    const block = (e: Event) => {
      if (isEditable(e.target)) return;
      e.preventDefault();
    };

    const onKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (e.key === "F12") {
        e.preventDefault();
        return;
      }
      const mod = e.ctrlKey || e.metaKey;
      if (!mod) return;
      if (e.shiftKey && BLOCKED_DEVTOOLS.has(key)) {
        e.preventDefault();
        return;
      }
      if (isEditable(e.target)) return;
      if (BLOCKED_WITH_MODIFIER.has(key)) e.preventDefault();
    };

    document.addEventListener("contextmenu", block);
    document.addEventListener("copy", block);
    document.addEventListener("cut", block);
    document.addEventListener("dragstart", block);
    document.addEventListener("selectstart", block);
    document.addEventListener("keydown", onKeyDown);
    document.body.classList.add("no-select");

    return () => {
      document.removeEventListener("contextmenu", block);
      document.removeEventListener("copy", block);
      document.removeEventListener("cut", block);
      document.removeEventListener("dragstart", block);
      document.removeEventListener("selectstart", block);
      document.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("no-select");
    };
  }, [enabled]);

  return null;
}
