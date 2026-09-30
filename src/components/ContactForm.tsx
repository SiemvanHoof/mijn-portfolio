"use client";
import { useState } from "react";
import { contact } from "@/data/contact";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus("sending");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(result.error);
      form.reset();
      setStatus("sent");
    } catch (err) {
      setErrorMessage(err instanceof Error && err.message ? err.message : "");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="flex min-h-[24rem] flex-col justify-center">
        <p className="text-4xl font-medium tracking-tight md:text-6xl">Bedankt!</p>
        <p className="mt-4 max-w-md text-muted">
          Je bericht is verstuurd. Ik neem {contact.responseTime.toLowerCase()} contact met je op.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-8 self-start text-sm underline underline-offset-4 transition-opacity hover:opacity-60"
        >
          Nog een bericht sturen
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="relative space-y-10">
      {/* Spambeveiliging: onzichtbaar voor mensen, bots vullen dit wel in */}
      <div aria-hidden className="absolute -left-[9999px] top-0">
        <label>
          Laat dit veld leeg
          <input type="text" name="hp_check" tabIndex={-1} autoComplete="new-password" />
        </label>
      </div>

      <div className="grid gap-10 md:grid-cols-2">
        <Field label="Naam" name="name" required autoComplete="name" />
        <Field label="E-mail" name="email" type="email" required autoComplete="email" />
      </div>

      <Field label="Bedrijf (optioneel)" name="company" autoComplete="organization" />

      <Choice legend="Waar kan ik je mee helpen?" name="type" options={contact.projectTypes} />
      <Choice legend="Budget" name="budget" options={contact.budgets} />

      <div>
        <label htmlFor="message" className="text-xs text-muted">
          Vertel over je project *
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          maxLength={5000}
          className="mt-2 w-full resize-none border-b border-line bg-transparent py-3 text-lg outline-none transition-colors focus:border-fg"
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-6">
        <p
          role={status === "error" ? "alert" : undefined}
          className={`text-xs ${status === "error" ? "text-red-500" : "text-muted"}`}
        >
          {status === "error"
            ? errorMessage || "Er ging iets mis. Probeer het opnieuw of mail me direct."
            : `Ik reageer ${contact.responseTime.toLowerCase()}.`}
        </p>
        <button
          type="submit"
          disabled={status === "sending"}
          className="rounded-full bg-fg px-6 py-3 text-sm text-bg transition-opacity hover:opacity-80 disabled:opacity-50"
        >
          {status === "sending" ? "Versturen…" : "Verstuur bericht"}
        </button>
      </div>
    </form>
  );
}

type FieldProps = {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
};

function Field({ label, name, type = "text", required, autoComplete }: FieldProps) {
  return (
    <div>
      <label htmlFor={name} className="text-xs text-muted">
        {label}
        {required && " *"}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        maxLength={200}
        className="mt-2 w-full border-b border-line bg-transparent py-3 text-lg outline-none transition-colors focus:border-fg"
      />
    </div>
  );
}

function Choice({ legend, name, options }: { legend: string; name: string; options: string[] }) {
  return (
    <fieldset>
      <legend className="text-xs text-muted">{legend}</legend>
      <div className="mt-4 flex flex-wrap gap-2">
        {options.map((option, i) => (
          <label key={option} className="cursor-pointer">
            <input
              type="radio"
              name={name}
              value={option}
              defaultChecked={i === 0}
              className="peer sr-only"
            />
            <span className="block rounded-full border border-line px-4 py-2 text-sm transition-colors peer-checked:border-fg peer-checked:bg-fg peer-checked:text-bg peer-focus-visible:ring-2 peer-focus-visible:ring-fg peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-bg">
              {option}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}