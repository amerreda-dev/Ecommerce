import { Link } from 'react-router-dom'
import './403.css'
export default function Err403({ role }) {
  return (
    <div className="text-wrapper">
      <div className="title" data-content={403}>
        403 - access denied.
      </div>
      <div className="subtitle">
        Oops, you don't have permission to access this page.
        <Link
          className="d-block text-center btn btn-primary mt-5"
          to={role === '1996' ? '/dashboard/writer' : '/'}>
          {role === '1996' ? 'Go to Writer page' : 'Go to Homepage'}
        </Link>
      </div>
    </div>
  )
}
