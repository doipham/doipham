import React, { useEffect, useState } from "react"
import { createPortal } from "react-dom"

export function Modal({ children, isOpen = false, onCancel, showIcon = true }) {
  const [isClient, setClient] = useState(false)
  const handleEscape = (event) => {
    if (event.keyCode === 27) onCancel()
  }
  useEffect(() => {
    setClient(true)
  }, [])

  useEffect(() => {
    if (isOpen) {
      if (document.body.style.overflow !== "hidden") {
        document.body.style.overflow = "hidden"
        document.body.style.width = "calc(100% - 8px)"
      }
      document.addEventListener("keydown", handleEscape, false)
    }
    return () => {
      document.removeEventListener("keydown", handleEscape, false)
      document.body.style.overflow = null
      document.body.style.width = null
    }
  }, [handleEscape, isOpen])

  const modalContent = isOpen ? (
    <div className="modal modal-fade">
      <button className="modal-overlay" onClick={onCancel} />
      <div className="modal-body bg-dark-700">
        {showIcon && (
          <button className="absolute z-10 top-4 right-4" onClick={onCancel}>
            {icClose}
          </button>
        )}

        {children}
      </div>
    </div>
  ) : null

  if (isClient) {
    return createPortal(modalContent, document.getElementById("modal-root"))
  } else {
    return null
  }
}

export default Modal

const icClose = (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" stroke="#E6E6E6">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
  </svg>
)
