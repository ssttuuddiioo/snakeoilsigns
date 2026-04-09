"use client";

interface NewsletterFormProps {
  dark?: boolean;
}

export default function NewsletterForm({ dark = false }: NewsletterFormProps) {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex gap-3 max-w-md mx-auto"
    >
      <input
        type="email"
        placeholder="Your email"
        className={`flex-1 px-4 py-3 text-sm focus:outline-none transition-colors ${
          dark
            ? "bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-white/30"
            : "bg-white border border-border text-ink placeholder:text-muted/50 focus:border-ink"
        }`}
      />
      <button
        type="submit"
        className={`px-6 py-3 text-sm font-display tracking-[0.1em] uppercase transition-colors ${
          dark
            ? "bg-rust text-white hover:bg-rust-dark"
            : "bg-ink text-cream hover:bg-ink/85"
        }`}
      >
        Sign Up
      </button>
    </form>
  );
}
