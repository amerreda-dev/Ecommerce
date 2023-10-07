import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import './Css/components/button.css'
import './Css/components/alerts.css'
import './Css/components/loading.css'
import './Css/components/google.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Pages/Auth/Auth.css'
import MenuContext from './Context/MenuContext.jsx'
import WindowContext from './Context/WindowContext.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WindowContext>
      <MenuContext>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MenuContext>
    </WindowContext>
  </React.StrictMode>
)
