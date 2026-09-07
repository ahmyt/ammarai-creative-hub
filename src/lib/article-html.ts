/**
 * Turns the "Frequently asked questions" part of an article's HTML into
 * collapsible <details> entries so long FAQ lists stay scannable.
 * Pure string transform, so server and client render identically.
 */
const FAQ_HEADING = /<h([23])[^>]*>\s*(?:<[^>]+>\s*)*(?:frequently\s+asked[^<]*|faqs?)\s*(?:<\/[^>]+>\s*)*<\/h\1>/i;

export function collapsibleFaqs(html: string): string {
  if (!html) return html;
  const match = FAQ_HEADING.exec(html);
  if (!match) return html;

  const start = match.index + match[0].length;
  const head = html.slice(0, start);
  const rest = html.slice(start);

  // Stop the FAQ block at the next same-or-higher-level heading.
  const level = Number(match[1]);
  const stop = new RegExp(`<h[1-${Math.max(1, level)}][^>]*>`, "i").exec(rest);
  const body = stop ? rest.slice(0, stop.index) : rest;
  const tail = stop ? rest.slice(stop.index) : "";

  const itemPattern = /<h[3-6][^>]*>([\s\S]*?)<\/h[3-6]>([\s\S]*?)(?=<h[3-6][^>]*>|$)/gi;
  const items: string[] = [];
  let found: RegExpExecArray | null;
  while ((found = itemPattern.exec(body)) !== null) {
    const question = found[1]!.trim();
    const answer = found[2]!.trim();
    if (!question) continue;
    items.push(
      `<details class="faq-item"><summary>${question}</summary><div class="faq-answer">${answer}</div></details>`,
    );
  }
  if (items.length === 0) return html;

  return `${head}<div class="faq-list">${items.join("")}</div>${tail}`;
}
