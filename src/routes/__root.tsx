import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, Link, createRootRouteWithContext, useRouter } from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1, viewport-fit=cover, maximum-scale=5",
      },
      { name: "theme-color", content: "#180500" },
      { name: "format-detection", content: "telephone=no" },
      { title: "Anjaneya Gold Company | Sell Gold for Cash & Release Pledged Gold in Bangalore" },
      {
        name: "description",
        content:
          "Bangalore's trusted gold buyers with 20+ years of experience. Sell gold for instant cash, release pledged gold from banks, German XRF 99% purity testing & doorstep mobile gold service in Bengaluru.",
      },
      {
        name: "keywords",
        content:
          "sell gold for cash bangalore, release pledged gold bangalore, gold buyers nandini layout, gold valuation bangalore, xrf gold testing bangalore, mobile gold service bangalore, best gold rate bangalore, anjaneya gold company",
      },
      { name: "author", content: "Anjaneya Gold Company" },
      {
        name: "robots",
        content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
      },
      { name: "geo.region", content: "IN-KA" },
      { name: "geo.placename", content: "Bengaluru, Nandini Layout" },
      { name: "geo.position", content: "13.0135;77.5358" },
      { name: "ICBM", content: "13.0135, 77.5358" },
      {
        property: "og:title",
        content: "Anjaneya Gold Company | Sell Gold for Cash & Release Pledged Gold in Bangalore",
      },
      {
        property: "og:description",
        content:
          "Get maximum value for your gold in Bangalore. German XRF 99% purity check, instant bank transfer, pledged gold release, and mobile gold service at your doorstep.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://anjaneyagoldcompany.com/" },
      { property: "og:image", content: "https://anjaneyagoldcompany.com/og-image.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Anjaneya Gold Company | Sell Gold for Cash in Bangalore" },
      {
        name: "twitter:description",
        content:
          "Bangalore's trusted gold buyer: instant cash for gold, release pledged gold from banks, German XRF testing, doorstep mobile gold service.",
      },
      { name: "twitter:image", content: "https://anjaneyagoldcompany.com/og-image.jpg" },
    ],
    links: [
      { rel: "canonical", href: "https://anjaneyagoldcompany.com/" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "dns-prefetch", href: "https://fonts.googleapis.com" },
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "apple-touch-icon", href: "/favicon.png" },
      { rel: "manifest", href: "/site.webmanifest" },
    ],
  }),

  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
