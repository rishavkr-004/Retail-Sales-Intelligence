
import { useState } from 'react'
import {
  RotateCcw,
  Users,
  Calculator,
  CheckCircle2,
  AlertCircle,
  LoaderCircle,
  RefreshCw,
} from 'lucide-react'

import api from '../../services/api'
import './CustomerReturn.css'

const initialForm = {
  Recency: 30,
  Frequency: 5,
  Monetary: 2500,
  Total_Quantity: 12,
  Average_Discount: 0.10,
  Average_Order_Value: 500,
  Customer_Lifespan: 180,
}

const fields = [
  {
    name: 'Recency',
    label: 'Recency (Days)',
    description: 'Days since the customer last purchased',
    min: 0,
    step: 1,
  },
  {
    name: 'Frequency',
    label: 'Frequency',
    description: 'Number of customer purchases',
    min: 0,
    step: 1,
  },
  {
    name: 'Monetary',
    label: 'Monetary Value',
    description: 'Total customer spending',
    min: 0,
    step: 0.01,
  },
  {
    name: 'Total_Quantity',
    label: 'Total Quantity',
    description: 'Total items purchased',
    min: 0,
    step: 1,
  },
  {
    name: 'Average_Discount',
    label: 'Average Discount',
    description: 'Average discount as a decimal (0 to 1)',
    min: 0,
    max: 1,
    step: 0.01,
  },
  {
    name: 'Average_Order_Value',
    label: 'Average Order Value',
    description: 'Average spending per order',
    min: 0,
    step: 0.01,
  },
  {
    name: 'Customer_Lifespan',
    label: 'Customer Lifespan (Days)',
    description: 'Days between first and latest purchase',
    min: 0,
    step: 1,
  },
]

function CustomerReturn() {
  const [formData, setFormData] = useState(initialForm)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))

    setResult(null)
    setError('')
  }

  const handleReset = () => {
    setFormData(initialForm)
    setResult(null)
    setError('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    setLoading(true)
    setResult(null)
    setError('')

    const payload = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [
        key,
        Number(value),
      ])
    )

    try {
      const response = await api.post('/predict-return', payload)

      setResult(response.data)
    } catch (err) {
      console.error('Customer return prediction error:', err)

      setError(
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        'Unable to process customer return prediction.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="customer-return-page">
      <section className="return-page-heading">
        <div>
          <div className="return-eyebrow">CUSTOMER ANALYTICS</div>
          <h2>Customer Return Prediction</h2>
          <p>
            Analyze customer purchase behavior and submit customer
            metrics to your machine learning API.
          </p>
        </div>

        <div className="return-heading-icon">
          <RotateCcw size={27} />
        </div>
      </section>

      <div className="return-layout">
        <section className="return-form-card">
          <div className="return-card-heading">
            <div className="return-card-icon">
              <Users size={20} />
            </div>

            <div>
              <h3>Customer Information</h3>
              <p>Enter the customer's historical purchase metrics</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="return-form-grid">
              {fields.map((field) => (
                <div className="return-field" key={field.name}>
                  <label htmlFor={field.name}>
                    {field.label}
                  </label>

                  <input
                    id={field.name}
                    name={field.name}
                    type="number"
                    min={field.min}
                    max={field.max}
                    step={field.step}
                    value={formData[field.name]}
                    onChange={handleChange}
                    required
                  />

                  <small>{field.description}</small>
                </div>
              ))}
            </div>

            <div className="return-form-actions">
              <button
                type="button"
                className="return-reset-button"
                onClick={handleReset}
                disabled={loading}
              >
                <RefreshCw size={16} />
                Reset
              </button>

              <button
                type="submit"
                className="return-submit-button"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <LoaderCircle size={17} className="return-spinner" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Calculator size={17} />
                    Predict Customer Return
                  </>
                )}
              </button>
            </div>
          </form>
        </section>

        <aside className="return-result-card">
          <div className="return-result-icon">
            <RotateCcw size={24} />
          </div>

          <h3>Prediction Response</h3>

          <p className="return-result-description">
            The response returned by your Flask API will appear here.
          </p>

          {loading ? (
            <div className="return-result-placeholder">
              <LoaderCircle size={24} className="return-spinner" />
              <span>Processing customer data...</span>
            </div>
          ) : result !== null ? (
            <div className="return-result-success">
              <div className="return-success-heading">
                <CheckCircle2 size={19} />
                API response received
              </div>

              <pre className="return-json-output">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          ) : (
            <div className="return-result-placeholder">
              <Calculator size={30} />
              <span>Waiting for prediction</span>
            </div>
          )}

          {error && (
            <div className="return-error-message">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          <div className="return-api-info">
            <strong>API Endpoint</strong>
            <span>POST /predict-return</span>
            <small>Connected through your shared API service</small>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default CustomerReturn
