import './bars.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCartShopping,
  faPlus,
  faUsers,
} from '@fortawesome/free-solid-svg-icons'
import { NavLink, useNavigate } from 'react-router-dom'
import { Menu } from '../../Context/MenuContext'
import { useContext, useEffect, useState } from 'react'
import { WindowSize } from '../../Context/WindowContext'
import { Axios } from '../../Api/axios'
import { USER } from '../../Api/api'
export default function SideBar() {
  const menu = useContext(Menu)
  const windowContext = useContext(WindowSize)
  const Size = windowContext.windowSize
  const isOpen = menu.isOpen

  // GET CURRENT LOGGED IN USER
  const [User, setUser] = useState('')
  const navigate = useNavigate()
  useEffect(() => {
    Axios.get(`/${USER}`)
      .then(data => setUser(data.data))
      .catch(() => navigate('/login', { replace: true }))
  }, [])

  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: '70px',
          left: 0,
          width: '100%',
          height: '100vh',
          backgroundColor: 'rgba(0,0,0,0.2)',
          display: Size < '768' && isOpen ? 'block' : 'none',
        }}></div>
      <div
        className="side-bar pt-3"
        style={{
          left: Size < '768' ? (isOpen ? 0 : '-100%') : 0,
          width: isOpen ? '240px' : 'fit-content',
          position: Size < '768' ? 'fixed' : 'sticky',
        }}>
        {User.role === '1995' ? (
          <>
            <NavLink
              to={'users'}
              className="d-flex align-items-center gap-2 side-bar-link">
              <FontAwesomeIcon
                style={{ padding: isOpen ? '10px 8px 10px 15px' : '10px 13px' }}
                icon={faUsers}
              />
              <p className="m-0" style={{ display: isOpen ? 'block' : 'none' }}>
                {' '}
                Users{' '}
              </p>
            </NavLink>
            <NavLink
              to={'/dashboard/user/add'}
              className="d-flex align-items-center gap-2 side-bar-link">
              <FontAwesomeIcon
                style={{ padding: isOpen ? '10px 8px 10px 15px' : '10px 13px' }}
                icon={faPlus}
              />
              <p className="m-0" style={{ display: isOpen ? 'block' : 'none' }}>
                Add User
              </p>
            </NavLink>
            <NavLink
              to={'/dashboard/writer'}
              className="d-flex align-items-center gap-2 side-bar-link">
              <FontAwesomeIcon
                style={{ padding: isOpen ? '10px 8px 10px 15px' : '10px 13px' }}
                icon={faPlus}
              />
              <p className="m-0" style={{ display: isOpen ? 'block' : 'none' }}>
                Writer
              </p>
            </NavLink>
          </>
        ) : (
          User.role === '1996' && (
            <NavLink
              to={'/dashboard/writer'}
              className="d-flex align-items-center gap-2 side-bar-link">
              <FontAwesomeIcon
                style={{ padding: isOpen ? '10px 8px 10px 15px' : '10px 13px' }}
                icon={faPlus}
              />
              <p className="m-0" style={{ display: isOpen ? 'block' : 'none' }}>
                Writer
              </p>
            </NavLink>
          )
        )}
        {User.role === '1999' ||
          ('1995' && (
            <>
              <NavLink
                to={'/dashboard/categories'}
                className="d-flex align-items-center gap-2 side-bar-link">
                <FontAwesomeIcon
                  style={{
                    padding: isOpen ? '10px 8px 10px 15px' : '10px 13px',
                  }}
                  icon={faCartShopping}
                />
                <p
                  className="m-0"
                  style={{ display: isOpen ? 'block' : 'none' }}>
                  Categories
                </p>
              </NavLink>
              <NavLink
                to={'/dashboard/category/add'}
                className="d-flex align-items-center gap-2 side-bar-link">
                <FontAwesomeIcon
                  style={{
                    padding: isOpen ? '10px 8px 10px 15px' : '10px 13px',
                  }}
                  icon={faPlus}
                />
                <p
                  className="m-0"
                  style={{ display: isOpen ? 'block' : 'none' }}>
                  Add Category
                </p>
              </NavLink>
            </>
          ))}
      </div>
    </>
  )
}
