
import {
  LayoutDashboard,
  TrendingUp,
  Users,
  RotateCcw,
  CalendarDays,
  Brain,
  X,
  BarChart3,
} from 'lucide-react'

import './Sidebar.css'

const navigation = [
  { name: 'Overview', icon: LayoutDashboard },
  { name: 'Sales Prediction', icon: TrendingUp },
  { name: 'Customer Return', icon: RotateCcw },
  { name: 'Customer Segmentation', icon: Users },
  { name: 'Sales Forecasting', icon: CalendarDays },
  { name: 'Model Insights', icon: Brain },
]

function Sidebar({
  activePage,
  setActivePage,
  backendStatus,
  sidebarOpen,
  setSidebarOpen,
}) {
  const handleNavigation = (page) => {
    setActivePage(page)
    setSidebarOpen(false)
  }

  return (
    <>
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-brand">
          <div className="brand-icon">
            <BarChart3 size={23} />
          </div>

          <div>
            <h2>RetailIQ</h2>
            <span>Sales Intelligence</span>
          </div>

          <button
            className="sidebar-close"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        <div className="sidebar-section-label">MENU</div>

        <nav className="sidebar-navigation">
          {navigation.map((item) => {
            const Icon = item.icon

            return (
              <button
                key={item.name}
                className={`nav-item ${
                  activePage === item.name ? 'active' : ''
                }`}
                onClick={() => handleNavigation(item.name)}
              >
                <Icon size={19} />
                <span>{item.name}</span>
              </button>
            )
          })}
        </nav>

        <div className="sidebar-bottom">
          <div className="backend-status">
            <span
              className={`status-dot ${
                backendStatus === 'Connected' ? 'online' : 'offline'
              }`}
            />

            <div>
              <p>Backend Status</p>
              <span>{backendStatus}</span>
            </div>
          </div>

          <div className="sidebar-footer">
            RetailIQ Analytics Platform
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
