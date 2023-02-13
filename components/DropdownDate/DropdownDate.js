import ClickOutside from "lib/click-outside"
import cn from "classnames"
import { useState } from "react"
import s from "./Dropdown.module.css"
import { useEffect } from "react"
import { addDays } from "utils/time"

const days = [
  {
    label: addDays(-1).day,
    value: addDays(-1).date
  },
  {
    label: addDays(0).day,
    value: addDays(0).date
  },
  {
    label: addDays(1).day,
    value: addDays(1).date
  }
]

function getTitleDropdown(days, day) {
  const item = days?.find((i) => i.value === day)
  if (day === addDays(0).date) return "Hôm nay"
  return item?.label
}

export default function Dropdown({ onChange, day }) {
  const [show, setShow] = useState(false)

  function onClose() {
    setShow(false)
  }

  function onShow() {
    setShow((c) => !c)
  }

  function onChangeValue(v) {
    onChange(v)
    setShow(false)
  }

  useEffect(() => {}, [])

  const __class = show ? s.show : s.hide
  // console.log({ days })
  return (
    <div className="relative w-40">
      <ClickOutside onClick={onClose}>
        <div className="">
          <div
            className="flex justify-between border border-gray-500 rounded py-1 px-4 w-full text-sm"
            role="button"
            tabIndex="0"
            onKeyPress={onShow}
            onClick={onShow}
          >
            {getTitleDropdown(days, day)}
            <div>{downIc}</div>
          </div>
          {show && (
            <ul className={cn(s.ul, __class)}>
              {days?.map((item) => {
                const { value, label } = item
                return (
                  <div
                    // className={s.li}
                    className={cn(s.li, "text-sm", {
                      [s.active]: day === value
                    })}
                    key={value}
                    role="button"
                    onKeyDown={() => onChangeValue(value)}
                    tabIndex="0"
                    onClick={() => onChangeValue(value)}
                  >
                    <li className={s.li_item}>{label}</li>
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
