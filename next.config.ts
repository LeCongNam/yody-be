import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    domains: [
      "unsplash.com",
      "plus.unsplash.com",
      "m.yodycdn.com",
      "res.cloudinary.com",
    ],
  },

  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    // ignoreBuildErrors: true,
  },
}

export default nextConfig
