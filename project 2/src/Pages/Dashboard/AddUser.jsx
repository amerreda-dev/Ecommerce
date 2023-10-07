import { useEffect, useState } from 'react'
import { Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { Axios } from '../../Api/axios'
import { USER } from '../../Api/api'
import Loading from '../../Components/Loading/loading'

export default function AddUser() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  //handleSubmit
  async function handleSubmit(e) {
    setLoading(true)
    e.preventDefault()
    try {
      const res = await Axios.post(`${USER}/add`, {
        name: name,
        email: email,
        password: password,
        role: role,
      })
      window.location.pathname = '/dashboard/users'
    } catch (err) {
      setLoading(false)
      console.log(err)
    }
  }

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
          <FormLabel>Password</FormLabel>
          <FormControl
            value={password}
            required
            onChange={e => setPassword(e.target.value)}
            type="password"
            placeholder="password..."></FormControl>
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
            <option value="1999">Product Manager</option>
          </Form.Select>
        </FormGroup>
        <button
          disabled={
            name.length > 1 &&
            email.length > 1 &&
            password.length >= 6 &&
            role !== ''
              ? false
              : true
          }
          className="btn btn-primary">
          Save
        </button>
      </Form>
    </>
  )
}
