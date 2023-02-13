import Image from "next/legacy/image"
import useStore from "components/ui/Context"
import { useState } from "react"
import { renderTimeFromNow, renderTime, convertSeccondToTimePlay } from "utils/time"
import TagPremium from "components/TagPremium"

function CardVodHorizontal({
  is_live,
  name,
  thumbnail_horizontal,
  start_time,
  created,
  status,
  duration,
  is_premium,
  hideText,
  showTime = true,
  package_type
}) {
  const setModalLive = useStore().setModalLive
  const [srcImage, setSrcImage] = useState(thumbnail_horizontal)
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
      {/* card tỉ lệ 16/9 */}
      <div className="relative">
        <div className="relative wapper__play">
          <div className="fix_img mb-2">
            <Image
              className="rounded-lg bg-dark-900"
              src={srcImage}
              width={548}
              height={308}
              alt={"name"}
              placeholder="ddd"
              onError={() => setSrcImage("https://stvinaprod.vtvcab.vn/797864df-e895-426e-8573-210ca0d4b26c.png")}
            />
          </div>
          <div className="layer__play rounded-lg">
            <div className="icon__play">
              <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M1.7035 0.973862C1.03778 0.550219 0.166626 1.02843 0.166626 1.81752V18.5909C0.166626 19.3799 1.03778 19.8582 1.7035 19.4345L14.8825 11.0478C15.5 10.6549 15.5 9.75348 14.8825 9.36053L1.7035 0.973862Z"
                  fill="#006DFF"
                />
              </svg>
            </div>
          </div>
          {/* {is_premium && (
            <div
              className="absolute text-dark shadow top-2 left-2 bg-premium font-semibold rounded flex  items-center px-1 py-0.5"
              style={{ fontSize: "8px" }}
            >
              {iconPre} &nbsp;<div>PREMIUM</div>
            </div>
          )}  */}
          <TagPremium package_type={package_type} />
          {status === "live" && is_live && (
            <div className="absolute shadow bottom-2 right-2 bg-dark-50 rounded-xl flex  items-center px-1 3xl:right-4 2xl:right-4">
              <div className=" rounded-full h-2 w-2 bg-red-500 mr-1"></div>
              <div className="text-dark-800 font-semibold" style={{ fontSize: 10 }}>
                LIVE
              </div>
            </div>
          )}
          {!is_live && (
            <div className="absolute text-white shadow text-sm bottom-1 right-1 bg-black bg-opacity-80 rounded flex space-x-2 items-center px-2 3xl:right-4 2xl:right-4">
              <div>{convertSeccondToTimePlay(duration)}</div>
            </div>
          )}
        </div>
        {!hideText && (
          <>
            <div className="line-clamp-2 text-sm bottom-0 left-0 w-full text-dark-100 font-bold">{name}</div>
            {showTime && (
              <>
                <time dateTime={new Date(start_time)} className="text-dark-500 text-xs">
                  {is_live ? renderTime(start_time) : renderTimeFromNow(created)}
                </time>
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}
export default CardVodHorizontal

const iconPre = (
  <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.45681 3.36076L4.10856 0.709007C4.24931 0.568257 4.44006 0.489258 4.63881 0.489258C4.83781 0.489258 5.02856 0.568257 5.16931 0.709007C5.71256 1.25251 6.74706 2.28701 7.29056 2.83026C7.43131 2.97101 7.51031 3.16176 7.51031 3.36076C7.51031 3.55951 7.43106 3.75026 7.29056 3.89101L4.63881 6.54276L4.10856 6.01226C4.01106 5.91476 3.85256 5.91476 3.75506 6.01226C3.65731 6.11001 3.65731 6.26826 3.75506 6.36576L4.28531 6.89626L3.90956 7.27201C3.76881 7.41276 3.57806 7.49176 3.37906 7.49176C3.18031 7.49176 2.98956 7.41276 2.84881 7.27201C2.57906 7.00226 2.25331 6.67651 2.25331 6.67651C2.15556 6.57901 2.15556 6.42051 2.25331 6.32301C2.25331 6.32301 2.32106 6.25526 2.41106 6.16526C2.48281 6.09351 2.52306 5.99626 2.52306 5.89476C2.52306 5.79326 2.48281 5.69601 2.41106 5.62426C2.41106 5.62401 2.41081 5.62401 2.41081 5.62376C2.33906 5.55201 2.24156 5.51176 2.14031 5.51176C2.03881 5.51176 1.94156 5.55201 1.86981 5.62376C1.77956 5.71401 1.71181 5.78151 1.71181 5.78151C1.61431 5.87926 1.45606 5.87926 1.35831 5.78151C1.35831 5.78151 1.00981 5.43301 0.727562 5.15076C0.586812 5.01001 0.507812 4.81926 0.507812 4.62051C0.507812 4.42151 0.586812 4.23076 0.727562 4.09001L1.10331 3.71426L1.63356 4.24451C1.73131 4.34201 1.88956 4.34201 1.98731 4.24451C2.08481 4.14701 2.08481 3.98851 1.98731 3.89101L1.45681 3.36076ZM4.40681 2.78001L4.89306 2.43026C4.96881 2.37551 5.06906 2.36776 5.15256 2.41026C5.23581 2.45276 5.28856 2.53826 5.28906 2.63201L5.29181 3.23076L5.77456 3.58501C5.85006 3.64051 5.88831 3.73326 5.87356 3.82576C5.85906 3.91826 5.79406 3.99476 5.70506 4.02401L5.13631 4.21176L4.94856 4.78051C4.91931 4.86926 4.84281 4.93426 4.75031 4.94901C4.65781 4.96351 4.56506 4.92551 4.50981 4.85001L4.15531 4.36701L3.55656 4.36426C3.46306 4.36376 3.37756 4.31126 3.33506 4.22776C3.29256 4.14451 3.30006 4.04426 3.35481 3.96826L3.70456 3.48226L3.52206 2.91176C3.49356 2.82251 3.51731 2.72501 3.58356 2.65876C3.64956 2.59276 3.74731 2.56901 3.83631 2.59751L4.40681 2.78001Z"
      fill="#000E2B"
    />
  </svg>
)
