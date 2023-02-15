import "assets/main.css"
import "assets/base.scss"
import "assets/index.css"
import "assets/swiper.scss"
import { Head } from "components/common"
import NextNprogress from "nextjs-progressbar"
const Noop = ({ children }) => <>{children}</>

function MyApp({ Component, pageProps }) {
  const Layout = Component.Layout || Noop
  // console.log("xcxcxxcx")
  return (
    <>
      <NextNprogress
        color="#03C988"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow={true}
        options={{ easing: "ease", speed: 500, showSpinner: false }}
      />
      <Head />
      <Layout pageProps={pageProps}>
        <Component {...pageProps} />
      </Layout>
      <div id="fb-root"></div>
      <div id="modal-root"></div>
      <div id="toast-root"></div>
    </>
  )
}

export default MyApp
