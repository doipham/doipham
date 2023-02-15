import "swiper/css"
import { Layout } from "components/common"
import Slide from "components/Slide"
import { Slides } from "utils/Slides"
function Component() {
  console.log(Slides, " hien thi slide")
  return (
    <section className="mb-12">
      <Slide slides={Slides} />
    </section>
  )
}

export default Component
Component.Layout = Layout
