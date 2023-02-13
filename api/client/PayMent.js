import getInstanceAxios from "../request"
const baseDomain = process.env.NEXT_PUBLIC_PAYMENT
const baseURL = `${baseDomain}/`

export default getInstanceAxios(baseURL, false)
