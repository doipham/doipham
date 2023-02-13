import Image from "next/legacy/image"
import useStore from "components/ui/Context"
import { useState } from "react"

function CardRound({ is_live, name, start_time, status, logo }) {
  const setModalLive = useStore().setModalLive
  const [srcImage, setSrcImage] = useState(logo)
  function nextPath() {
    if (status !== "live" && is_live) {
      setModalLive({
        show: true,
        isVod: true,
        info: {
          title: name,
          start_time
        }
      })
    }
  }
  return (
    <div onClick={nextPath} role="button" tabIndex="0" onKeyPress={() => {}}>
      <div className="relative">
        <div className="relative wapper__play">
          <div className="fix_img mb-2">
            <Image
              src={srcImage}
              alt={name}
              width={96}
              height={96}
              className=" border text-dark-500 relative rounded-full bg-dark-500"
              objectFit="contain"
              onError={() => setSrcImage("https://stvinaprod.vtvcab.vn/797864df-e895-426e-8573-210ca0d4b26c.png")}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardRound
