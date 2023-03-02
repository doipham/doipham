import Image from "next/legacy/image"

function ImageBanner() {
  return (
    <div className="relative">
      {/* <Image src={url} className="rounded-lg" width={w} height={h} alt="banner" /> */}
      <Image
        blurDataURL={"https://stvinaprod.vtvcab.vn/797864df-e895-426e-8573-210ca0d4b26c.png"}
        placeholder="blur"
        src={"https://intphcm.com/data/upload/banner-thoi-trang-bi-an.jpg"}
        height={1000}
        width={4000}
        alt="banner"
      />
    </div>
  )
}
export default ImageBanner
