import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
    ],
    formats: ["image/webp", "image/avif"],
  },
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        { key: "X-Frame-Options", value: "DENY" },
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "X-XSS-Protection", value: "1; mode=block" },
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains; preload",
        },
        {
          key: "Permissions-Policy",
          value: "camera=(), microphone=(), geolocation=()",
        },
        {
          key: "Content-Security-Policy",
          value: [
            "default-src 'self'",
            "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://js.stripe.com https://challenges.cloudflare.com",
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
            "img-src 'self' data: blob: https://res.cloudinary.com https://*.supabase.co",
            "font-src 'self' https://fonts.gstatic.com",
            "frame-src https://js.stripe.com https://challenges.cloudflare.com",
            "connect-src 'self' https://api.stripe.com https://*.supabase.co https://*.sentry.io",
          ].join("; "),
        },
      ],
    },
  ],
};

export default nextConfig;
