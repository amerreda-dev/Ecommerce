import { useEffect, useState } from 'react'
import { Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { Axios } from '../../Api/axios'
import { USER } from '../../Api/api'
import Loading from '../../Components/Loading/loading'

export default function User() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  const [disable, setDisable] = useState(true)
  const [loading, setLoading] = useState(false)

  const nav = useNavigate()
  //handleSubmit
  async function handleSubmit(e) {
    setLoading(true)
    e.preventDefault()
    try {
      const res = await Axios.post(`${USER}/edit/${params.id}`, {
        name: name,
        email: email,
        role: role,
      })
      window.location.pathname = '/dashboard/users'
    } catch (err) {
      setLoading(false)
      console.log(err)
    }
  }
  //Id of user
  const params = useParams()

  useEffect(() => {
    setLoading(true)
    Axios.get(`${USER}/${params.id}`)
      .then(data => {
        setName(data.data.name)
        setEmail(data.data.email)
        setRole(data.data.role)
        setLoading(false)
      })
      .then(() => setDisable(false))
      .catch(() => nav('/dashboard/users/page/404', { replace: true }))
  }, [])

  return (
    <>
      {loading && <Loading />}
      <Form className="bg-white w-100 mx-2 p-3" onSubmit={handleSubmit}>
        <FormGroup className="mb-3" controlId="exampleform.ControlInput1">
          <FormLabel>Username</FormLabel>
          <FormControl
            value={name}
            required
            onChange={e => setName(e.target.value)}
            type="text"
            placeholder="name..."></FormControl>
        </FormGroup>
        <FormGroup className="mb-3">
          <FormLabel>Email</FormLabel>
          <FormControl
            value={email}
            required
            onChange={e => setEmail(e.target.value)}
            type="email"
            placeholder="name@example.com"></FormControl>
        </FormGroup>
        <FormGroup className="mb-3">
          <FormLabel>Role</FormLabel>
          <Form.Select value={role} onChange={e => setRole(e.target.value)}>
            <option disabled value="">
              Select Role
            </option>
            <option value="1995">Admin</option>
            <option value="2001">User</option>
            <option value="1996">Writer</option>
          </Form.Select>
        </FormGroup>
        <button disabled={disable} className="btn btn-primary">
          Save
        </button>
      </Form>
    </>
  )
}
