import { Loading } from "components/ui"
import { IconDftransaction } from "components/ui/Icons"
import Link from "next/link"

function TransactionHistory({ rows, onFilter, value, loadingTransaction, checked }) {
  return (
    <>
      {loadingTransaction && <Loading />}
      <div className="flex justify-between pt-8">
        <div className="text-2xl font-semibold mb-3 rounded text-dark-300  px-12">Lịch sử mua gói</div>
        {checked && (
          <div className="px-12 text-sm text-dark-100">
            <span
              className="p-1.5 mr-2 bg-opaque-100 rounded cursor-pointer"
              onClick={() => {
                onFilter("all")
              }}
              style={
                value === 0
                  ? { color: "#000E2B", background: "#52B5F9" }
                  : { color: "rgba(255, 255, 255, 0.87)", background: "rgba(255, 255, 255, 0.16)" }
              }
            >
              Tất cả
            </span>
            <span
              className="p-1.5 mr-2 bg-opaque-100 rounded cursor-pointer"
              onClick={() => {
                onFilter("đăng ký")
              }}
              style={
                value === 1
                  ? { color: "#000E2B", background: "#52B5F9" }
                  : { color: "rgba(255, 255, 255, 0.87)", background: "rgba(255, 255, 255, 0.16)" }
              }
            >
              Đăng ký
            </span>
            <span
              className="p-1.5 mr-2 bg-opaque-100 rounded cursor-pointer"
              onClick={() => {
                onFilter("gia hạn")
              }}
              style={
                value === 3
                  ? { color: "#000E2B", background: "#52B5F9" }
                  : { color: "rgba(255, 255, 255, 0.87)", background: "rgba(255, 255, 255, 0.16)" }
              }
            >
              Gia hạn
            </span>
            <span
              className="p-1.5 mr-2 bg-opaque-100 rounded cursor-pointer"
              onClick={() => {
                onFilter("hủy gói")
              }}
              style={
                value === 2
                  ? { color: "#000E2B", background: "#52B5F9" }
                  : { color: "rgba(255, 255, 255, 0.87)", background: "rgba(255, 255, 255, 0.16)" }
              }
            >
              Hủy gói
            </span>
          </div>
        )}
      </div>
      <div className="text-sm  mb-4 pb-8  overflow-auto max-h-[740px] scroll__video ">
        {checked ? (
          <table className="w-full">
            <tr className="font-semibold flex items-center bg-dark px-12 text-dark-100 py-3">
              <th style={{ width: "30px" }} className="mr-4 text-left">
                STT
              </th>
              <th style={{ width: "200px" }} className="mr-4 text-left">
                Tên gói
              </th>
              <th style={{ width: "140px" }} className="mr-4 text-left">
                Mã giao dịch
              </th>
              <th style={{ width: "150px" }} className="mr-4 text-left">
                Thời gian giao dịch
              </th>
              {/* <th style={{ width: "135px" }} className="mr-3 text-left">
                Thời gian hết hạn
              </th> */}
              <th style={{ width: "100px" }} className=" mr-4 text-left">
                Thanh toán
              </th>
              <th style={{ width: "120px" }} className=" text-left">
                Trạng thái gói
              </th>
            </tr>
            {rows.map((item, k) => {
              const {
                created_at,
                expired_date,
                original_price,
                package_name,
                unlimited_time,
                product_name,
                transaction_type,
                code
              } = item

              return (
                <tr key={k} className="flex items-center px-12 hover:bg-dark-900 py-2 ">
                  <td style={{ width: "30px" }} className="mr-4">
                    {k + 1}
                  </td>
                  <td style={{ width: "200px" }} className="mr-4 font-medium">
                    {product_name} - {package_name}
                  </td>
                  <td style={{ width: "140px" }} className="mr-4 truncate">
                    {code}
                  </td>
                  <td style={{ width: "150px" }} className="mr-4">
                    {/* {new Date(created_at)?.toLocaleString()} */}
                    {FormatDate(created_at)}
                  </td>
                  {/* <td style={{ width: "135px" }} className="mr-3">
                    {unlimited_time === true ? <>Không thời hạn</> : <>{FormatDate(expired_date)}</>}
                  </td> */}
                  <td style={{ width: "100px" }} className="mr-4">
                    {original_price?.toLocaleString()} VNĐ
                  </td>
                  <td style={{ width: "120px" }} className="">
                    {transaction_type === 1 && <div className="text-green">Đăng ký</div>}
                    {transaction_type === 2 && <div className="text-red-500">Hủy gói</div>}
                    {transaction_type === 3 && <div className="text-[#FFAD00]">Gia hạn</div>}
                  </td>
                </tr>
              )
            })}
          </table>
        ) : (
          <div className="text-center flex justify-center items-centers h-full">
            <div>
              <div>{IconDftransaction}</div>
              <div className="my-8">Hiện chưa có giao dịch phát sinh.</div>
              <Link href="/subscription">
                <button className="bg-primary-500 rounded-full py-2 px-8 text-[#05173A] w-64 font-semibold">
                  Mua gói
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
export default TransactionHistory

function FormatDate(date) {
  let valuedate
  let __date = new Date(date)
  let hour
  let day
  let minute
  let month
  if (__date.getHours() >= 10) {
    hour = __date.getHours()
  } else {
    hour = "0" + __date.getHours()
  }

  if (__date.getMinutes() >= 10) {
    minute = __date.getMinutes()
  } else {
    minute = "0" + __date.getMinutes()
  }

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
  valuedate = hour + ":" + minute + " - " + day + "/" + month + "/" + __date.getFullYear()
  return valuedate
}
