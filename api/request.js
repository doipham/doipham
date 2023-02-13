/* eslint-disable no-undef */
import axios from "axios"
import createAuthRefreshInterceptor from "axios-auth-refresh"
import { getAccessToken, setAccessToken, getRefreshToken, setRefreshToken, removeToken } from "lib/Cookies"

const http = require("http")
const https = require("https")

const getUA = () => {
  if (typeof window === "undefined") return "unknown"
  let device = "Unknown"
  const ua = {
    "Generic Linux": /Linux/i,
    Android: /Android/i,
    BlackBerry: /BlackBerry/i,
    Bluebird: /EF500/i,
    "Chrome OS": /CrOS/i,
    Datalogic: /DL-AXIS/i,
    Honeywell: /CT50/i,
    iPad: /iPad/i,
    iPhone: /iPhone/i,
    iPod: /iPod/i,
    macOS: /Macintosh/i,
    Windows: /IEMobile|Windows/i,
    Zebra: /TC70|TC55/i
  }

  Object.keys(ua).map((v) => navigator?.userAgent.match(ua[v]) && (device = v))
  return device
}

function getBrower() {
  if (typeof window === "undefined") return "unknown"
  if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf("OPR")) != -1) {
    return "Opera"
  } else if (navigator.userAgent.indexOf("Edg") != -1) {
    return "Edge"
  } else if (navigator.userAgent.indexOf("Chrome") != -1) {
    return "Chrome"
  } else if (navigator.userAgent.indexOf("Safari") != -1) {
    return "Safari"
  } else if (navigator.userAgent.indexOf("Firefox") != -1) {
    return "Firefox"
  } else if (navigator.userAgent.indexOf("MSIE") != -1 || !!document.documentMode == true) {
    //IF IE > 10
    return "IE"
  } else {
    return "unknown"
  }
}

const refreshAuthLogic = (failedRequest) => {
  if (failedRequest.response.data.msg === "Missing Authorization Header") {
    return
  }
  return axios
    .post(
      `${process.env.NEXT_PUBLIC_DOMAIN_AUTH}/api/token/refresh`,
      {},
      {
        headers: {
          Authorization: "Bearer " + getRefreshToken()
        }
      }
    )
    .then((tokenRefreshResponse) => {
      const { data, success } = tokenRefreshResponse.data
      if (success) {
        setAccessToken(data.access_token)
        setRefreshToken(data.refresh_token)
        failedRequest.response.config.headers["Authorization"] = "Bearer " + data.access_token
        return Promise.resolve()
      } else {
        removeToken()
        return Promise.reject()
      }
    })
    .catch((e) => {
      console.log(e)
      removeToken()
    })
}

export default function getInstanceAxios(baseAPI, notToken) {
  const instance = axios.create({
    baseURL: baseAPI,
    httpAgent: new http.Agent({ keepAlive: true }),
    httpsAgent: new https.Agent({ keepAlive: true })
  })

  instance.interceptors.request.use(
    function (config) {
      config.headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        DevicePlatform: 1,
        DeviceName: getUA() + " " + getBrower()
      }
      if (!notToken && getAccessToken()) {
        config.headers["Authorization"] = `Bearer ${getAccessToken()}`
      }
      config.headers["x-api-key"] = "162C7D559DE4DD383DFD9867A456D8AA"
      return config
    },
    function (error) {
      return Promise.reject(error)
    }
  )

  instance.interceptors.response.use(
    function (response) {
      try {
        if (response.status >= 200 && response.status < 300) return response.data
        return Promise.reject(response.data)
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async function (error) {
      if (error.response) {
        const { response } = error
        const data = response.data
        if (data.message && response.config.method !== "get") {
          if (data.details && data.details.length > 0) {
            // notification.error({
            //   message: data.details[0].msg
            // })
          } else {
            // notification.error({
            //   message: data.message
            // })
          }
        }
      }
      return Promise.reject(error)
    }
  )
  createAuthRefreshInterceptor(instance, refreshAuthLogic)
  return instance
}
