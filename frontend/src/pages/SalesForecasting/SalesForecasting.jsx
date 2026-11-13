
import { useState } from 'react'
import {
  TrendingUp,
  CalendarDays,
  RefreshCw,
  LoaderCircle,
  IndianRupee,
  BarChart3,
} from 'lucide-react'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'

import api from '../../services/api'
import './SalesForecasting.css'

function formatCurrency(value) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value)
}

function formatMonth(month) {
  const date = new Date(`${month}-01T00:00:00`)

  if (Number.isNaN(date.getTime())) {
    return month
  }

  return date.toLocaleDateString('en-IN', {
    month: 'short',
    year: 'numeric',
  })
}

function SalesForecasting() {
  const [periods, setPeriods] = useState('6')
  const [forecastData, setForecastData] = useState([])
  const [forecastPeriods, setForecastPeriods] = useState(0)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [hasGenerated, setHasGenerated] = useState(false)

  const generateForecast = async (event) => {
    event.preventDefault()

    setLoading(true)
    setError('')
    setForecastData([])
    setHasGenerated(false)

    try {
      const response = await api.get('/forecast-sales', {
        params: {
          periods: Number(periods),
        },
      })

      const data = response.data

      if (!Array.isArray(data.forecast)) {
        throw new Error(
          data.error || 'The API response does not contain forecast data.'
        )
      }

      const normalizedData = data.forecast.map((item) => ({
        month: item.month,
        monthLabel: formatMonth(item.month),
        forecast_sales: Number(item.forecast_sales),
      }))

      const validData = normalizedData.every(
        (item) =>
          typeof item.month === 'string' &&
          Number.isFinite(item.forecast_sales)
      )

      if (!validData || normalizedData.length === 0) {
        throw new Error('The API returned invalid or empty forecast records.')
      }

      setForecastData(normalizedData)
      setForecastPeriods(data.forecast_periods ?? normalizedData.length)
      setHasGenerated(true)
    } catch (err) {
      console.error('Sales forecasting error:', err)

      setError(
        err.response?.data?.error ||
        err.response?.data?.message ||
        err.message ||
        'Unable to generate sales forecast. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  const totalForecast = forecastData.reduce(
    (total, item) => total + item.forecast_sales,
    0
  )

  const averageForecast =
    forecastData.length > 0
      ? totalForecast / forecastData.length
      : 0

  const highestForecast =
    forecastData.length > 0
      ? Math.max(...forecastData.map((item) => item.forecast_sales))
      : 0

  return (
    <section className="forecast-page">
      <div className="forecast-heading">
        <div>
          <span className="forecast-eyebrow">MACHINE LEARNING</span>
          <h1>Sales Forecasting</h1>
          <p>
            Predict future monthly sales using your trained
            forecasting model.
          </p>
        </div>

        <div className="forecast-heading-icon">
          <TrendingUp size={29} />
        </div>
      </div>

      <div className="forecast-control-card">
        <div className="forecast-control-info">
          <div className="forecast-control-icon">
            <CalendarDays size={21} />
          </div>

          <div>
            <h2>Forecast Configuration</h2>
            <p>Select how many months you want to predict.</p>
          </div>
        </div>

        <form
          className="forecast-control-form"
          onSubmit={generateForecast}
        >
          <div className="forecast-select-group">
            <label htmlFor="forecast-periods">
              Forecast Period
            </label>

            <select
              id="forecast-periods"
              value={periods}
              onChange={(event) => setPeriods(event.target.value)}
              disabled={loading}
            >
              {Array.from({ length: 12 }, (_, index) => index + 1).map(
                (month) => (
                  <option key={month} value={month}>
                    {month} {month === 1 ? 'Month' : 'Months'}
                  </option>
                )
              )}
            </select>
          </div>

          <button
            type="submit"
            className="forecast-generate-button"
            disabled={loading}
          >
            {loading ? (
              <>
                <LoaderCircle
                  size={17}
                  className="forecast-spinner"
                />
                Generating...
              </>
            ) : (
              <>
                <RefreshCw size={17} />
                Generate Forecast
              </>
            )}
          </button>
        </form>
      </div>

      {error && (
        <div className="forecast-error">
          {error}
        </div>
      )}

      {loading && (
        <div className="forecast-loading">
          <LoaderCircle size={25} className="forecast-spinner" />
          <p>Generating your sales forecast...</p>
        </div>
      )}

      {hasGenerated && !loading && (
        <>
          <div className="forecast-results-heading">
            <div>
              <h2>Forecast Summary</h2>
              <p>
                Results for the next {forecastPeriods} months
              </p>
            </div>

            <span className="forecast-success-label">
              Forecast Generated
            </span>
          </div>

          <div className="forecast-kpi-grid">
            <div className="forecast-kpi-card">
              <div className="forecast-kpi-top">
                <span>Total Forecast Sales</span>
                <div className="forecast-kpi-icon blue">
                  <IndianRupee size={19} />
                </div>
              </div>
              <h3>{formatCurrency(totalForecast)}</h3>
              <p>Combined predicted sales</p>
            </div>

            <div className="forecast-kpi-card">
              <div className="forecast-kpi-top">
                <span>Average Monthly Sales</span>
                <div className="forecast-kpi-icon green">
                  <BarChart3 size={19} />
                </div>
              </div>
              <h3>{formatCurrency(averageForecast)}</h3>
              <p>Average per forecast month</p>
            </div>

            <div className="forecast-kpi-card">
              <div className="forecast-kpi-top">
                <span>Highest Forecast</span>
                <div className="forecast-kpi-icon purple">
                  <TrendingUp size={19} />
                </div>
              </div>
              <h3>{formatCurrency(highestForecast)}</h3>
              <p>Highest predicted monthly sales</p>
            </div>
          </div>

          <div className="forecast-chart-card">
            <div className="forecast-chart-heading">
              <div>
                <h2>Monthly Sales Forecast</h2>
                <p>Predicted sales for each upcoming month</p>
              </div>
              <span className="forecast-chart-legend">
                <span className="legend-dot" />
                Forecast Sales
              </span>
            </div>

            <div className="forecast-chart">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={forecastData}
                  margin={{
                    top: 15,
                    right: 20,
                    left: 15,
                    bottom: 10,
                  }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#e9edf5"
                  />

                  <XAxis
                    dataKey="monthLabel"
                    tick={{ fill: '#8491a5', fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />

                  <YAxis
                    tickFormatter={(value) =>
                      `₹${(value / 1000).toFixed(0)}K`
                    }
                    tick={{ fill: '#8491a5', fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    width={65}
                  />

                  <Tooltip
                    formatter={(value) => [
                      formatCurrency(Number(value)),
                      'Forecast Sales',
                    ]}
                    labelFormatter={(label) => label}
                    contentStyle={{
                      border: '1px solid #e9edf5',
                      borderRadius: '9px',
                      fontSize: '12px',
                    }}
                  />

                  <Line
                    type="monotone"
                    dataKey="forecast_sales"
                    name="Forecast Sales"
                    stroke="#2563eb"
                    strokeWidth={3}
                    dot={{
                      r: 5,
                      fill: '#2563eb',
                      stroke: '#ffffff',
                      strokeWidth: 2,
                    }}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="forecast-table-card">
            <h2>Forecast Details</h2>

            <div className="forecast-table-wrapper">
              <table className="forecast-table">
                <thead>
                  <tr>
                    <th>Month</th>
                    <th>Forecast Sales</th>
                  </tr>
                </thead>

                <tbody>
                  {forecastData.map((item) => (
                    <tr key={item.month}>
                      <td>{item.monthLabel}</td>
                      <td>{formatCurrency(item.forecast_sales)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {!hasGenerated && !loading && !error && (
        <div className="forecast-empty-card">
          <div className="forecast-empty-icon">
            <TrendingUp size={30} />
          </div>
          <h2>Your Forecast Will Appear Here</h2>
          <p>
            Choose a forecast period and click Generate Forecast
            to view predicted monthly sales.
          </p>
        </div>
      )}
    </section>
  )
}

export default SalesForecasting
