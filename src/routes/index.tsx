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
  CoverageAreas,
  FAQ,
  Footer,
  QuoteAndContact,
  Testimonials,
  WhatsAppFloat,
} from "@/components/site/sections-d";
import { business, faqs } from "@/lib/site";

const title =
  "Anjaneya Gold Company (AGC) | Top Gold Buyers in Bengaluru, Tumkur, Mysuru, Ramanagara, Kolar, Hassan & Magadi";
const description =
  "Sell gold for instant cash or release pledged gold from banks with Anjaneya Gold Company (AGC). Serving Bengaluru, Tumakuru, Mysuru, Ramanagara, Kolar, Hassan & Magadi with 20+ years trust, German XRF 99% purity testing & doorstep mobile gold service.";
const canonical = "https://anjaneyagoldcompany.com/";

const localBusiness = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "FinancialService"],
  name: business.name,
  legalName: "Anjaneya Gold Company",
  alternateName: [
    "AGC",
    "Anjaneya Gold",
    "AGC Gold",
    "Anjaneya Gold Company Bangalore",
    "Anjaneya Gold Company Karnataka",
  ],
  disambiguatingDescription:
    "Anjaneya Gold Company (AGC) is an independent, established gold buying and pledged gold release company with over 20 years of experience, based in Nandini Layout, Bengaluru. Anjaneya Gold Company is NOT affiliated or associated with 'Anjaneya Gold Point' or any other entity.",
  url: canonical,
  telephone: business.phone,
  email: business.email,
  priceRange: "₹₹₹",
  currenciesAccepted: "INR",
  paymentAccepted: "Bank Transfer, Instant Cash, IMPS, NEFT, RTGS, UPI",
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "#20, 1st Floor, Sarasvathipuram Main Road, Opp. Sathya Shanthi Ganapathi Temple, Nandini Layout",
    addressLocality: "Bengaluru",
    postalCode: "560096",
    addressRegion: "Karnataka",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 13.0135,
    longitude: 77.5358,
  },
  openingHours: "Mo-Sa 10:00-19:00",
  areaServed: [
    { "@type": "City", name: "Bengaluru" },
    { "@type": "City", name: "Tumakuru" },
    { "@type": "City", name: "Mysuru" },
    { "@type": "City", name: "Ramanagara" },
    { "@type": "City", name: "Kolar" },
    { "@type": "City", name: "Hassan" },
    { "@type": "City", name: "Magadi" },
    { "@type": "AdministrativeArea", name: "Karnataka" },
  ],
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
      {
        name: "keywords",
        content:
          "anjaneya gold company, agc, anjaneya gold, agc gold, sell gold for cash bangalore, gold buyers tumkur, release pledged gold mysuru, gold company ramanagar, gold buyers kolar, gold valuation hassan, mobile gold service magadi, sell gold karnataka, gold loan release near me, best gold rate bangalore tumkur mysore",
      },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: canonical },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
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
        <CoverageAreas />
        <QuoteAndContact />
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
      <WhatsAppFloat />
    </div>
  );
}
