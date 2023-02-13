function DeviceManager({ devices, ShowLogout, device_token, loadingDevice }) {
  return (
    <>
      <div className="text-2xl font-semibold mb-3 rounded text-dark-300 pt-8 px-12">Quản lý thiết bị</div>
      <div className="pb-8 px-12">
        <div className="mb-4">Bạn được sử dụng tối đa 3 thiết bị</div>

        <div>
          {devices.length > 0 ? (
            <>
              {devices.map((item, index) => {
                const { device_platform, device_name, updated_at, jti } = item
                return (
                  <di key={index} className="">
                    <div className="bg-dark px-4 py-2 rounded-2xl flex items-center justify-between mb-2">
                      <div className="flex">
                        <div className="mr-2">
                          {device_platform === 0 && <div>{Phone}</div>}
                          {device_platform === 1 && <div>{Chorme}</div>}
                          {device_platform === 2 && <div>{TV}</div>}
                          {device_platform !== 0 && device_platform !== 1 && device_platform !== 2 && (
                            <div>{deviceOrther}</div>
                          )}
                        </div>
                        <div>
                          <div className="font-semibold text-primary-100 text-base"> {device_name}</div>
                          {item?.device_token === device_token ? (
                            <div className="text-primary-500">Đang đăng nhập thiết bị</div>
                          ) : (
                            <div className="text-sm">Đăng nhập lần cuối {new Date(updated_at).toLocaleString()}</div>
                          )}
                        </div>
                      </div>
                      <button
                        className="hover:bg-primary-500  text-primary-100 py-2 px-6 rounded-full bg-dark hover:text-dark"
                        onClick={() => {
                          ShowLogout(item)
                          // onLogOutDevice(jti)
                        }}
                      >
                        Đăng xuất
                      </button>
                    </div>
                  </di>
                )
              })}
            </>
          ) : (
            <>
              <div className="text-center flex justify-center items-center  h-full">
                <div>
                  {/* <div>{IconDftransaction}</div> */}
                  <div className="my-8">Not Found !</div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* <>
            <div className="bg-dark px-4 py-2 rounded-2xl flex items-center justify-between mb-2  w-full min-h-[60px]">
              <div className="flex">
                <div className="mr-2 skeleton-box rounded-xl" style={{ width: "40px", height: "40px" }}></div>
                <p className="" style={{ width: "500px" }}>
                  <span className="skeleton-box bg-dark" style={{ width: "40%" }}></span>
                  <span className="skeleton-box bg-dark" style={{ width: "90%" }}></span>
                </p>
              </div>
              <button className=" text-primary-100 py-4 px-10 rounded-full bg-dark hover:text-dark skeleton-box"></button>
            </div>
            <div className="bg-dark px-4 py-2 rounded-2xl flex items-center justify-between mb-2  w-full min-h-[60px]">
              <div className="flex">
                <div className="mr-2 skeleton-box rounded-xl" style={{ width: "40px", height: "40px" }}></div>
                <p className="" style={{ width: "500px" }}>
                  <span className="skeleton-box bg-dark" style={{ width: "40%" }}></span>
                  <span className="skeleton-box bg-dark" style={{ width: "90%" }}></span>
                </p>
              </div>
              <button className=" text-primary-100 py-4 px-10 rounded-full bg-dark hover:text-dark skeleton-box"></button>
            </div>
            <div className="bg-dark px-4 py-2 rounded-2xl flex items-center justify-between mb-2  w-full min-h-[60px]">
              <div className="flex">
                <div className="mr-2 skeleton-box rounded-xl" style={{ width: "40px", height: "40px" }}></div>
                <p className="" style={{ width: "500px" }}>
                  <span className="skeleton-box bg-dark" style={{ width: "40%" }}></span>
                  <span className="skeleton-box bg-dark" style={{ width: "90%" }}></span>
                </p>
              </div>
              <button className="text-primary-100 py-4 px-10 rounded-full bg-dark hover:text-dark skeleton-box"></button>
            </div>
          </>
      */}
      </div>
    </>
  )
}
export default DeviceManager

const Phone = (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_3915_64365)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M36.058 17.7939H25.7427V8.5316C25.7427 5.92511 23.622 3.80457 21.0155 3.80457H4.72703C2.12055 3.80457 0 5.92511 0 8.5316V31.4685C0 34.075 2.12055 36.1955 4.72703 36.1955H36.058C38.2316 36.1955 40 34.4271 40 32.2535V21.7359C40 19.5622 38.2316 17.7939 36.058 17.7939ZM2.5 31.4685V8.5316C2.5 7.30363 3.49906 6.30457 4.72703 6.30457H21.0155C22.2436 6.30457 23.2427 7.30363 23.2427 8.5316V17.7939H13.6865C11.5129 17.7939 9.74453 19.5622 9.74453 21.7359V32.2535C9.74453 32.7625 9.8425 33.2486 10.0189 33.6955H4.72703C3.49906 33.6955 2.5 32.6964 2.5 31.4685ZM37.5 32.2535C37.5 33.0486 36.8532 33.6955 36.058 33.6955H13.6866H13.6865C12.8914 33.6955 12.2445 33.0486 12.2445 32.2535V21.7359C12.2445 20.9407 12.8914 20.2939 13.6865 20.2939H36.058C36.8532 20.2939 37.5 20.9407 37.5 21.7359V32.2535ZM35.8384 26.9947C35.8384 27.8577 35.1387 28.5572 34.2759 28.5572C33.4129 28.5572 32.7134 27.8577 32.7134 26.9947C32.7134 26.1318 33.413 25.4322 34.2759 25.4322C35.1388 25.4321 35.8384 26.1318 35.8384 26.9947Z"
        fill="white"
        fillOpacity="0.38"
      />
    </g>
    <defs>
      <clipPath id="clip0_3915_64365">
        <rect width="40" height="40" fill="white" />
      </clipPath>
    </defs>
  </svg>
)
const Chorme = (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M20 36.6667C10.8334 36.6667 3.33337 29.1667 3.33337 20C3.33337 10.8334 10.8334 3.33337 20 3.33337C29.1667 3.33337 36.6667 10.8334 36.6667 20C36.6667 29.1667 29.1667 36.6667 20 36.6667ZM16.1667 32.8334C14.5 29.3334 13.5 25.5 13.3334 21.6667H6.66671C7.50004 26.8334 11.1667 31.3334 16.1667 32.8334ZM16.6667 21.6667C17 25.6667 18 29.5 20 33C22 29.5 23 25.6667 23.3334 21.6667H16.6667ZM33.1667 21.6667H26.5C26.3334 25.5 25.3334 29.3334 23.6667 32.8334C28.8334 31.3334 32.5 26.8334 33.1667 21.6667ZM6.83337 18.3334H13.5C13.6667 14.5 14.6667 10.6667 16.3334 7.16671C11.1667 8.66671 7.50004 13.1667 6.83337 18.3334ZM16.6667 18.3334H23.3334C23.1667 14.3334 22 10.5 20 7.00004C18 10.5 17 14.3334 16.6667 18.3334ZM23.8334 7.16671C25.5 10.6667 26.5 14.5 26.6667 18.3334H33.3334C32.5 13.1667 28.8334 8.66671 23.8334 7.16671Z"
      fill="white"
      fillOpacity="0.38"
    />
  </svg>
)
const TV = (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M34.9922 30H5.00781C2.9375 30 1.25 28.3125 1.25 26.2422V10.0078C1.25 7.9375 2.9375 6.25 5.00781 6.25H34.9844C37.0547 6.25 38.7422 7.9375 38.7422 10.0078V26.2344C38.75 28.3125 37.0625 30 34.9922 30ZM5.00781 8.75C4.3125 8.75 3.75 9.3125 3.75 10.0078V26.2344C3.75 26.9297 4.3125 27.4922 5.00781 27.4922H34.9844C35.6797 27.4922 36.2422 26.9297 36.2422 26.2344V10.0078C36.2422 9.3125 35.6797 8.75 34.9844 8.75H5.00781Z"
      fill="white"
      fillOpacity="0.38"
    />
    <path
      d="M30 33.75H10C9.3125 33.75 8.75 33.1875 8.75 32.5C8.75 31.8125 9.3125 31.25 10 31.25H30C30.6875 31.25 31.25 31.8125 31.25 32.5C31.25 33.1875 30.6875 33.75 30 33.75Z"
      fill="white"
      fillOpacity="0.38"
    />
  </svg>
)
const deviceOrther = (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_4057_2648)">
      <path
        d="M37.0575 20.9149H31.0361V15.5556C31.0361 13.7824 29.6859 12.3189 27.9598 12.1384V9.53225C27.9598 7.90842 26.6387 6.5874 25.0149 6.5874H2.94492C1.32109 6.5874 0 7.9085 0 9.53225V22.9697C0 24.5935 1.32109 25.9145 2.94492 25.9145H8.5807L7.96336 29.1949H5.73563C5.04531 29.1949 4.48563 29.7545 4.48563 30.4449C4.48563 31.1353 5.04531 31.6949 5.73563 31.6949H14.3855C14.9805 32.7207 16.0902 33.4125 17.3591 33.4125H37.0576C38.6801 33.4125 40.0001 32.0925 40.0001 30.47V23.8573C40 22.2349 38.68 20.9149 37.0575 20.9149ZM2.5 22.9697V9.53225C2.5 9.29115 2.70375 9.0874 2.94492 9.0874H25.0148C25.2559 9.0874 25.4597 9.29115 25.4597 9.53225V12.1195H17.359C15.4643 12.1195 13.9229 13.6609 13.9229 15.5556V23.4145H2.94492C2.70375 23.4145 2.5 23.2108 2.5 22.9697ZM11.1246 25.9145H13.9229V29.1949H10.5073L11.1246 25.9145ZM16.4229 29.9765V15.5556C16.4229 15.0394 16.8428 14.6195 17.359 14.6195H27.6C28.1162 14.6195 28.5361 15.0394 28.5361 15.5556V20.9149H22.992C21.3695 20.9149 20.0495 22.2349 20.0495 23.8574V30.4701C20.0495 30.6204 20.061 30.7682 20.0829 30.9126H17.3591C16.8428 30.9126 16.4229 30.4926 16.4229 29.9765ZM37.5 30.4701C37.5 30.7099 37.2973 30.9126 37.0575 30.9126H22.992C22.7522 30.9126 22.5495 30.7099 22.5495 30.4701V23.8574C22.5495 23.6176 22.7522 23.4149 22.992 23.4149H37.0575C37.2973 23.4149 37.5 23.6176 37.5 23.8574V30.4701ZM37.0864 27.1637C37.0864 27.7985 36.5718 28.3131 35.937 28.3131C35.3023 28.3131 34.7877 27.7985 34.7877 27.1637C34.7877 26.529 35.3023 26.0144 35.937 26.0144C36.5718 26.0144 37.0864 26.529 37.0864 27.1637Z"
        fill="white"
        fillOpacity="0.38"
      />
    </g>
    <defs>
      <clipPath id="clip0_4057_2648">
        <rect width="40" height="40" fill="white" />
      </clipPath>
    </defs>
  </svg>
)
