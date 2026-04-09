import Link from "next/link";

interface FooterProps {
  siteTitle?: string;
  tagline?: string;
  contactEmail?: string;
  contactPhone?: string;
  instagramUrl?: string;
  tiktokUrl?: string;
  linkedinUrl?: string;
  newsletterHeading?: string;
  newsletterDescription?: string;
}

const FOOTER_LINKS = [
  { href: "/work", label: "Murals" },
  { href: "/oil-paintings", label: "Paintings" },
  { href: "/workshops", label: "Workshops" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.71a8.26 8.26 0 004.76 1.5v-3.4a4.85 4.85 0 01-1-.12z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export default function Footer({
  siteTitle,
  tagline,
  contactEmail,
  contactPhone,
  instagramUrl,
  tiktokUrl,
  linkedinUrl,
}: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink border-t border-white/5">
      {/* Main Footer */}
      <div className="max-w-content mx-auto px-6 md:px-12 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* Column 1: Logo + Tagline */}
          <div>
            <Link href="/" className="font-display text-base tracking-tight font-bold text-white uppercase">
              {siteTitle || "Snake Oil Signs"}
            </Link>
            <p className="mt-3 text-white/40 text-sm leading-relaxed">
              {tagline || "Los Angeles based, nationally mobile."}
            </p>
          </div>

          {/* Column 2: Site Links */}
          <div>
            <h4 className="font-display text-[10px] tracking-[0.2em] uppercase text-white/30 mb-4">
              Sitemap
            </h4>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact + Social */}
          <div>
            <h4 className="font-display text-[10px] tracking-[0.2em] uppercase text-white/30 mb-4">
              Contact
            </h4>
            <ul className="space-y-2.5 text-sm text-white/60">
              <li>
                <a href={`mailto:${contactEmail || "snakeoilsigns@gmail.com"}`} className="hover:text-white transition-colors">
                  {contactEmail || "snakeoilsigns@gmail.com"}
                </a>
              </li>
              <li>
                <a href={`tel:${contactPhone || "678-925-1188"}`} className="hover:text-white transition-colors">
                  {contactPhone || "678-925-1188"}
                </a>
              </li>
            </ul>
            <div className="flex items-center gap-4 mt-5">
              <a
                href={instagramUrl || "https://www.instagram.com/snakeoilsigns"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/30 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>
              <a
                href={tiktokUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/30 hover:text-white transition-colors"
                aria-label="TikTok"
              >
                <TikTokIcon />
              </a>
              <a
                href={linkedinUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/30 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedInIcon />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="max-w-content mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
          <p className="text-xs text-white/25">
            &copy; {year} Snake Oil Signs
          </p>
          <a
            href={instagramUrl || "https://www.instagram.com/snakeoilsigns"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/25 hover:text-white/60 transition-colors"
            aria-label="Instagram"
          >
            <InstagramIcon />
          </a>
        </div>
      </div>
    </footer>
  );
}
