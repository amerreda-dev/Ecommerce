import { useEffect, useState } from 'react'
import { CAT } from '../../Api/api'
import { Axios } from '../../Api/axios'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import TableShow from '../../Components/Dashboard/Table'

export default function Categories() {
  const [Categories, setCategories] = useState([])

  //Get all Categories

  useEffect(() => {
    Axios.get(`/${CAT}`)
      .then(data => setCategories(data.data))
      .catch(err => console.log(err))
  }, [])

  const header = [
    { key: 'title', name: 'Title' },
    { key: 'image', name: 'Image' },
  ]

  async function handleDelete(id) {
    try {
      const res = await Axios.delete(`${CAT}/${id}`)
      setCategories(prev => prev.filter(item => item.id !== id))
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
      <TableShow header={header} data={Categories} delete={handleDelete} />
    </div>
  )
}
