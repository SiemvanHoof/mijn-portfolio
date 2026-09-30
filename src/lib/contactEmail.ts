import { siteName } from "@/data/site";

export type ContactData = {
  name: string;
  email: string;
  company: string;
  type: string;
  budget: string;
  message: string;
};

// Maakt tekst veilig om in HTML te zetten
export const escape = (value: string) =>
  value.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!
  );

const font = "-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif";
const ink = "#020108";
const muted = "#6b6b70";
const line = "#e4e4e7";
const surface = "#f4f4f5";

function formatDate() {
  return new Intl.DateTimeFormat("nl-NL", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Amsterdam",
  }).format(new Date());
}

function pill(value: string) {
  return `<span style="display:inline-block;border:1px solid ${line};border-radius:999px;padding:4px 12px;font:13px/1.4 ${font};color:${ink};">${escape(value)}</span>`;
}

function row(label: string, valueHtml: string) {
  return `
    <tr>
      <td style="padding:14px 0;border-top:1px solid ${line};width:120px;vertical-align:top;font:12px/1.5 ${font};color:${muted};">${label}</td>
      <td style="padding:14px 0;border-top:1px solid ${line};vertical-align:top;font:15px/1.5 ${font};color:${ink};">${valueHtml}</td>
    </tr>`;
}

export function contactEmailSubject(d: ContactData) {
  return d.type ? `Nieuw bericht van ${d.name} — ${d.type}` : `Nieuw bericht van ${d.name}`;
}

export function contactEmailHtml(d: ContactData) {
  const replySubject = encodeURIComponent("Re: je bericht via mijn portfolio");
  const replyHref = `mailto:${escape(d.email)}?subject=${replySubject}`;
  const preview = d.message.slice(0, 120);

  return `<!doctype html>
<html lang="nl">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="color-scheme" content="light only" />
    <title>Nieuw bericht</title>
  </head>
  <body style="margin:0;padding:0;background:${surface};">
    <!-- Voorbeeldtekst die je inbox naast het onderwerp laat zien -->
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escape(preview)}</div>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${surface};">
      <tr>
        <td align="center" style="padding:32px 12px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:24px;">

            <!-- Kop -->
            <tr>
              <td style="padding:24px 32px;border-bottom:1px solid ${line};">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="font:500 14px/1 ${font};color:${ink};">${escape(siteName)}</td>
                    <td align="right" style="font:12px/1 ${font};color:${muted};">${formatDate()}</td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Titel -->
            <tr>
              <td style="padding:40px 32px 8px;">
                <p style="margin:0 0 12px;font:12px/1.4 ${font};color:${muted};">Nieuw bericht via je portfolio</p>
                <h1 style="margin:0;font:500 40px/1.05 ${font};letter-spacing:-1.2px;color:${ink};">${escape(d.name)}</h1>
              </td>
            </tr>

            <!-- Gegevens -->
            <tr>
              <td style="padding:24px 32px 0;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  ${row("E-mail", `<a href="${replyHref}" style="color:${ink};text-decoration:underline;">${escape(d.email)}</a>`)}
                  ${row("Bedrijf", d.company ? escape(d.company) : `<span style="color:${muted};">—</span>`)}
                  ${row("Waarmee", d.type ? pill(d.type) : `<span style="color:${muted};">—</span>`)}
                  ${row("Budget", d.budget ? pill(d.budget) : `<span style="color:${muted};">—</span>`)}
                </table>
              </td>
            </tr>

            <!-- Bericht -->
            <tr>
              <td style="padding:24px 32px 0;">
                <p style="margin:0 0 10px;font:12px/1.4 ${font};color:${muted};">Bericht</p>
                <div style="background:${surface};border-radius:16px;padding:20px 22px;font:15px/1.65 ${font};color:${ink};white-space:pre-wrap;">${escape(d.message)}</div>
              </td>
            </tr>

            <!-- Knop -->
            <tr>
              <td style="padding:32px 32px 40px;">
                <a href="${replyHref}" style="display:inline-block;background:${ink};color:#ffffff;text-decoration:none;font:14px/1 ${font};padding:15px 26px;border-radius:999px;">Beantwoorden</a>
              </td>
            </tr>

            <!-- Voet -->
            <tr>
              <td style="padding:20px 32px 28px;border-top:1px solid ${line};font:12px/1.6 ${font};color:${muted};">
                Verstuurd via het contactformulier op je portfolio. Klik op "Beantwoorden" of antwoord gewoon op deze mail: je antwoord gaat direct naar ${escape(d.email)}.
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export function contactEmailText(d: ContactData) {
  return [
    `Nieuw bericht via je portfolio — ${formatDate()}`,
    "",
    `Naam:    ${d.name}`,
    `E-mail:  ${d.email}`,
    `Bedrijf: ${d.company || "—"}`,
    `Waarmee: ${d.type || "—"}`,
    `Budget:  ${d.budget || "—"}`,
    "",
    "Bericht:",
    d.message,
    "",
    "—",
    `Antwoord gewoon op deze mail, dan gaat je antwoord direct naar ${d.email}.`,
  ].join("\n");
}