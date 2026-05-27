import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://hiregen-swart.vercel.app"),
  title: "HireGEN — Get hired on proof, not polish.",
  description:
    "HireGEN is a proof-of-capability hiring platform. AI turns resumes, GitHub portfolios, projects, and validation tasks into structured skill graphs recruiters can trust.",
  keywords: [
    "hiring",
    "skill validation",
    "India tech hiring",
    "proof profile",
    "skill graph",
    "GitHub portfolio",
    "recruiter dashboard",
    "AI hiring",
    "under-discovered talent",
  ],
  authors: [{ name: "Vedavyas Vayalpadu" }],
  creator: "Vedavyas Vayalpadu",
  openGraph: {
    title: "HireGEN — Get hired on proof, not polish.",
    description:
      "Proof-of-capability hiring platform. Skill graphs > resumes.",
    url: "/",
    type: "website",
    locale: "en_IN",
    siteName: "HireGEN",
  },
  twitter: {
    card: "summary_large_image",
    title: "HireGEN — Get hired on proof, not polish.",
    description: "Proof-of-capability hiring platform for candidates and recruiters.",
  },
};

/**
 * Single soft blue blob behind the hero — Variant B (Cobalt / Sky).
 * Locked 2026-05-26 after 4-variant founder preview.
 * Tokens cyan/pink/amber stay in @theme for gradient-text accents only.
 */
function AmbientBlobs() {
  return (
    <div aria-hidden="true">
      <div
        className="blob float-a"
        style={{
          width: 700,
          height: 700,
          top: -200,
          left: "50%",
          transform: "translateX(-50%)",
          background: "#60A5FA",
          opacity: 0.42,
        }}
      />
    </div>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "HireGEN",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: "https://hiregen-swart.vercel.app/",
    description:
      "HireGEN creates evidence-backed proof profiles from resumes, GitHub portfolios, live projects, and validation tasks so candidates and recruiters can evaluate skills with clearer proof.",
    creator: {
      "@type": "Person",
      name: "Vedavyas Vayalpadu",
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      description: "Free beta access for candidates during the OpenAI x Outskill Hackathon MVP phase.",
    },
    audience: [
      {
        "@type": "Audience",
        audienceType: "Candidates",
      },
      {
        "@type": "Audience",
        audienceType: "Recruiters",
      },
      {
        "@type": "Audience",
        audienceType: "Colleges and institutions",
      },
    ],
    featureList: [
      "Resume-first skill extraction",
      "GitHub and live product proof signals",
      "Target-role gap analysis",
      "Evidence-backed skill graph",
      "Recruiter shortlist view",
      "Career roadmap generation",
    ],
  };

  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <AmbientBlobs />
        {children}
      </body>
    </html>
  );
}
