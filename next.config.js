const path = require("path")
module.exports = {
  experimental: {
    scrollRestoration: true,
    largePageDataBytes: 500 * 100000
  },
  // images: {
  //   // remotePatterns: [
  //   //   {
  //   //     protocol: "https",
  //   //     hostname: "**.vtvcab.vn",
  //   //     port: "**",
  //   //     pathname: "**"
  //   //   }
  //   // ],
  //   // loader: "imgix",
  //   path: "",
  //   domains: ["stvinadev.vtvcab.vn", "j03qukjhr2obj.vcdn.cloud", "stvinaprod.vtvcab.vn", "onsportimg.vtvcab.vn"],
  //   formats: ["image/avif", "image/webp"]
  //   // disableStaticImages: true
  // },
  images: {
    loader: "imgix",
    path: "",
    // domains: ["stvinadev.vtvcab.vn", "j03qukjhr2obj.vcdn.cloud", "stvinaprod.vtvcab.vn"],
    formats: ["image/avif", "image/webp"],
    disableStaticImages: true
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")]
  }
  // async headers() {
  //   return [
  //     {
  //       source: "https://cdn.onplay.live/sdk/web/latest/vtvliveplayer.js",
  //       headers: [
  //         {
  //           key: "cache-control",
  //           value: "public, max-age=86400, stale-while-revalidate=604800"
  //         }
  //       ]
  //     },
  //     {
  //       source: "https://cdn.onplay.live/sdk/web/latest/onplay.js",
  //       headers: [
  //         {
  //           key: "cache-control",
  //           value: "public, max-age=86400, stale-while-revalidate=604800"
  //         }
  //       ]
  //     }
  //   ]
  // }
}
