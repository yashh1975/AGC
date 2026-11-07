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
      {
        title: "Anjaneya Gold Company (AGC) | Top Gold Buyers in Karnataka",
      },
      {
        name: "description",
        content:
          "Sell gold for instant cash & release pledged gold with Anjaneya Gold Company (AGC). 20+ yrs trust, German XRF testing & spot payment across Karnataka.",
      },
      {
        name: "keywords",
        content:
          "anjaneya gold company, agc, anjaneya gold, agc gold, sell gold for cash bangalore, gold buyers tumkur, release pledged gold mysuru, gold company ramanagar, gold buyers kolar, gold valuation hassan, mobile gold service magadi, sell gold karnataka, gold loan release near me, best gold rate bangalore tumkur mysore",
      },
      { name: "author", content: "Anjaneya Gold Company" },
      {
        name: "robots",
        content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
      },
      { name: "geo.region", content: "IN-KA" },
      {
        name: "geo.placename",
        content: "Bengaluru, Tumakuru, Mysuru, Ramanagara, Kolar, Hassan, Magadi, Karnataka",
      },
      { name: "geo.position", content: "13.0135;77.5358" },
      { name: "ICBM", content: "13.0135, 77.5358" },
      {
        property: "og:title",
        content: "Anjaneya Gold Company (AGC) | Top Gold Buyers in Karnataka",
      },
      {
        property: "og:description",
        content:
          "Sell gold for instant cash & release pledged gold with Anjaneya Gold Company (AGC). 20+ yrs trust, German XRF testing & spot payment across Karnataka.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://anjaneyagoldcompany.com/" },
      { property: "og:image", content: "https://anjaneyagoldcompany.com/og-image.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Anjaneya Gold Company (AGC) | Top Gold Buyers in Karnataka",
      },
      {
        name: "twitter:description",
        content:
          "Sell gold for instant cash & release pledged gold with Anjaneya Gold Company (AGC). 20+ yrs trust, German XRF testing & spot payment across Karnataka.",
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
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "shortcut icon", href: "/favicon.ico" },
      { rel: "icon", type: "image/png", sizes: "48x48", href: "/favicon-48x48.png" },
      { rel: "icon", type: "image/png", sizes: "96x96", href: "/favicon-96x96.png" },
      { rel: "icon", type: "image/png", sizes: "144x144", href: "/favicon-144x144.png" },
      { rel: "icon", type: "image/png", sizes: "192x192", href: "/favicon-192x192.png" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
      { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
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
