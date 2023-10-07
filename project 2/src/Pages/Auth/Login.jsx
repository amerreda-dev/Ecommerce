import axios from 'axios'
import { useState } from 'react'
import { LOGIN, baseUrl } from '../../Api/api'
import Loading from '../../Components/Loading/loading'
import Cookie from 'cookie-universal'
import Form from 'react-bootstrap/Form'
import { useNavigate } from 'react-router-dom'
export default function Login() {
  // States
  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  // Loading
  const [loading, setLoading] = useState(false)
  // Cookies
  const cookie = Cookie()
  //
  const navigate = useNavigate()
  // Err
  const [err, setErr] = useState('')

  // handle form change
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  // handle submit
  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await axios.post(`${baseUrl}/${LOGIN}`, {
        email: form.email,
        password: form.password,
      })
      setLoading(false)
      const token = res.data.token
      cookie.set('e-commerce', token)
      const role = res.data.user.role
      console.log(role)
      const go = role === '1995' ? 'users' : 'writer'
      window.location.pathname = `/dashboard/${go}`
    } catch (err) {
      console.log(err)
      setLoading(false)
      if (err.response.status === 401) {
        setErr('Wrong email or password')
      } else {
        setErr('internal server error')
      }
    }
  }
  return (
    <>
      {loading && <Loading />}
      <div className="container">
        <div className="row" style={{ height: '100vh' }}>
          <Form className="form" onSubmit={handleSubmit}>
            <div className="custom-form">
              <h1>Login</h1>

              <Form.Group
                className="form-custom"
                controlId="exampleForm.ControlInput1">
                <Form.Control
                  value={form.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="Enter Your Email ..."
                  required
                  name="email"
                />
                <Form.Label>Email:</Form.Label>
              </Form.Group>

              <Form.Group
                className="form-custom"
                controlId="exampleForm.ControlInput2">
                <Form.Control
                  value={form.password}
                  onChange={handleChange}
                  type="password"
                  placeholder="Enter Your Password ..."
                  minLength="6"
                  required
                  name="password"
                />
                <Form.Label>Password:</Form.Label>
              </Form.Group>
              <button className="btn btn-primary">Login</button>
              <div className="google-btn">
                <a href={`http://127.0.0.1:8000/login-google`}>
                  <div className="google-icon-wrapper">
                    <img
                      className="google-icon"
                      src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                      alt="sign in with google"
                    />
                  </div>
                  <p className="btn-text">
                    <b>Sign in with google</b>
                  </p>
                </a>
              </div>
              {err !== '' && <span className="error">{err}</span>}
            </div>
          </Form>
        </div>
      </div>
    </>
  )
}
