import siteMetadata from "data/siteMetadata"
import NextHead from "next/head"

export default function Head() {
  // console.log("xx111", process.env.NEXT_PUBLIC_ONPLAY)
  return (
    <>
      <NextHead>
        <title>{siteMetadata.title}</title>
        <meta
          content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=5, user-scalable=1"
          name="viewport"
        />
        <script rel="preload" src="https://imasdk.googleapis.com/js/sdkloader/ima3.js"></script>
        <script rel="preload" type="text/javascript" src="/js/player-sdk.js" />
        {/* <script type="text/javascript" rel="preload" src="/js/live-overlay.js" /> */}
        {/* <script
          type="text/javascript"
          rel="preload"
          src="https://cdn.onplay.live/sdk/web/latest/vtvliveplayer.js"
        ></script> */}
        <script type="text/javascript" rel="preload" src={process.env.NEXT_PUBLIC_CDN_ONPLAY}></script>
        {/* Facebook */}
        <meta content={siteMetadata.title} itemProp="headline" property="og:title" />
        <meta content={siteMetadata.description} itemProp="description" property="og:description" />
        <meta property="og:site_name" itemProp="site_name" content="tv.vinasports.com.vn" />
        <meta property="og:rich_attachment" content="true" />
        <meta property="og:type" itemProp="type" content="website" />
        <meta property="og:url" itemProp="url" content="https://tv.vinasports.com.vn/" />
        <meta property="og:image" itemProp="thumbnailUrl" content={siteMetadata.thumb} />
        <meta property="og:image:width" content="560" />
        <meta property="og:image:height" content="292" />
        {/* Twitter  */}
        <meta name="twitter:title" content="ON Plus - Xem trực tiếp bóng đá, thể thao, tin tức số 1 Việt Nam" />
        <meta name="twitter:description" content={siteMetadata.description} />
        <meta name="twitter:url" itemProp="url" content="https://tv.vinasports.com.vn/" />
        <meta name="twitter:image" content={siteMetadata.thumb} />
        <meta name="twitter:image:width" content="640" />
        <meta name="twitter:image:height" content="360" />
      </NextHead>
    </>
  )
}

// export default Head
