
import { useState } from 'react'
import { Users, RotateCcw, LoaderCircle, Target } from 'lucide-react'
import api from '../../services/api'
import './CustomerSegmentation.css'

const initialForm = {
  Recency: 30,
  Frequency: 5,
  Monetary: 2500,
}

const clusterLabels = {
  0: 'Other / Low Value',
  1: 'At Risk',
  2: 'High Value',
  3: 'Loyal',
}

function CustomerSegmentation() {
  const [formData, setFormData] = useState(initialForm)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  const handleReset = () => {
    setFormData(initialForm)
    setResult(null)
    setError('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setResult(null)

    const payload = {
      Recency: Number(formData.Recency),
      Frequency: Number(formData.Frequency),
      Monetary: Number(formData.Monetary),
    }

    if (
      !Number.isFinite(payload.Recency) ||
      !Number.isFinite(payload.Frequency) ||
      !Number.isFinite(payload.Monetary) ||
      payload.Recency < 0 ||
      payload.Frequency < 0 ||
      payload.Monetary < 0
    ) {
      setError('Please enter valid non-negative numbers in all fields.')
      return
    }

    try {
      setLoading(true)

      const response = await api.post('/segment-customer', payload)
      setResult(response.data)
    } catch (err) {
      console.error('Customer segmentation error:', err)

      setError(
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        'Unable to segment customer. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  const clusterId = result?.cluster
  const clusterLabel =
    clusterId !== undefined && clusterId !== null
      ? clusterLabels[clusterId] || 'Unmapped Cluster'
      : null

  return (
    <section className="segmentation-page">
      <div className="segmentation-heading">
        <div>
          <span className="page-eyebrow">MACHINE LEARNING</span>
          <h1>Customer Segmentation</h1>
          <p>
            Group customers based on their purchasing behaviour
            using RFM analysis and your trained clustering model.
          </p>
        </div>

        <div className="segmentation-heading-icon">
          <Users size={28} />
        </div>
      </div>

      <div className="segmentation-layout">
        <div className="segmentation-form-card">
          <div className="segmentation-card-heading">
            <div className="segmentation-card-icon">
              <Target size={20} />
            </div>
            <div>
              <h2>Customer RFM Details</h2>
              <p>Enter the customer's purchase information.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="segmentation-field">
              <label htmlFor="Recency">Recency (Days)</label>
              <input
                id="Recency"
                name="Recency"
                type="number"
                min="0"
                step="1"
                value={formData.Recency}
                onChange={handleChange}
                required
              />
              <small>
                Number of days since the customer's last purchase.
              </small>
            </div>

            <div className="segmentation-field">
              <label htmlFor="Frequency">Frequency (Orders)</label>
              <input
                id="Frequency"
                name="Frequency"
                type="number"
                min="0"
                step="1"
                value={formData.Frequency}
                onChange={handleChange}
                required
              />
              <small>
                Total number of orders placed by the customer.
              </small>
            </div>

            <div className="segmentation-field">
              <label htmlFor="Monetary">Monetary (Sales Value)</label>
              <input
                id="Monetary"
                name="Monetary"
                type="number"
                min="0"
                step="0.01"
                value={formData.Monetary}
                onChange={handleChange}
                required
              />
              <small>
                Total amount spent by the customer.
              </small>
            </div>

            {error && (
              <div className="segmentation-error">
                {error}
              </div>
            )}

            <div className="segmentation-actions">
              <button
                type="submit"
                className="segment-submit-button"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <LoaderCircle size={17} className="segmentation-spinner" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Users size={17} />
                    Segment Customer
                  </>
                )}
              </button>

              <button
                type="button"
                className="segment-reset-button"
                onClick={handleReset}
                disabled={loading}
              >
                <RotateCcw size={16} />
                Reset
              </button>
            </div>
          </form>
        </div>

        <div className="segmentation-result-card">
          <div className="segmentation-result-icon">
            <Users size={25} />
          </div>

          <h2>Segmentation Result</h2>
          <p className="segmentation-result-description">
            Your customer's predicted cluster will appear here
            after analysis.
          </p>

          {result ? (
            <div className="segmentation-result-content">
              {clusterId !== undefined && clusterId !== null ? (
                <>
                  <span className="result-label">Predicted Cluster</span>
                  <div className="cluster-number">{clusterId}</div>
                  <h3>{clusterLabel}</h3>
                  <p>
                    This label uses the cluster mapping from your
                    earlier notebook. Confirm that it matches the
                    model currently deployed in your API.
                  </p>
                </>
              ) : (
                <>
                  <span className="result-label">API Response</span>
                  <pre className="segmentation-json">
                    {JSON.stringify(result, null, 2)}
                  </pre>
                </>
              )}
            </div>
          ) : (
            <div className="segmentation-empty-state">
              <div className="empty-state-circle">
                <Target size={27} />
              </div>
              <span>Waiting for customer data</span>
            </div>
          )}
        </div>
      </div>

      <div className="segmentation-info-card">
        <h3>Understanding RFM Analysis</h3>
        <div className="rfm-info-grid">
          <div>
            <strong>R — Recency</strong>
            <p>How recently the customer made a purchase.</p>
          </div>
          <div>
            <strong>F — Frequency</strong>
            <p>How often the customer makes purchases.</p>
          </div>
          <div>
            <strong>M — Monetary</strong>
            <p>How much money the customer spends.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CustomerSegmentation
