import NextHead from "next/head"

export default function HeaderPage({ initVideo, query }) {
  const { thumbnail, name } = initVideo
  return (
    <NextHead>
      <title>{name}</title>
      <meta name="description" content={name} />

      <meta property="og:title" key="title" content={name} itemProp="headline" />
      <meta property="og:description" key="description" content={name} itemProp="description" />
      <meta property="og:image" key="image" itemProp="thumbnailUrl" content={initVideo?.thumbnail} />
      <meta
        property="og:url"
        key="url"
        itemProp="url"
        content={`https://tv.vinasports.vn/video?id=${query.id}&type=${query.type}`}
      />
      <meta key="imageWidth" property="og:image:width" content="640" />
      <meta key="imageHeight" property="og:image:height" content="360" />

      <meta name="twitter:card" value="summary" />
      <meta name="twitter:title" key="tw-title" content={name} />
      <meta name="twitter:description" key="tw-description" content={name} />
      <meta name="twitter:image" key="tw-image" content={thumbnail} />
      <meta name="twitter:image:width" key="tw-width" content="640" />
      <meta name="twitter:image:height" key="tw-height" content="360" />
      <meta
        name="twitter:url"
        itemProp="url"
        key="tw-url"
        content={`https://tv.vinasports.vn/video?id=${query.id}&type=${query.type}`}
      />
      <meta name="twitter:site" content="@tv.vinasports" />
      <meta name="twitter:creator" content="@tv.vinasports" />
    </NextHead>
  )
}
