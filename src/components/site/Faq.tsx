import type { Faq } from "@/data/types";

export function FaqAccordion({ items, heading }: { items: Faq[]; heading?: string }) {
  return (
    <div>
      {heading ? <h2 className="text-2xl sm:text-3xl">{heading}</h2> : null}
      <div className="mt-6 divide-y divide-border border-y border-border">
        {items.map((item) => (
          <details key={item.q} className="group py-4">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-[0.95rem] font-semibold text-foreground marker:hidden">
              <span className="text-pretty">{item.q}</span>
              <span
                aria-hidden="true"
                className="mt-0.5 shrink-0 text-accent transition-transform duration-200 group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="mt-3 max-w-3xl text-pretty text-sm leading-relaxed text-muted-foreground">
              {item.a}
            </p>
          </details>
        ))}
      </div>
    </div>
  );
}

export function faqJsonLd(items: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}
