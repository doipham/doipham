import React, { memo } from "react"
import { CardVod } from "components/Card"
import Link from "next/link"
import TypeEvent from "utils/TypeEvent"
import DisplayTypeScreenBlock from "utils/DisplayTypeScreenBlock"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import { Navigation } from "swiper"
// eslint-disable-next-line react/display-name
const MySwiper = memo(({ name, events, id }) => {
  return (
    <div className="mb-4 md:mb-4 lg:mb-6 ">
      <h2 className="relative mb-2 md:mb-2 text-sm md:text-lg lg:text-xl font-semibold">
        <Link href={`/danh-muc/${id}`}>
          <div className="text-dark-100 flex items-center wapper_see_more">
            <span className="uppercase mr-4">{name}</span>{" "}
            <div className="text-primary-500 text-sm flex items-center see_more">
              <span>Xem thêm</span>
              {icSeemore}
            </div>
          </div>
        </Link>
      </h2>
      <div className="relative wapper__swiper__custom">
        <Swiper
          key="vod_item"
          slidesPerView={5}
          slidesPerGroup={5}
          spaceBetween={16}
          modules={[Navigation]}
          className={"mySwiper"}
          navigation={true}
        >
          {events?.length > 0 &&
            events?.map((item) => {
              return (
                <SwiperSlide key={item?.id}>
                  <CardVod {...item} />
                </SwiperSlide>
              )
            })}
        </Swiper>
      </div>
    </div>
  )
})

export default MySwiper

const icSeemore = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13 17L18 12L13 7" stroke="#66A7FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6 17L11 12L6 7" stroke="#66A7FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
