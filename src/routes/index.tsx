import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { GoldJourney } from "@/components/site/GoldJourney";
import { BrandIntro, Services, TrustBar } from "@/components/site/sections-a";
import { HowItWorks, Valuation, XRFTesting } from "@/components/site/sections-b";
import {
  MobileService,
  PledgedGold,
  RepledgeGold,
  WhyUs,
  YearsExperience,
} from "@/components/site/sections-c";
import {
  FAQ,
  Footer,
  QuoteAndContact,
  Testimonials,
  WhatsAppFloat,
} from "@/components/site/sections-d";
import { business, faqs } from "@/lib/site";

const title = "Anjaneya Gold Company | Sell Gold for Cash & Release Pledged Gold in Bangalore";
const description =
  "Sell gold for cash in Bangalore with XRF purity testing, transparent valuation, pledged gold release, re-pledging and mobile gold service. 20+ years of experience.";
const canonical = "https://anjaneyagoldcompany.com/";

const localBusiness = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: business.name,
  url: canonical,
  telephone: business.phone,
  email: business.email,
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "#20, 1st Floor, Sarasvathipuram Main Road, Opp. Sathya Shanthi Ganapathi Temple, Nandini Layout",
    addressLocality: "Bengaluru",
    postalCode: "560096",
    addressRegion: "Karnataka",
    addressCountry: "IN",
  },
  openingHours: "Mo-Sa 10:00-19:00",
  description,
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: canonical },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: canonical },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Lato:wght@300;400;700;900&display=swap",
      },
    ],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(localBusiness) },
      { type: "application/ld+json", children: JSON.stringify(faqSchema) },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen bg-background">
      <GoldJourney />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <TrustBar />
        <BrandIntro />
        <Services />
        <HowItWorks />
        <XRFTesting />
        <Valuation />
        <PledgedGold />
        <RepledgeGold />
        <MobileService />
        <WhyUs />
        <YearsExperience />
        <Testimonials />
        <FAQ />
        <QuoteAndContact />
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
      <WhatsAppFloat />
    </div>
  );
}
