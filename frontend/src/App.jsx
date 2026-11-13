
import { useState, useEffect } from 'react'
import { BrainCircuit } from 'lucide-react'

import api from './services/api'
import Sidebar from './components/Sidebar'
import Header from './components/Header'

import Overview from './pages/Overview/Overview'
import SalesPrediction from './pages/SalesPrediction/SalesPrediction'
import CustomerReturn from './pages/CustomerReturn/CustomerReturn'
import CustomerSegmentation from './pages/CustomerSegmentation/CustomerSegmentation'
import SalesForecasting from './pages/SalesForecasting/SalesForecasting'
import ModelInsights from './pages/ModelInsights/ModelInsights'

import './App.css'

function App() {
  const [activePage, setActivePage] = useState('Overview')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [backendStatus, setBackendStatus] = useState('Checking...')

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const response = await api.get('/health')

        if (response.data.status === 'healthy') {
          setBackendStatus('Connected')
        } else {
          setBackendStatus('Unhealthy')
        }
      } catch (error) {
        console.error('Backend connection error:', error)
        setBackendStatus('Disconnected')
      }
    }

    checkBackend()
  }, [])

  const renderPage = () => {
    switch (activePage) {
      case 'Overview':
        return <Overview setActivePage={setActivePage} />

      case 'Sales Prediction':
        return <SalesPrediction />

      case 'Customer Return':
        return <CustomerReturn />

      case 'Customer Segmentation':
        return <CustomerSegmentation />

      case 'Sales Forecasting':
        return <SalesForecasting />

      case 'Model Insights':
        return <ModelInsights backendStatus={backendStatus} />

      default:
        return (
          <section className="coming-soon panel">
            <div className="coming-icon">
              <BrainCircuit size={30} />
            </div>

            <h2>{activePage}</h2>

            <p>
              This page will be developed as a separate component
              in the next steps.
            </p>

            <button
              className="export-button"
              onClick={() => setActivePage('Overview')}
            >
              Back to Overview
            </button>
          </section>
        )
    }
  }

  return (
    <div className="app-layout">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        backendStatus={backendStatus}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <main className="main-content">
        <Header
          activePage={activePage}
          setSidebarOpen={setSidebarOpen}
        />

        <div className="page-content">
          {renderPage()}
        </div>
      </main>
    </div>
  )
}

export default App
