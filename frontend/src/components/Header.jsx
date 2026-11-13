
import { Menu, Bell, Search } from 'lucide-react'
import './Header.css'

function Header({ activePage, setSidebarOpen }) {
  return (
    <header className="app-header">
      <div className="header-left">
        <button
          className="menu-button"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open sidebar"
        >
          <Menu size={22} />
        </button>

        <div>
          <h1>{activePage}</h1>
          <p>Welcome to your Retail Sales Intelligence dashboard</p>
        </div>
      </div>

      <div className="header-right">
        <div className="header-search">
          <Search size={17} />
          <input type="text" placeholder="Search..." />
        </div>

        <button className="notification-button" aria-label="Notifications">
          <Bell size={19} />
          <span />
        </button>
      </div>
    </header>
  )
}

export default Header
