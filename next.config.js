/** @type {import('next').NextConfig} */
const path = require("path")
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    scrollRestoration: true,
    largePageDataBytes: 500 * 100000
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")]
  },
  images: {
    loader: "imgix",
    path: "",
    // domains: ["stvinadev.vtvcab.vn", "j03qukjhr2obj.vcdn.cloud", "stvinaprod.vtvcab.vn"],
    formats: ["image/avif", "image/webp"],
    disableStaticImages: true
  }
}

module.exports = nextConfig
