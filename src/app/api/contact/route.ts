import { NextResponse } from "next/server";
import { Resend } from "resend";
import { siteName } from "@/data/site";
import {
  contactEmailHtml,
  contactEmailSubject,
  contactEmailText,
  type ContactData,
} from "@/lib/contactEmail";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ ok: false, error: "Ongeldig verzoek." }, { status: 400 });
  }

  // Spambeveiliging: dit verborgen veld vullen alleen bots in
  if (body.hp_check) {
    console.warn("Contactformulier: spamveld ingevuld, bericht niet verstuurd.");
    return NextResponse.json({ ok: true });
  }

  const data: ContactData = {
    name: String(body.name ?? "").trim(),
    email: String(body.email ?? "").trim(),
    company: String(body.company ?? "").trim(),
    type: String(body.type ?? "").trim(),
    budget: String(body.budget ?? "").trim(),
    message: String(body.message ?? "").trim(),
  };

  // Controleren
  if (!data.name || !data.email || !data.message) {
    return NextResponse.json({ ok: false, error: "Vul naam, e-mail en bericht in." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return NextResponse.json({ ok: false, error: "Vul een geldig e-mailadres in." }, { status: 400 });
  }
  if (data.name.length > 200 || data.message.length > 5000) {
    return NextResponse.json({ ok: false, error: "Je bericht is te lang." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    console.error("RESEND_API_KEY of CONTACT_TO_EMAIL ontbreekt in de omgevingsvariabelen.");
    return NextResponse.json({ ok: false, error: "Versturen is nu niet mogelijk." }, { status: 500 });
  }

  const from = process.env.CONTACT_FROM_EMAIL ?? `${siteName} <onboarding@resend.dev>`;
  const resend = new Resend(apiKey);

  const { data: sent, error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: data.email,
    subject: contactEmailSubject(data),
    html: contactEmailHtml(data),
    text: contactEmailText(data),
  });

  if (error) {
    console.error("Resend-fout:", error);
    return NextResponse.json({ ok: false, error: "Versturen is mislukt." }, { status: 500 });
  }

  console.log("Contactformulier: e-mail verstuurd via Resend, id:", sent?.id);
  return NextResponse.json({ ok: true });
}