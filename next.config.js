/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  images: {
    loader: "imgix",
    path: "",
    domains: ["stvinaprod.vtvcab.vn", "designercomvn.s3.ap-southeast-1.amazonaws.com"]
  },
  experimental: {
    isrMemoryCacheSize: 200
  }
}

module.exports = nextConfig
