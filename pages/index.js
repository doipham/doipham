import "swiper/css"
import { Layout } from "components/common"
import Slide from "components/Slide"
import { Slides } from "utils/Slides"
import Home from "./Home"
import Banner from "./Banner"
import { screenBlocks } from "utils/ScreenBlock"
import { SwiperAdvertisement, SwiperCategory, SwiperFashionShow, SwiperProduct } from "components/Swiper"
function Component() {
  console.log(Slides, screenBlocks, " hien thi slide")
  function renderBlock(type_block, item, leagues) {
    switch (type_block) {
      case 1:
        return <SwiperProduct {...item} />
      // case 2:
      //   return <SwiperFashionShow {...item} />
      // case 3:
      //   return <SwiperCategory {...item} />
      // case 4:
      //   return <SwiperCategory {...item} />
      default:
        return <SwiperProduct {...item} />
    }
  }
  return (
    <section className="mb-12">
      <Slide slides={Slides} />
      <div className="pt-0 mx-auto mt-10 space-y-10  overflow-x-hidden max-w-screen-xl">
        {screenBlocks?.length > 0 &&
          screenBlocks?.map((item) => {
            const { id, type_block } = item
            return <div key={id}>{renderBlock(type_block, item)}</div>
          })}
        <Banner />
      </div>
    </section>
  )
}

export default Component
Component.Layout = Layout
