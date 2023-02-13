import Client from "../client/ClientTV"
const resource = "/api/v2"

const getListForHome = (cookies, params) => {
  return Client(cookies).get(`${resource}/publish/events/`, { params })
}

const userRepository = {
  getListForHome
}

export default userRepository
