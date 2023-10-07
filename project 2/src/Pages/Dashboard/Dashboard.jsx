import { Outlet } from 'react-router-dom'
import SideBar from '../../Components/Dashboard/Sidebar'
import TopBar from '../../Components/Dashboard/Topbar'
import './dashboard.css'
export default function Dashboard() {
  return (
    <div className="position-relative">
      <TopBar />
      <div className="dashboard d-flex gap-1" style={{ marginTop: '70px' }}>
        <SideBar />
        <Outlet />
      </div>
    </div>
  )
}
