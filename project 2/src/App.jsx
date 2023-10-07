import { Route, Routes } from 'react-router-dom'

import HomePage from './Pages/Website/HomePage'
import Login from './Pages/Auth/Login'
import Register from './Pages/Auth/Register'
import Users from './Pages/Dashboard/Users'
import GoogleCallback from './Pages/Auth/GoogleCallback'
import Dashboard from './Pages/Dashboard/Dashboard'
import RequireAuth from './Pages/Auth/RequireAuth'
import User from './Pages/Dashboard/User'
import AddUser from './Pages/Dashboard/AddUser'
import Err403 from './Pages/Auth/403'
import Writer from './Pages/Dashboard/Writer'
import Err404 from './Pages/Auth/404'
import RequireBack from './Pages/Auth/RequireBack'
import Categories from './Pages/Dashboard/Categories'
import AddCategory from './Pages/Dashboard/AddCategory'

function App() {
  return (
    <div className="div">
      <Routes>
        {/*public routes*/}
        <Route path="/" element={<HomePage />} />
        <Route element={<RequireBack />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path="/auth/google/callback" element={<GoogleCallback />} />
        {/* protected routes*/}
        <Route element={<RequireAuth allowedRole={['1996', '1995', '1999']} />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route element={<RequireAuth allowedRole={['1995']} />}>
              <Route path="users" element={<Users />} />
              <Route path="users/:id" element={<User />} />
              <Route path="user/add" element={<AddUser />} />
            </Route>
            <Route element={<RequireAuth allowedRole={['1999', '1995']} />}>
              <Route path="categories" element={<Categories />} />
              <Route path="category/add" element={<AddCategory />} />
            </Route>
            <Route element={<RequireAuth allowedRole={['1996', '1995']} />}>
              <Route path="writer" element={<Writer />} />
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<Err404 />} />
      </Routes>
    </div>
  )
}

export default App
