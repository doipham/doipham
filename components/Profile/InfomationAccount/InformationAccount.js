import Image from "next/legacy/image"
import { DfAvatarLogin } from "components/ui/Icons"
import { useState } from "react"
function InformationAccount({
  user,
  setModalEditProfile,
  onLogOut,
  listSub
  //  ticket
}) {
  const { fullname, email, avatar, phone, dob, gender } = user
  const [defaultAvatar, setDefaultAvatar] = useState(avatar)

  return (
    <>
      <div className="flex justify-between pt-8 px-12 mb-3 ">
        <div className="text-2xl font-semibold rounded text-dark-300">Thông tin tài khoản</div>
        <div
          className="flex items-center text-primary-500 text-sm"
          role="button"
          tabIndex="0"
          onClick={() => {
            setModalEditProfile(true)
          }}
          onKeyPress={() => {}}
        >
          <div>{pencil}</div> &nbsp;
          <div>Chỉnh sửa tài khoản</div>
        </div>
      </div>
      <div className="px-36 py-4 flex">
        <div className="mr-6">
          {avatar ? (
            <Image
              alt={avatar}
              width={80}
              height={80}
              className="rounded-full"
              src={avatar || defaultAvatar}
              onError={() => setDefaultAvatar("https://stvinaprod.vtvcab.vn/98617bf4-240e-4b4f-a884-a7912c7d1c52.png")}
            />
          ) : (
            DfAvatarLogin
          )}
        </div>
        <div className="w-full leading-6 text-base">
          <div className="flex justify-between mb-4">
            <div className="text-white ">{fullname}</div>
            <div></div>
          </div>
          <div className="flex justify-between mb-4">
            <div>Số điện thoại:</div>
            <div className="text-dark-100">{phone}</div>
          </div>
          <div className="flex justify-between mb-4">
            <div>Email:</div>
            <div>{email}</div>
          </div>
          <div className="flex justify-between mb-4">
            <div>Ngày sinh:</div>
            <div>{ConvertDate(dob)}</div>
          </div>
          <div className="flex justify-between mb-4">
            <div>Giới tính:</div>
            <div>{gender === "male" ? <>Nam</> : <>{gender === "female" ? <>Nữ</> : <>Khác</>}</>}</div>
          </div>
          {listSub?.length > 0 ? (
            <>
              <div>Gói cước hiện tại :</div>
              {listSub?.map((item, index) => {
                return (
                  <>
                    <div key={index} className="flex justify-between mb-4 mt-2 text-dark-100 ">
                      <div className="font-semibold">
                        {item?.name} - {item?.package?.name}
                      </div>
                      {item?.unlimited_time === true ? (
                        <>Không thời hạn</>
                      ) : (
                        <div> Hết hạn {FormatDate(item?.expired_date)}</div>
                      )}
                    </div>
                  </>
                )
              })}
            </>
          ) : (
            <>
              <div className="flex justify-between mb-4">
                <div>Gói cước hiện tại :</div>
                <div className="text-dark-100">
                  <>Không có gói cước </>
                </div>
              </div>
              {/* {ticket ? (
                <>
                  <div className="mb-4">
                    <div>Gói cước hiện tại :</div>
                    <div className="flex justify-between mb-4 mt-2 text-dark-100 ">
                      <div className="font-semibold">Tài khoản VIP</div>
                      <div> Hết hạn {FormatDate(ticket?.expired_time)}</div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {" "}
                  <div className="flex justify-between mb-4">
                    <div>Gói cước hiện tại :</div>
                    <div className="text-dark-100">
                      <>Không có gói cước </>
                    </div>
                  </div>
                </>
              )} */}
            </>
          )}
          <button
            className="font-bold text-white mb-4 bg-opaque-100 w-full p-2 rounded-full"
            onClick={() => {
              onLogOut()
            }}
          >
            Đăng xuất
          </button>
        </div>
      </div>
    </>
  )
}
export default InformationAccount

const iconLogout = (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
    />
  </svg>
)

const pencil = (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M17.2583 5.86667C17.5833 5.54167 17.5833 5.00001 17.2583 4.69167L15.3083 2.74167C15 2.41667 14.4583 2.41667 14.1333 2.74167L12.6 4.26667L15.725 7.39167L17.2583 5.86667ZM2.5 14.375V17.5H5.625L14.8417 8.27501L11.7167 5.15001L2.5 14.375Z"
      fill="#52B5F9"
    />
  </svg>
)

function FormatDate(date) {
  let valuedate
  let __date = new Date(date)
  let day
  let month

  if (__date.getDate() >= 10) {
    day = __date.getDate()
  } else {
    day = "0" + __date.getDate()
  }
  if (__date.getMonth() >= 9) {
    month = __date.getMonth() + 1
  } else if (__date.getMonth() === 0) {
    month = "0" + 1
  } else {
    month = "0" + (__date.getMonth() + 1)
  }
  valuedate = day + "/" + month + "/" + __date.getFullYear()
  return valuedate
}

function ConvertDate(value) {
  console.log({ value })
  const date = value
  let result = ""
  if (date) {
    const [year, month, day] = date?.split("-")
    result = [day, month, year]?.join("-")
  }
  return result
}
