import { useState } from 'react'
import { Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { Axios } from '../../Api/axios'
import { CATEGORY } from '../../Api/api'
import Loading from '../../Components/Loading/loading'

export default function AddCategory() {
  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')
  const [loading, setLoading] = useState(false)
  //handleSubmit
  async function handleSubmit(e) {
    setLoading(true)
    e.preventDefault()
    const form = new FormData()
    form.append('title', title)
    form.append('image', image)
    try {
      const res = await Axios.post(`${CATEGORY}/add`, form)
      window.location.pathname = '/dashboard/categories'
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
          <FormLabel>Title</FormLabel>
          <FormControl
            value={title}
            required
            onChange={e => setTitle(e.target.value)}
            type="text"
            placeholder="Title..."></FormControl>
        </FormGroup>
        <FormGroup className="mb-3" controlId="image">
          <FormLabel>Image</FormLabel>
          <FormControl
            type="file"
            onChange={e => setImage(e.target.files.item(0))}></FormControl>
        </FormGroup>

        <button
          disabled={title.length > 1 ? false : true}
          className="btn btn-primary">
          Save
        </button>
      </Form>
    </>
  )
}
