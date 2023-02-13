import Image from "next/legacy/image"
import s from "./UploadImage.module.css"
import { DfAvatarLogin } from "components/ui/Icons"
import { useState } from "react"

export default function Loading({ loading, src, avatar }) {
  const [urcImage, setSrcImage] = useState(avatar ? src : DfAvatarLogin)
  return (
    <div className={s.cover}>
      <Image
        alt="image"
        src={avatar || urcImage}
        width={80}
        height={80}
        className="rounded-full cursor-pointer"
        onError={() => setSrcImage("https://stvinaprod.vtvcab.vn/98617bf4-240e-4b4f-a884-a7912c7d1c52.png")}
        // loading={loading}
      ></Image>
      {loading ? <div className={s.loader}></div> : <div className={s.edit}>{edit}</div>}
    </div>
  )
}

const edit = (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="28" height="28" rx="14" fill="#52B5F9" />
    <path
      d="M18.355 11.52C18.55 11.325 18.55 11 18.355 10.815L17.185 9.64503C17 9.45003 16.675 9.45003 16.48 9.64503L15.56 10.56L17.435 12.435L18.355 11.52ZM9.5 16.625V18.5H11.375L16.905 12.965L15.03 11.09L9.5 16.625Z"
      fill="white"
      fillOpacity="0.87"
    />
  </svg>
)
