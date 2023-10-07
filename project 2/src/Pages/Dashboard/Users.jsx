import { useEffect, useState } from 'react'
import { USER, USERS, baseUrl } from '../../Api/api'
import Cookie from 'cookie-universal'
import { Table } from 'react-bootstrap'
import { Axios } from '../../Api/axios'

import { Link } from 'react-router-dom'
import TableShow from '../../Components/Dashboard/Table'
export default function Users() {
  const [Users, setUsers] = useState([])
  const [currentUser, setCurrentUser] = useState('')

  //Get current user
  useEffect(() => {
    Axios.get(`${USER}`).then(res => setCurrentUser(res.data))
  }, [])

  //Get all users

  useEffect(() => {
    Axios.get(`/${USERS}`)
      .then(data => setUsers(data.data))
      .catch(err => console.log(err))
  }, [])

  const header = [
    { key: 'name', name: 'Username' },
    { key: 'email', name: 'Email' },
    { key: 'role', name: 'Role' },
  ]

  // Handle delete
  async function handleDelete(id) {
    try {
      const res = await Axios.delete(`${USER}/${id}`)
      setUsers(prev => prev.filter(item => item.id !== id))
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="bg-white w-100 p-2">
      <div className="d-flex align-items-center justify-content-between">
        <h1>Users Page</h1>
        <Link className="btn btn-primary" to="/dashboard/user/add">
          Add User
        </Link>
      </div>
      <TableShow
        header={header}
        data={Users}
        currentUser={currentUser}
        delete={handleDelete}
      />
    </div>
  )
}
