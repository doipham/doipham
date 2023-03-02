import Image from "next/legacy/image"
import useStore from "components/ui/Context"
import { useState } from "react"
import { renderTimeFromNow, renderTime, convertSeccondToTimePlay } from "utils/time"
import TypeTag from "utils/TypeTag"
import TagPremium from "components/TagPremium"

function CardVodVertical({
  is_live,
  name,
  start_time,
  status,
  duration,
  thumbnail,
  created,
  hideText,
  showTime = true,
  package_type,
  is_premium
}) {
  const setModalLive = useStore().setModalLive
  const [srcImage, setSrcImage] = useState(thumbnail)
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
      <div className={is_premium ? "card" : ""} data-label="- 40%">
        <div className="relative">
          <div className="relative wapper__play">
            <div className="fix_img mb-2">
              <Image
                className="bg-dark-900"
                src={srcImage}
                width={3000}
                height={4000}
                alt={name}
                onError={() => setSrcImage("https://stvinaprod.vtvcab.vn/4ab5f0e3-d616-4834-9485-d54b0ebb7115.png")}
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

            <div
              className="absolute text-dark shadow top-2 left-2 bg-premium font-semibold rounded flex  items-center px-1 py-0.5"
              style={{ fontSize: "8px" }}
            >
              <div>PREMIUM</div>
            </div>

            <TagPremium package_type={package_type} />
            {status === "live" && is_live && (
              <div className="absolute shadow top-2 left-2 bg-dark-50 rounded-xl flex  items-center px-1 ">
                <div className=" rounded-full h-2 w-2 bg-red-500 mr-1"></div>
                <div className="text-dark-800 font-semibold" style={{ fontSize: 10 }}>
                  LIVE
                </div>
              </div>
            )}
            {!is_live && (
              <div className="absolute text-white shadow text-sm bottom-2 right-2 bg-black bg-opacity-80 rounded flex items-center px-1  ">
                <div>{convertSeccondToTimePlay(duration)}</div>
              </div>
            )}
          </div>
          {!hideText && (
            <>
              <div className="line-clamp-2 text-sm bottom-0 left-0 w-full text-dark-100 font-bold">{name}</div>
              {showTime && (
                <time dateTime={new Date(start_time)} className="text-dark-500 text-xs">
                  {is_live ? renderTime(start_time) : renderTimeFromNow(created)}
                </time>
              )}
            </>
          )}
        </div>
      </div>

      {/* <div className="relative">
        <div className="relative wapper__play">
          <div className="fix_img mb-2">
            <Image
              className="rounded-lg bg-dark-900"
              src={srcImage}
              width={480}
              height={600}
              alt={name}
              onError={() => setSrcImage("https://stvinaprod.vtvcab.vn/4ab5f0e3-d616-4834-9485-d54b0ebb7115.png")}
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

          <div
            className="absolute text-dark shadow top-2 left-2 bg-premium font-semibold rounded flex  items-center px-1 py-0.5"
            style={{ fontSize: "8px" }}
          >
            <div>PREMIUM</div>
          </div>

          <TagPremium package_type={package_type} />
          {status === "live" && is_live && (
            <div className="absolute shadow top-2 left-2 bg-dark-50 rounded-xl flex  items-center px-1 ">
              <div className=" rounded-full h-2 w-2 bg-red-500 mr-1"></div>
              <div className="text-dark-800 font-semibold" style={{ fontSize: 10 }}>
                LIVE
              </div>
            </div>
          )}
          {!is_live && (
            <div className="absolute text-white shadow text-sm bottom-2 right-2 bg-black bg-opacity-80 rounded flex items-center px-1  ">
              <div>{convertSeccondToTimePlay(duration)}</div>
            </div>
          )}
        </div>
        {!hideText && (
          <>
            <div className="line-clamp-2 text-sm bottom-0 left-0 w-full text-dark-100 font-bold">{name}</div>
            {showTime && (
              <time dateTime={new Date(start_time)} className="text-dark-500 text-xs">
                {is_live ? renderTime(start_time) : renderTimeFromNow(created)}
              </time>
            )}
          </>
        )}
      </div> */}
    </div>
  )
}
export default CardVodVertical
