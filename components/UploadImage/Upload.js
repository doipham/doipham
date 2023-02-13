import { useState } from "react"
import axios from "axios"
import { getAccessToken, getRefreshToken } from "lib/Cookies"
import { notification } from "components/ui"
import LoadingImage from "./LoadingImage"
function Upload({ avatar, fetchMe, id }) {
  const [image, setImage] = useState(avatar)
  const [loading, setLoading] = useState(false)
  async function changeUpload(e) {
    const formData = new FormData()
    formData.append("avatar", e.target.files[0])

    setLoading(true)
    try {
      const { data } = await axios({
        method: "post",
        url: process.env.NEXT_PUBLIC_DOMAIN_AUTH + `/api/users/${id}/avatar`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getAccessToken()}`
        }
      })
      setImage(data?.data?.avatar)
      fetchMe()
      getRefreshToken()
    } catch (err) {
      notification.error({ message: "File không đúng định dạng" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div>
        <label htmlFor="file-input">
          <LoadingImage loading={loading} src={image} avatar={avatar}></LoadingImage>
        </label>
        <input
          id="file-input"
          type="file"
          name="avatar"
          accept="image/*"
          style={{ display: "none" }}
          onChange={(e) => {
            changeUpload(e)
          }}
        />
      </div>
    </div>
  )
}
export default Upload
