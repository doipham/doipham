import ClickOutside from "lib/click-outside"
import cn from "classnames"

import { useState } from "react"
import s from "./Dropdown.module.css"
import { useEffect } from "react"

export default function Dropdown({ onChange, menus }) {
  const [show, setShow] = useState(false)
  const [activeBtn, setActiveBtn] = useState(1)
  const [text, setText] = useState("Chọn nội dung")
  const [logoImage, setLogoImage] = useState()

  function onClose() {
    setShow(false)
  }

  function onShow() {
    setShow((c) => !c)
  }

  function onChangeLeague(v) {
    onChange(v.id)
    setText(v.name)
    setLogoImage(v.logo)
    setActiveBtn(v.id)
    setShow(false)
  }
  useEffect(() => {
    setActiveBtn(menus[0]?.id)
    setText(menus[0]?.name)
    setLogoImage(menus[0]?.logo)
  }, [])

  const __class = show ? s.show : s.hide
  return (
    <div className={s.dr}>
      <ClickOutside onClick={onClose}>
        <div>
          <div className={s.text} role="button" tabIndex="0" onKeyPress={onShow} onClick={onShow}>
            <span className="pl-3 py-1">
              <img src={logoImage} alt="" width="32" height="32"></img>
            </span>
            <span className="font-bold text-sm text-primary-100 pl-4 w-[174px]">{text}</span>
            <button className={cn("flex right-0 items-center h-full pl-24")}>{downIc}</button>
          </div>
          {show && (
            <ul className={cn(s.ul, __class)}>
              {menus?.map((item) => {
                const { name, id, logo } = item
                return (
                  <div
                    // className={s.li}
                    className={cn(s.li, {
                      [s.active]: activeBtn === id
                    })}
                    key={id}
                    role="button"
                    onKeyDown={() => onChangeLeague(item)}
                    tabIndex="0"
                    onClick={() => onChangeLeague(item)}
                  >
                    <li className={s.li_item}>
                      <span className="pl-3 py-1">
                        <img src={logo} alt="" width="32" height="32"></img>
                      </span>
                      <span className={s.text_dropdown}>{name}</span>
                    </li>
                  </div>
                )
              })}
            </ul>
          )}
        </div>
      </ClickOutside>
    </div>
  )
}
const downIc = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.41 8.58002L12 13.17L16.59 8.58002L18 10L12 16L6 10L7.41 8.58002Z" fill="white" fillOpacity="0.87" />
  </svg>
)
