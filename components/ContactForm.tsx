"use client";

import { useState } from "react";

interface ContactFormProps {
  successMessage?: string;
}

export default function ContactForm({ successMessage }: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="py-12 text-center">
        <p className="font-display text-lg tracking-display uppercase text-ink">
          {successMessage || "Thank you!"}
        </p>
        <p className="text-sm text-muted mt-2">We&apos;ll get back to you soon.</p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm text-rust hover:text-rust-dark transition-colors"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="block text-xs font-display tracking-display uppercase text-muted mb-2">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full px-4 py-3 bg-white border border-border text-sm text-ink placeholder:text-muted/50 focus:outline-none focus:border-ink transition-colors"
          placeholder="First and last name"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-xs font-display tracking-display uppercase text-muted mb-2">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full px-4 py-3 bg-white border border-border text-sm text-ink placeholder:text-muted/50 focus:outline-none focus:border-ink transition-colors"
          placeholder="you@email.com"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-xs font-display tracking-display uppercase text-muted mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className="w-full px-4 py-3 bg-white border border-border text-sm text-ink placeholder:text-muted/50 focus:outline-none focus:border-ink transition-colors resize-none"
          placeholder="The more information you provide, the more accurate the quote will be."
        />
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full px-6 py-3 bg-ink text-cream text-sm font-display tracking-wider uppercase hover:bg-ink/85 transition-colors disabled:opacity-60"
      >
        {status === "sending" ? "Sending..." : "Submit"}
      </button>
      {status === "error" && (
        <p className="text-sm text-red-600">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}
