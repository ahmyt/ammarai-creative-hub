import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { primaryNav, SITE } from "@/lib/site";
import { ButtonLink } from "./Button";
import logoAsset from "@/assets/ammarai-logo.png.asset.json";

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <img
        src={logoAsset.url}
        alt=""
        aria-hidden="true"
        width={32}
        height={32}
        className="rounded-md size-7 sm:size-8 shrink-0"
      />
      <span className={className ?? "font-display text-2xl font-semibold tracking-tight"}>
        Ammar<span className="text-accent">AI</span>
      </span>
    </span>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-5 py-3.5 sm:px-8">
        <Link to="/" aria-label={`${SITE.name} home`} className="flex items-baseline gap-2">
          <Wordmark />
          <span className="sr-only">{SITE.name}</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
          {primaryNav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/auth"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Login
          </Link>
          <ButtonLink to="/pricing" variant="ink" size="sm">
            Start Free
          </ButtonLink>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle navigation menu"
          className="flex size-9 items-center justify-center rounded-md ring-1 ring-border md:hidden"
        >
          <span aria-hidden="true" className="text-lg leading-none">
            {open ? "×" : "≡"}
          </span>
        </button>
      </div>

      {open ? (
        <div className="border-t border-border bg-background md:hidden">
          <nav aria-label="Mobile" className="mx-auto flex max-w-6xl flex-col px-5 py-3">
            {primaryNav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="border-b border-border py-3 text-sm font-medium text-foreground last:border-0"
              >
                {item.label}
              </Link>
            ))}
            <div className="flex items-center gap-3 pt-4">
              <ButtonLink to="/pricing" variant="primary" size="sm" onClick={() => setOpen(false)}>
                Start Creating Free
              </ButtonLink>
              <Link
                to="/auth"
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-muted-foreground"
              >
                Login
              </Link>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
