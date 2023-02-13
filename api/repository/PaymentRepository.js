import Client from "../client/PayMent"
const resource = "/api"

const getMySub = () => {
  return Client.get(`${resource}/v2/my_subscription`)
}

const userRepository = {
  getMySub
}
export default userRepository
