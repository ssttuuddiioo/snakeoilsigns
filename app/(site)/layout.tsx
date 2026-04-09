export const revalidate = 5;

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { client } from "@/sanity/lib/client";
import { siteSettingsQuery } from "@/sanity/lib/queries";

async function getSiteSettings() {
  try {
    return await client.fetch(siteSettingsQuery);
  } catch {
    return null;
  }
}

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:bg-rust focus:text-white focus:px-4 focus:py-2 focus:text-sm"
      >
        Skip to content
      </a>
      <Nav logo={settings?.logo} siteTitle={settings?.siteTitle} />
      <main id="main-content">{children}</main>
      <Footer
        siteTitle={settings?.siteTitle}
        tagline={settings?.tagline}
        contactEmail={settings?.contactEmail}
        contactPhone={settings?.contactPhone}
        instagramUrl={settings?.instagramUrl}
        tiktokUrl={settings?.tiktokUrl}
        linkedinUrl={settings?.linkedinUrl}
      />
    </>
  );
}
