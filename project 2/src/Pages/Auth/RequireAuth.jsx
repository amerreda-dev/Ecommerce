import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import Cookie from 'cookie-universal'
import { useEffect, useState } from 'react'

import { USER } from '../../Api/api'
import Loading from '../../Components/Loading/loading'
import { Axios } from '../../Api/axios'
import Err403 from './403'
export default function RequireAuth({ allowedRole }) {
  //User
  const [User, setUser] = useState('')

  const navigate = useNavigate()

  // GET CURRENT LOGGED IN USER
  useEffect(() => {
    Axios.get(`/${USER}`)
      .then(data => setUser(data.data))
      .catch(() => navigate('/login', { replace: true }))
  }, [])
  //Token & cookie
  const cookie = Cookie()
  const token = cookie.get('e-commerce')

  return token ? (
    User === '' ? (
      <Loading />
    ) : allowedRole.includes(User.role) ? (
      <Outlet />
    ) : (
      <Err403 role={User.role} />
    )
  ) : (
    <Navigate to={'/login'} replace />
  )
}
