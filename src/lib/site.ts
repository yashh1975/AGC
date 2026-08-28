/**
 * Single source of truth for Anjaneya Gold Company business content.
 * All values are taken from the company's existing website — do not invent data.
 */

export const business = {
  name: "Anjaneya Gold Company",
  tagline: "Values Your Gold",
  phone: "+91 90084 77669",
  phoneHref: "tel:+919008477669",
  whatsapp: "919008477669",
  whatsappMessage:
    "Hello Anjaneya Gold Company, I would like to enquire about your gold services.",
  email: "anjaneyagoldcompany@gmail.com",
  facebook: "https://www.facebook.com/share/1dTzBBy1Pv/",
  instagram: "https://www.instagram.com/anjaneyagoldcompany",
  addressLines: [
    "#20, 1st Floor,",
    "Sarasvathipuram Main Road,",
    "Opp. Sathya Shanthi Ganapathi Temple,",
    "Nandini Layout,",
    "Bengaluru - 560096, Karnataka.",
  ],
  timings: "10:00 AM – 7:00 PM, Monday to Saturday",
  mapQuery:
    "Anjaneya Gold Company, Saraswathipuram Main Road, Nandini Layout, Bengaluru 560096",
} as const;

export const whatsappHref = `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(
  business.whatsappMessage,
)}`;

export const mapsDirections = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  business.mapQuery,
)}`;

export const mapsEmbed = `https://maps.google.com/maps?q=${encodeURIComponent(
  business.mapQuery,
)}&t=&z=16&ie=UTF8&iwloc=&output=embed`;

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Why Us", href: "#why-us" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
] as const;

export const trustBar = [
  "20+ Years Experience",
  "XRF Gold Testing",
  "Transparent Process",
  "Instant Bank Transfer",
  "Mobile Gold Service",
  "Zero Service / Commission Charges",
] as const;

export type ServiceKey = "sell" | "release" | "repledge" | "mobile";

export const services: {
  key: ServiceKey;
  index: string;
  title: string;
  copy: string;
  cta: string;
  steps: string[];
}[] = [
  {
    key: "sell",
    index: "01",
    title: "Sell Gold for Cash",
    copy: "Get your gold evaluated through purity and weight verification and receive competitive value based on applicable market conditions.",
    cta: "Get a Free Quote",
    steps: ["Gold Jewellery", "Purity", "Weight", "Evaluation", "Value"],
  },
  {
    key: "release",
    index: "02",
    title: "Release Your Pledged Gold",
    copy: "Get assistance with releasing pledged gold through document verification, authentication and a transparent process.",
    cta: "Learn More",
    steps: ["Pledged Gold", "Documentation", "Verification", "Release", "Transaction"],
  },
  {
    key: "repledge",
    index: "03",
    title: "Re-Pledge Your Gold",
    copy: "Explore re-pledging options when you need better terms or a higher loan amount, subject to applicable evaluation and approval.",
    cta: "Talk to Our Team",
    steps: ["Gold", "Assessment", "Financial Requirement", "Re-Pledging"],
  },
  {
    key: "mobile",
    index: "04",
    title: "Mobile Gold Service",
    copy: "Convenient gold evaluation and transaction assistance at your location.",
    cta: "Book Mobile Service",
    steps: ["Location", "Mobile Team", "Testing", "Evaluation", "Transaction"],
  },
];

export const howItWorks = [
  {
    n: "01",
    title: "Bring Your Gold",
    copy: "Visit our Nandini Layout branch, or request our mobile service at your location.",
  },
  {
    n: "02",
    title: "Document Verification",
    copy: "A valid government-issued photo ID and address proof are verified by our team.",
  },
  {
    n: "03",
    title: "Purity & Weight Check",
    copy: "We evaluate your gold using a German XRF Gold Testing Machine for a 99% purity check.",
  },
  {
    n: "04",
    title: "Pricing Evaluation",
    copy: "With purity and weight established, we update you with the best price according to the current market rate.",
  },
  {
    n: "05",
    title: "Documentation",
    copy: "Document verification and receipt transfer of your gold is handled smoothly and securely.",
  },
  {
    n: "06",
    title: "Instant Bank Transfer",
    copy: "Once formalities are completed, the amount is transferred to your bank account instantly.",
  },
] as const;

export const releaseSteps = [
  {
    n: "01",
    title: "Pledged Document",
    copy: "Present your pledged document for verification purposes.",
  },
  {
    n: "02",
    title: "Authentication Check",
    copy: "If documents are found authentic, we check with the bank / financier and release your pledged gold.",
  },
  {
    n: "03",
    title: "Spot Offer",
    copy: "Once all formalities are completed, we provide you with a spot offer for your pledged gold.",
  },
  {
    n: "04",
    title: "Instant Cash Transfer",
    copy: "The amount is transferred to your bank account instantly upon acceptance.",
  },
] as const;

export const whyUs = [
  {
    title: "Trust & Transparency",
    copy: "Over two decades of integrity and honest dealings.",
  },
  {
    title: "Best Market Prices",
    copy: "We offer the most competitive prices for your gold.",
  },
  {
    title: "Certified Purity",
    copy: "Advanced XRF testing ensures 99% accurate purity checks.",
  },
  {
    title: "Quick & Secure",
    copy: "Fast processing and instant bank transfers.",
  },
] as const;

export const trustArchitecture = [
  "Transparent Valuation",
  "Purity Verification",
  "Documentation",
  "Secure Processing",
  "Bank Transfer",
] as const;

export const faqs = [
  {
    q: "What ID proof is required for selling gold?",
    a: "For selling gold, we typically require a valid government-issued photo ID (such as an Aadhar card, PAN card, or Driver's License) and address proof. Our team will guide you through the exact requirements during your visit.",
  },
  {
    q: "Can I sell gold for cash?",
    a: "Yes, you can sell gold for cash. We offer instant cash transfers directly to your bank account upon completion of the transaction, ensuring a quick and secure process.",
  },
  {
    q: "What are your branch timings?",
    a: "Our branches are open from 10:00 AM to 7:00 PM, Monday to Saturday. We are closed on Sundays and public holidays. For mobile service, please contact us to schedule an appointment.",
  },
  {
    q: "Can I sell my gold which is without a hallmark?",
    a: "Yes, you can sell gold even if it's without a hallmark. We use advanced German XRF Gold Testing Machines to accurately determine the purity of your gold, regardless of whether it's hallmarked or not.",
  },
  {
    q: "Do you release pledged gold?",
    a: "Absolutely. We specialize in releasing pledged gold from banks and other finance companies. Just provide us with your pledged document, and we will handle the rest, including authentication and settlement.",
  },
  {
    q: "Can you release gold which has already been pledged in a bank or finance company?",
    a: "Yes, we can. We have a streamlined process to help you release your gold from any bank or finance company where it has been pledged. We will verify the documents, settle the outstanding amount, and then proceed with the gold purchase.",
  },
  {
    q: "What if I am not satisfied with the valuation after the release of gold?",
    a: "Your satisfaction is our priority. If you are not satisfied with the valuation after your pledged gold has been released, you are under no obligation to sell. We believe in complete transparency and fair dealings.",
  },
] as const;

export const testimonials = [
  {
    name: "Pooja Gowda",
    category: "Sell Gold",
    quote:
      "Anjaneya Gold Company made selling my old gold incredibly easy and transparent. The staff were professional, and I received the best price. Highly recommended!",
  },
  {
    name: "Rahul Kumar",
    category: "Mobile Service",
    quote:
      "I was amazed by their mobile service! They came to my home, did the testing, and transferred the cash instantly. So convenient and trustworthy.",
  },
  {
    name: "Anjali Shetty",
    category: "Pledged Gold Release",
    quote:
      "Releasing my pledged gold was a breeze with Anjaneya Gold. They handled everything with the bank and gave me a fair offer. Excellent service!",
  },
  {
    name: "Deepak Verma",
    category: "Sell Gold",
    quote:
      "I needed urgent cash and Anjaneya Gold provided a quick and fair deal for my gold. Their process is very professional and trustworthy. Highly recommend their services!",
  },
  {
    name: "Sneha Reddy",
    category: "Re-Pledge",
    quote:
      "The re-pledging service was a lifesaver! I got better terms and the team was incredibly helpful throughout the entire process. Thank you, Anjaneya Gold!",
  },
] as const;
