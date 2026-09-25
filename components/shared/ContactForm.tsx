"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

type FormState = "idle" | "submitting" | "success" | "error";

interface FieldProps {
  label: string;
  id: string;
  required?: boolean;
  children: React.ReactNode;
}

function Field({ label, id, required, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-sm font-semibold text-ink"
      >
        {label}
        {required && (
          <span className="ml-1 text-ink-mid" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
    </div>
  );
}

const inputClasses =
  "w-full rounded-card border border-border bg-white px-4 py-3 text-sm text-ink placeholder:text-ink-light/60 transition-colors duration-200 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent";

export default function ContactForm() {
  const [state, setState] = useState<FormState>("idle");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: wire to real submission endpoint / email service
    setState("submitting");
    setTimeout(() => setState("success"), 1200);
  };

  if (state === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex flex-col items-start gap-4 rounded-card-lg border border-accent/30 bg-accent/5 p-8"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
          <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
            <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="font-display text-xl font-bold text-ink">
          Message sent
        </h3>
        <p className="text-sm leading-relaxed text-ink-mid">
          Thank you for reaching out. We will get back to you as soon as
          possible.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Contact form"
      className="flex flex-col gap-6"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Full name" id="name" required>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            placeholder="Your full name"
            className={inputClasses}
          />
        </Field>

        <Field label="Email address" id="email" required>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="you@example.com"
            className={inputClasses}
          />
        </Field>
      </div>

      <Field label="Organisation (optional)" id="organisation">
        <input
          id="organisation"
          name="organisation"
          type="text"
          autoComplete="organization"
          placeholder="Your organisation or company"
          className={inputClasses}
        />
      </Field>

      <Field label="Subject" id="subject" required>
        <select
          id="subject"
          name="subject"
          required
          defaultValue=""
          className={`${inputClasses} appearance-none`}
        >
          <option value="" disabled>
            Select a subject…
          </option>
          <option value="seedlings">Seedling availability / purchasing</option>
          <option value="nursery">Nursery enquiry</option>
          <option value="partnership">Partnership or collaboration</option>
          <option value="media">Media or press</option>
          <option value="project">Project information</option>
          <option value="other">Other</option>
        </select>
      </Field>

      <Field label="Message" id="message" required>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          placeholder="Tell us how we can help you…"
          className={`${inputClasses} resize-y`}
        />
      </Field>

      <p className="text-xs text-ink-light">
        Fields marked <span aria-hidden="true">*</span>
        <span className="sr-only">with an asterisk</span> are required.
      </p>

      {state === "error" && (
        <p role="alert" className="text-sm font-semibold text-ink-mid">
          Something went wrong. Please try again or contact us directly.
        </p>
      )}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="self-start"
        disabled={state === "submitting"}
        aria-disabled={state === "submitting"}
      >
        {state === "submitting" ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
