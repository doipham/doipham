import Link from "next/link"
import { useRouter } from "next/router"
import useStore from "components/ui/Context"
import { getAccessToken } from "lib/Cookies"
import { useEffect, useRef, useState } from "react"
import { Modal } from "components/ui"
import DisplayTypeScreenBlock from "utils/DisplayTypeScreenBlock"
import CardHorizontal from "components/TypeCard/CardHorizontal"
import CardVertical from "components/TypeCard/CardVertical"

export default function App(props) {
  let display_type = props.display_type
  const router = useRouter()
  const { togleModalLogin, userInfo, signKey } = useStore()
  const { id, type, is_protected } = props
  const isMonter = useRef(false)
  const [isModal, setIsModal] = useState(false)

  function onClick(e) {
    if (is_protected && !getAccessToken()) {
      isMonter.current = true
      setIsModal(true)
      // togleModalLogin()
      e.preventDefault()
      return false
    }
  }

  function onClose() {
    setIsModal(false)
  }

  function onNext() {
    togleModalLogin()
    setIsModal(false)
  }

  useEffect(() => {
    if (isMonter.current && userInfo?.fullname) {
      router.push(`/video?id=${id}&type=${type}`)
    }
  }, [userInfo])

  useEffect(() => {
    if (isMonter.current && signKey) {
      router.push(`/video?id=${id}&type=${type}`)
    }
  }, [signKey])

  return (
    <>
      <Link href={`/video?id=${id}&type=${type}`}>
        <div onClick={onClick} role="button" tabIndex="0" onKeyPress={() => {}}>
          {display_type === DisplayTypeScreenBlock.HORIZONTAL ? (
            <CardHorizontal {...props} />
          ) : (
            <CardVertical {...props} />
          )}
        </div>
      </Link>
      <Modal
        isOpen={isModal}
        onCancel={() => {
          setIsModal(false)
        }}
        showIcon={false}
      >
        <div className="p-6 text-center bg-dark-700 max-w-md">
          <div className="text-dark-100 font-semibold mb-6 text-2xl">Thông báo</div>
          <div>
            <div className="mb-2 text-base">Bạn cần đăng nhập để sử dụng tính năng này</div>
            <hr className="mt-6" style={{ borderTop: "solid 0.5px", opacity: "0.3" }} />
            <div className="mt-2">
              <button className="p-2 mr-8" onClick={onClose}>
                Hủy
              </button>
              <button className="p-2 " onClick={onNext}>
                <span className="text-primary-500 font-bold">Đăng nhập</span>
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}
