import axios from 'axios'
import { useEffect } from 'react'
import { GOOGLE_CALL_BACK, baseUrl } from '../../Api/api'
import { useLocation } from 'react-router-dom'
import Cookie from 'cookie-universal'
export default function GoogleCallback() {
  const cookie = Cookie()
  const location = useLocation()
  useEffect(() => {
    async function GoogleCall() {
      try {
        const res = await axios.get(
          `${baseUrl}/${GOOGLE_CALL_BACK}${location.search}`
        )
        console.log(res)
        const token = res.data.access_token
        cookie.set('e-commerce', token)
      } catch (err) {
        console.log(err)
      }
    }
    GoogleCall()
  }, [])

  return <h1>test</h1>
}
