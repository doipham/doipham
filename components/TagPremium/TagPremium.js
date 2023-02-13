import TypeTag from "utils/TypeTag"
function handerBg(value) {
  if (value === TypeTag.NOT_SUBS) {
    return ""
  }
  if (value === TypeTag.BASIC) {
    return "gradient--tag--basic"
  }
  if (value === TypeTag.PREMIUM) {
    return "gradient--tag--premium"
  }
  if (value === TypeTag.PREMIUM_PLUS) {
    return "gradient--tag--premiumplus"
  }
}
function Tag({ package_type, border }) {
  return (
    <>
      {border ? (
        <div className="absolute w-[60px] h-[16px] top-[3px] left-[3px]">
          <div
            className={`flex items-center h-full w-full rounded-tl-lg rounded-br-lg justify-center ${handerBg(
              package_type
            )}`}
          >
            <div className="text-[8px] leading-[10px] font-semibold ">
              {package_type === TypeTag.NOT_SUBS && <></>}
              {package_type === TypeTag.BASIC && <span>Basic</span>}
              {package_type === TypeTag.PREMIUM && <span>Premium</span>}
              {package_type === TypeTag.PREMIUM_PLUS && <span>Premium+</span>}
            </div>
          </div>
        </div>
      ) : (
        <div className="absolute top-0 left-0 w-[60px] h-[16px]">
          <div
            className={`flex items-center h-full w-full rounded-tl-lg rounded-br-lg justify-center ${handerBg(
              package_type
            )}`}
          >
            <div className="text-[8px] leading-[10px] font-semibold ">
              {package_type === TypeTag.NOT_SUBS && <></>}
              {package_type === TypeTag.BASIC && <span>Basic</span>}
              {package_type === TypeTag.PREMIUM && <span>Premium</span>}
              {package_type === TypeTag.PREMIUM_PLUS && <span>Premium+</span>}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
export default Tag
