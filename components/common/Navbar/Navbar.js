import Link from "next/link"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { Search } from "components/ui"
import cn from "classnames"
import s from "./Navbar.module.css"
import { Fragment, useEffect, useRef, useState } from "react"
import Image from "next/legacy/image"

const Profile = dynamic(() => import("components/common/Profile"), { ssr: false })
const id = "esports"
const listMenus = [
  {
    title: "Trang chủ",
    path: "/"
  },
  {
    title: "Sản phẩm",
    path: "/product"
  },
  {
    title: "Blog",
    path: `/blog`
  },
  {
    title: "Giới thiệu",
    path: `/sub`
  }
]

export default function Navbar() {
  const router = useRouter()
  const [index, setIndex] = useState("/")
  const [isBlack, setBlack] = useState(false)
  const isMounter = useRef()
  const [isMobile, setIsMobile] = useState(false)
  const [showMenu, setShowMenu] = useState(false)

  useEffect(() => {
    if (process.browser) {
      window.addEventListener("scroll", () => {
        if (window.scrollY > 1) {
          if (!isMounter.current) {
            setBlack(true)
            isMounter.current = true
          }
        } else {
          if (isMounter.current) {
            setBlack(false)
            isMounter.current = false
          }
        }
      })
      return () => window.removeEventListener("scroll", null)
    }
  }, [])

  useEffect(() => {
    setIndex(router.asPath)
  }, [router])

  useEffect(() => {
    if (window.innerWidth < 767) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
  }, [])

  return (
    <div>
      {isMobile === false && (
        <nav
          className={
            "fixed w-full top-0 z-50 border-b border-b-black border-opacity-10 bg-white backdrop-blur-lg dark:border-b-transparent dark:bg-dark-1 dark:bg-opacity-80"
          }
        >
          <div className=" m-auto flex w-full justify-between items-center md:max-w-screen-xl">
            <div className="flex relative items-center">
              <Link href="/">
                <div className="py-1 flex" style={{ minWidth: 141 }}>
                  <div className="flex gap-2 items-center">
                    <Image
                      width={60}
                      height={60}
                      src="https://dayve.vn/wp-content/uploads/2022/04/cach-ve-hoa-dam-but-buoc-7.png"
                      alt="xx"
                    />
                    <div className="text-2xl font-medium">DNT</div>
                  </div>
                </div>
              </Link>
            </div>
            <div className="flex space-x-6 justify-center items-center">
              {listMenus.map(({ title, path }, key) => {
                return (
                  <Fragment key={key}>
                    <Link href={path} key={key}>
                      <div
                        className={cn("px-2 h-[54px] flex items-center text-dark-700 border--hover--header", {
                          [s.active]: index === path
                        })}
                      >
                        {title}
                      </div>
                    </Link>
                  </Fragment>
                )
              })}
            </div>
            <div className="flex space-x-3 justify-center items-center">
              <div>
                <Image
                  width={20}
                  height={20}
                  src="https://theme.hstatic.net/200000531407/1000893680/14/searcg-icon.svg?v=155"
                  alt="xx"
                />
              </div>
              <div>
                <Image
                  width={20}
                  height={20}
                  src="https://theme.hstatic.net/200000531407/1000893680/14/user-account.svg?v=155"
                  alt="xx"
                />
              </div>
              <div>
                <Image
                  width={20}
                  height={20}
                  src="https://theme.hstatic.net/200000531407/1000893680/14/heart.svg?v=155"
                  alt="xx"
                />
              </div>
              <div>
                <Image
                  width={20}
                  height={20}
                  src="https://theme.hstatic.net/200000531407/1000893680/14/shopping-cart.svg?v=155"
                  alt="xx"
                />
              </div>
              {/* <Profile /> */}
            </div>
          </div>
        </nav>
      )}
      {isMobile === true && (
        <nav className="px-4 top-0 text-black w-full fixed z-[102] justify-between items-center flex">
          {/* <div className="container__screen m-auto w-full justify-between items-center h-[54px]"> */}
          <div className="flex relative items-center h-14">
            <Image
              width={40}
              height={40}
              src="https://dayve.vn/wp-content/uploads/2022/04/cach-ve-hoa-dam-but-buoc-7.png"
              alt="image"
            />
          </div>
          <div
            className=""
            onClick={() => {
              setShowMenu(!showMenu)
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
              />
            </svg>
          </div>

          {/* </div> */}
        </nav>
      )}
      <div className={`menu ${!showMenu ? "open" : ""}`}>
        <ul>
          <li>Menu Item 1</li>
          <li>Menu Item 2</li>
          <li>Menu Item 3</li>
        </ul>
      </div>
    </div>
  )
}

const icLogo = (
  <svg width="90" height="34" viewBox="0 0 90 34" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M56.0326 30.2926C56.0326 30.2926 56.0816 30.3865 56.1061 30.41C56.1306 30.4804 56.1796 30.5273 56.2041 30.5977C56.2041 30.6446 56.2531 30.6681 56.2775 30.715C56.3265 30.7854 56.351 30.8323 56.4 30.9027C56.4245 30.9496 56.449 30.9731 56.4735 31.02C56.5224 31.0904 56.5714 31.1608 56.6204 31.2078C56.6204 31.2312 56.6694 31.2547 56.6939 31.3016C56.7673 31.3955 56.8408 31.4893 56.9388 31.5832C57.2571 31.9352 57.4041 32.0759 57.4531 32.0994C59.1428 33.6246 61.4694 34.2581 63.6735 33.9296C63.7469 33.9296 63.8204 33.9296 63.8694 33.9062C65.0449 33.695 66.1959 33.2022 67.1755 32.4279C68.8898 31.067 69.7714 29.1429 69.7714 27.1953C69.7714 27.1953 69.7714 27.2188 69.7714 27.2423V2.81575H63.8694V27.1953C63.8694 27.7115 63.5265 28.2043 62.9633 28.392C62.2531 28.6267 61.4694 28.2982 61.2 27.6177L58.751 21.3527L57.6 18.4196L53.2408 7.29746C53.2408 7.29746 53.1918 7.20361 53.1918 7.15668C53.1918 7.10975 53.1429 7.06282 53.1429 7.01589C53.1184 6.9455 53.0939 6.89857 53.0694 6.82818C53.0694 6.78125 53.0204 6.73432 52.9959 6.68739C52.9714 6.61699 52.9224 6.57007 52.898 6.49967C52.898 6.45274 52.849 6.40581 52.8245 6.38235C52.8 6.31196 52.751 6.26503 52.7265 6.19463C52.702 6.14771 52.6775 6.12424 52.6531 6.07731C52.6041 6.00692 52.5796 5.95999 52.5306 5.8896C52.5061 5.84267 52.4816 5.8192 52.4571 5.77227C52.4082 5.70188 52.3592 5.63149 52.3102 5.58456C52.3102 5.56109 52.2612 5.51416 52.2367 5.4907C52.1633 5.39684 52.0898 5.30298 51.9918 5.20913C51.6735 4.85716 51.5265 4.71637 51.4775 4.69291C49.7878 3.16772 47.4612 2.53418 45.2571 2.86268C45.1837 2.86268 45.1102 2.86268 45.0612 2.88615C43.8857 3.09733 42.7347 3.59008 41.7551 4.36441C40.0408 5.72534 39.1592 7.64943 39.1592 9.59698C39.1592 9.59698 39.1592 9.57352 39.1592 9.55005V34H45.0857V9.62045C45.0857 9.10423 45.4286 8.61147 45.9918 8.42376C46.702 8.18911 47.4857 8.51762 47.7551 9.19809L50.2041 15.4631L52.898 22.3147L56.0816 30.2926"
      fill="white"
      fillOpacity="0.87"
    />
    <path
      d="M17.7306 0H14.7428C13.9313 0 13.2734 0.630324 13.2734 1.40787V12.7647C13.2734 13.5422 13.9313 14.1725 14.7428 14.1725H17.7306C18.5421 14.1725 19.2 13.5422 19.2 12.7647V1.40787C19.2 0.630324 18.5421 0 17.7306 0Z"
      fill="white"
      fillOpacity="0.87"
    />
    <path
      d="M22.1388 3.96552V10.3478C24.8082 12.1311 26.5469 15.0877 26.5469 18.4431C26.5469 23.9103 21.9184 28.3216 16.2367 28.3216C10.5551 28.3216 5.92653 23.8868 5.92653 18.4431C5.92653 15.0877 7.66531 12.1311 10.3347 10.3478V3.96552C4.28571 6.24157 0 11.8496 0 18.4431C0 27.0311 7.27347 34 16.2367 34C25.2 34 32.4735 27.0311 32.4735 18.4431C32.4735 11.8496 28.1878 6.2181 22.1633 3.96552H22.1388Z"
      fill="white"
      fillOpacity="0.87"
    />
    <path
      d="M89.9999 27.4534C89.9999 28.1104 89.3142 28.6501 88.4571 28.6501H84.7836V32.1932C84.7836 33.0145 84.2203 33.6715 83.5346 33.6715H81.0367C80.351 33.6715 79.7877 33.0145 79.7877 32.1932V28.6736H76.0897C75.2326 28.6736 74.5469 28.1339 74.5469 27.4769V25.0835C74.5469 24.4265 75.2326 23.8868 76.0897 23.8868H79.7632V20.3437C79.7632 19.5224 80.3265 18.8654 81.0122 18.8654H83.5101C84.1958 18.8654 84.7591 19.5224 84.7591 20.3437V23.8633H88.4571C89.3142 23.8633 89.9999 24.403 89.9999 25.06V27.4534Z"
      fill="white"
      fillOpacity="0.87"
    />
  </svg>
)
