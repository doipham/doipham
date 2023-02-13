import InputPassword from "components/ui/InputPassword"
import { apiUser } from "api"
import { useState, useEffect, useRef } from "react"
import OtpInput from "react-otp-input"
import cn from "classnames"
import { notification } from "components/ui"
import { setAccessToken, setRefreshToken } from "lib/Cookies"
import InputPhone from "components/ui/InputPhone"
import useStore from "components/ui/Context"

export default function Register({ isResetPassword, setView, onLogin }) {
  const { setUser } = useStore()
  const [step, setStep] = useState(1)
  const [reCount, setReCount] = useState(1)
  const [otp, setOtp] = useState("")
  const [loading, setLoading] = useState(false)
  const [phone, setPhone] = useState()
  const __user = useRef({})
  const __input1 = useRef()

  function onChangePhone(value) {
    if (value.length === 1 && value[0] !== "0") {
      notification.error({
        message: "Điện thoại phải là số"
      })
      return
    }
    setPhone(value)
  }

  async function sendOtp() {
    try {
      if (!phone?.length) {
        notification.error({
          message: "Số điện thoại không được để trống"
        })
        return
      }
      // if (!isResetPassword) {
      //   const { data } = await apiUser.checkPhoneExist({ phone })
      //   if (data?.verified) {
      //     notification.error({
      //       message: "Số điện thoại đã đăng ký!"
      //     })
      //     return
      //   }
      // }
      setLoading(true)
      await apiUser.checkPhoneExist({ phone })
      const { success } = await apiUser.sendOtp({ phone })
      if (success) {
        setReCount((c) => c + 1)
        setStep(2)
      }
    } catch (error) {
      let _message = "Hệ thống bị gián đoạn xin vui lòng thử lại sau"
      const data = error?.response?.data
      if (data) {
        _message = data.error_message[0]
      }
      notification.error({
        message: _message
      })
    } finally {
      setLoading(false)
    }
  }

  async function verifyOtp() {
    try {
      if (otp?.length < 6) {
        notification.error({ message: "OTP không hợp lệ" })
        return
      }
      setLoading(true)
      const { data, success } = await apiUser.updatePhone({ phone, otp_code: otp })
      if (success) {
        onLogin(data)
      }
    } catch (error) {
      notification.error({
        message: "Mã OTP sai hoặc đã hết hạn"
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (step === 1) __input1.current.focus()
    if (otp) setOtp("")
  }, [step])

  return (
    <div>
      {step > 1 && (
        <button onClick={() => setStep(1)} className="absolute left-2 top-2 text-dark-100">
          {icBack}
        </button>
      )}
      <h1 className="text-3xl text-center font-bold text-dark-100 mb-4 mt-4">
        {step === 1 && <span>{"XÁC THỰC SĐT"}</span>}
        {step === 2 && "XÁC THỰC"}
      </h1>
      {step === 1 && (
        <div>
          <div className="text-dark-500 mb-8 text-center">
            Vui lòng nhập số điện thoại liên kết với tài khoản của bạn
          </div>
          <InputPhone
            onChange={(value) => onChangePhone(value?.trim())}
            ref={__input1}
            placeholder={"Nhập số điện thoại của bạn"}
            name="phone"
            value={phone}
          />
          <div>
            <button
              disabled={loading}
              onClick={sendOtp}
              className={cn(
                "m-auto rounded py-2 px-4 text-lg flex items-center mb-4 space-x-4 hover:bg-primary-hover font-medium mt-8",
                phone?.length > 8 ? "bg-primary-500 text-dark" : "bg-primary-500 text-dark"
              )}
            >
              <span>TIẾP TỤC</span>
              <span>{ic}</span>
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <div className="mb-4 text-center text-dark-300">Nhập mã OTP được gửi tới SĐT của bạn</div>
          <div className="flex justify-center mb-6 text-dark-300">
            <OtpInput
              value={otp}
              onChange={(e) => setOtp(e)}
              numInputs={6}
              shouldAutoFocus={true}
              isInputNum={true}
              separator={<span> &nbsp;</span>}
              inputStyle={"input_otp"}
            />
          </div>
          <div>
            <Coundown expired={60} sendOtp={sendOtp} reCount={reCount} setOtp={setOtp} otp={otp} />
          </div>
          <div>
            <button
              disabled={loading}
              onClick={verifyOtp}
              className={cn(
                "m-auto rounded py-2 px-4 text-lg flex items-center mb-4 space-x-4 hover:bg-primary-hover font-medium",
                otp?.length === 6 ? "bg-primary-500 text-dark" : "bg-blue-500 text-dark"
              )}
            >
              <span>XÁC THỰC</span>
              {ic}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function Coundown({ sendOtp, expired, reCount, setOtp }) {
  const [counter, setCounter] = useState(expired)
  const __time = useRef()

  function reSend() {
    setOtp("")
    sendOtp()
  }

  useEffect(() => {
    if (expired > 0) {
      setCounter(expired)
      __time.current = setInterval(() => {
        setCounter((c) => c - 1)
      }, 1000)
    }
    return () => {
      clearInterval(__time.current)
    }
  }, [reCount])

  useEffect(() => {
    if (counter === 0) {
      clearInterval(__time.current)
      __time.current = null
    }
  }, [counter])

  return (
    <div className="flex justify-center mb-4 text-dark-300">
      {counter > 0 ? (
        <div className="text-center h3">Vui lòng chờ {counter} để gửi lại</div>
      ) : (
        <div className="text-sm flex">
          Bạn không nhận được mã? &nbsp;
          <div onClick={reSend} onKeyUp={reSend} role="button" tabIndex="0">
            <span className="text-blue-500 cursor-pointer">Gửi lại</span>
          </div>
        </div>
      )}
    </div>
  )
}
const ic = (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
)

const icBack = (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
)
