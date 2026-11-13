
import { useState } from 'react'
import {
  TrendingUp,
  Calculator,
  RotateCcw,
  ShoppingCart,
  CheckCircle2,
  AlertCircle,
  LoaderCircle,
} from 'lucide-react'

import api from '../../services/api'
import './SalesPrediction.css'

const initialForm = {
  Quantity: 3,
  Discount: 0.10,
  'Shipping Days': 4,
  'Order Year': 2017,
  'Order Month': 11,
  'Order Weekday': 2,
  Category: 'Technology',
  'Sub-Category': 'Phones',
  Region: 'West',
  Segment: 'Consumer',
}

function SalesPrediction() {
  const [formData, setFormData] = useState(initialForm)
  const [prediction, setPrediction] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (event) => {
    const { name, value, type } = event.target

    setFormData((previous) => ({
      ...previous,
      [name]: type === 'number' ? Number(value) : value,
    }))

    setPrediction(null)
    setError('')
  }

  const handleReset = () => {
    setFormData(initialForm)
    setPrediction(null)
    setError('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    setLoading(true)
    setPrediction(null)
    setError('')

    try {
      const response = await api.post('/predict-sales', formData)

      if (response.data?.predicted_sales === undefined) {
        throw new Error('The API response did not contain predicted_sales.')
      }

      const predictedValue = Number(response.data.predicted_sales)

      if (!Number.isFinite(predictedValue)) {
        throw new Error('The API returned an invalid sales prediction.')
      }

      setPrediction(predictedValue)
    } catch (err) {
      console.error('Sales prediction error:', err)

      setError(
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        'Unable to generate prediction. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (value) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2,
    }).format(value)

  return (
    <div className="sales-prediction-page">
      <section className="prediction-heading">
        <div>
          <div className="prediction-eyebrow">
            MACHINE LEARNING
          </div>

          <h2>Sales Prediction</h2>

          <p>
            Enter order details to estimate sales using your trained
            machine learning model.
          </p>
        </div>

        <div className="prediction-heading-icon">
          <TrendingUp size={27} />
        </div>
      </section>

      <div className="prediction-layout">
        <section className="prediction-form-card">
          <div className="prediction-card-heading">
            <div className="prediction-card-icon">
              <ShoppingCart size={19} />
            </div>

            <div>
              <h3>Order Information</h3>
              <p>Enter the details for your sales prediction</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="prediction-form-grid">
              <div className="prediction-field">
                <label htmlFor="quantity">Quantity</label>
                <input
                  id="quantity"
                  name="Quantity"
                  type="number"
                  min="1"
                  step="1"
                  value={formData.Quantity}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="prediction-field">
                <label htmlFor="discount">Discount</label>
                <input
                  id="discount"
                  name="Discount"
                  type="number"
                  min="0"
                  max="1"
                  step="0.01"
                  value={formData.Discount}
                  onChange={handleChange}
                  required
                />
                <small>Enter a decimal between 0 and 1</small>
              </div>

              <div className="prediction-field">
                <label htmlFor="shipping-days">Shipping Days</label>
                <input
                  id="shipping-days"
                  name="Shipping Days"
                  type="number"
                  min="0"
                  step="1"
                  value={formData['Shipping Days']}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="prediction-field">
                <label htmlFor="order-year">Order Year</label>
                <input
                  id="order-year"
                  name="Order Year"
                  type="number"
                  min="2000"
                  max="2100"
                  value={formData['Order Year']}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="prediction-field">
                <label htmlFor="order-month">Order Month</label>
                <select
                  id="order-month"
                  name="Order Month"
                  value={formData['Order Month']}
                  onChange={handleChange}
                  required
                >
                  {Array.from({ length: 12 }, (_, index) => (
                    <option key={index + 1} value={index + 1}>
                      {new Date(2000, index).toLocaleString('en', {
                        month: 'long',
                      })}
                    </option>
                  ))}
                </select>
              </div>

              <div className="prediction-field">
                <label htmlFor="order-weekday">Order Weekday</label>
                <select
                  id="order-weekday"
                  name="Order Weekday"
                  value={formData['Order Weekday']}
                  onChange={handleChange}
                  required
                >
                  {[
                    'Monday',
                    'Tuesday',
                    'Wednesday',
                    'Thursday',
                    'Friday',
                    'Saturday',
                    'Sunday',
                  ].map((day, index) => (
                    <option key={day} value={index}>
                      {day}
                    </option>
                  ))}
                </select>
              </div>

              <div className="prediction-field">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  name="Category"
                  value={formData.Category}
                  onChange={handleChange}
                  required
                >
                  <option value="Furniture">Furniture</option>
                  <option value="Office Supplies">Office Supplies</option>
                  <option value="Technology">Technology</option>
                </select>
              </div>

              <div className="prediction-field">
                <label htmlFor="sub-category">Sub-Category</label>
                <select
                  id="sub-category"
                  name="Sub-Category"
                  value={formData['Sub-Category']}
                  onChange={handleChange}
                  required
                >
                  {[
                    'Accessories',
                    'Appliances',
                    'Art',
                    'Binders',
                    'Bookcases',
                    'Chairs',
                    'Copiers',
                    'Envelopes',
                    'Fasteners',
                    'Furnishings',
                    'Labels',
                    'Machines',
                    'Paper',
                    'Phones',
                    'Storage',
                    'Supplies',
                    'Tables',
                ].map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div className="prediction-field">
                <label htmlFor="region">Region</label>
                <select
                  id="region"
                  name="Region"
                  value={formData.Region}
                  onChange={handleChange}
                  required
                >
                  <option value="Central">Central</option>
                  <option value="East">East</option>
                  <option value="South">South</option>
                  <option value="West">West</option>
                </select>
              </div>

              <div className="prediction-field">
                <label htmlFor="segment">Segment</label>
                <select
                  id="segment"
                  name="Segment"
                  value={formData.Segment}
                  onChange={handleChange}
                  required
                >
                  <option value="Consumer">Consumer</option>
                  <option value="Corporate">Corporate</option>
                  <option value="Home Office">Home Office</option>
                </select>
              </div>
            </div>

            <div className="prediction-form-actions">
              <button
                type="button"
                className="prediction-reset-button"
                onClick={handleReset}
                disabled={loading}
              >
                <RotateCcw size={16} />
                Reset
              </button>

              <button
                type="submit"
                className="prediction-submit-button"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <LoaderCircle size={17} className="loading-spinner" />
                    Predicting...
                  </>
                ) : (
                  <>
                    <Calculator size={17} />
                    Predict Sales
                  </>
                )}
              </button>
            </div>
          </form>
        </section>

        <aside className="prediction-result-card">
          <div className="result-icon">
            <TrendingUp size={24} />
          </div>

          <h3>Prediction Result</h3>

          <p className="result-description">
            Your estimated sales value will appear here after prediction.
          </p>

          {loading ? (
            <div className="result-message">
              <LoaderCircle size={22} className="loading-spinner" />
              <span>Analyzing order details...</span>
            </div>
          ) : prediction !== null ? (
            <div className="prediction-success">
              <CheckCircle2 size={22} />
              <span>Prediction generated successfully</span>

              <strong>{formatCurrency(prediction)}</strong>

              <small>Predicted Sales</small>
            </div>
          ) : (
            <div className="result-placeholder">
              <Calculator size={30} />
              <span>Waiting for prediction</span>
            </div>
          )}

          {error && (
            <div className="prediction-error">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          <div className="result-note">
            <strong>Model connection</strong>
            <span>POST /predict-sales</span>
            <small>Powered by your deployed Flask API</small>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default SalesPrediction
