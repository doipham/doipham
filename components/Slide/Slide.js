import React, { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css/free-mode"
import "swiper/css/navigation"
import "swiper/css/thumbs"
import { Navigation, Autoplay } from "swiper"
import Image from "next/legacy/image"
import { useRef } from "react"
import { renderTime } from "utils/time"
import { useRouter } from "next/router"
import useStore from "components/ui/Context"
import { getAccessToken } from "lib/Cookies"
import TagPremium from "components/TagPremium"
import cn from "classnames"
export default function Slide({ slides }) {
  console.log(slides, " hien thi slidessss")
  const router = useRouter()
  const { togleModalLogin, setModalLive } = useStore()
  const isMonter = useRef(false)
  const [swiperBanner, setSwiperBanner] = useState()
  const __time = useRef()

  function onMouseOver(index) {
    if (__time.current) clearTimeout(__time.current)
    __time.current = setTimeout(() => {
      swiperBanner?.slideTo(index)
    }, 400)
  }

  // function onClick(item, e) {
  //   if (item?.type_link === 1 && item?.event) {
  //     if (item?.event?.status === "live") return true
  //     setModalLive({
  //       show: true,
  //       isVod: true,
  //       info: {
  //         title: item?.event?.name,
  //         start_time: item?.event?.start_time
  //       }
  //     })
  //     e.preventDefault()
  //     return false
  //   }
  //   if (item?.type_link !== 0 && !getAccessToken()) {
  //     if (item?.event?.is_protected || item?.video?.is_protected) {
  //       isMonter.current = true
  //       togleModalLogin()
  //       e.preventDefault()
  //       return false
  //     }
  //   }

  //   if (!item?.event && !item?.video) {
  //     e.preventDefault()
  //     return false
  //   }
  // }
  const handleMouseEnter = () => {
    swiperBanner?.autoplay?.stop()
  }
  const handleMouseLeave = () => {
    swiperBanner?.autoplay?.start()
  }
  function onNextPath(item) {
    let isPlay
    if (item?.type_link === 1 && (!item.event || item.event?.status === "finish")) {
      isPlay = false
    } else {
      isPlay = true
    }
    clearInterval(__time.current)
    __time.current = null
    if (isPlay) {
      if (item?.type_link === 1 && item?.event) {
        if (item?.event?.status === "live") {
          router.push(convertLink(item))
          return true
        }
        setModalLive({
          show: true,
          isVod: true,
          info: {
            title: item?.event?.name,
            start_time: item?.event?.start_time
          }
        })
        return false
      }
      if (item?.type_link !== 0 && !getAccessToken()) {
        if (item?.event?.is_protected || item?.video?.is_protected) {
          isMonter.current = true
          togleModalLogin()
          return false
        }
      }
      if (!item?.event && !item?.video) {
        // router.push(convertLink(slides[step]))
        window.open(convertLink(item))
        return false
      }
    }
    router.push(convertLink(item))
  }

  function handlePadding() {
    if (slides?.length < 6) {
      return { paddingLeft: "40px", paddingRight: "40px" }
    } else {
      return { paddingLeft: "0px", paddingright: "0px" }
    }
  }
  useEffect(() => {
    return () => {
      if (__time.current) clearTimeout(__time.current)
    }
  }, [])
  useEffect(() => {
    handlePadding()
  }, [])
  // console.log({ slides })

  return (
    <div className="slide m-auto relative">
      <Swiper
        onSwiper={setSwiperBanner}
        loop={true}
        navigation={true}
        modules={[Navigation, Autoplay]}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false
        }}
        className="mySwiper"
      >
        {slides?.map((params) => {
          return (
            <SwiperSlide key={params?.id}>
              <div className="fix_img">
                <Image
                  blurDataURL={
                    renderUrl(params?.base_url, params?.thumbnail, "160x90") ||
                    "https://stvinaprod.vtvcab.vn/797864df-e895-426e-8573-210ca0d4b26c.png"
                  }
                  placeholder="blur"
                  src={
                    renderUrl(params?.base_url, params?.thumbnail, "720x405") ||
                    "https://stvinaprod.vtvcab.vn/797864df-e895-426e-8573-210ca0d4b26c.png"
                  }
                  height={7400}
                  width={16000}
                  alt={params?.name}
                />
                <div
                  className={cn(
                    "absolute top-0 z-30 h-full w-full flex items-center px-52",
                    params.position_text === "left" ? "justify-start" : "justify-end"
                  )}
                >
                  <div className="mb-20">
                    <div className="text-blue-600 font-semibold text-60">{params?.name}</div>
                    <div className="font-semibold text-28 mb-4">{params?.sub}</div>
                    <div
                      className="rounded-full bg-primary-hover w-32 text-center px-2 py-2 font-medium text-white cursor-pointer shadow"
                      onClick={(id) => {
                        console.log(id, " hien thi id")
                      }}
                    >
                      xem ngay
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}
function renderUrl(base_url, thumbnail, size) {
  if (thumbnail?.includes("http")) return thumbnail
  return `${base_url}${size}/${thumbnail}`
}

function renderUrlSlideSmall(url) {
  return url?.replace("1280x720", "720x405")
}

function convertLink(item) {
  const { type_link, link, event, video } = item
  if (type_link === 1) {
    return `/video?id=${event?.id}&type=1`
  }
  if (type_link === 2) {
    return `/video?id=${event?.id}&type=2`
  }
  return link
}
