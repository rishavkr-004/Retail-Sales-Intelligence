
import {
  BrainCircuit,
  TrendingUp,
  Users,
  RefreshCw,
  ShoppingBag,
  Activity,
  Database,
  Server,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
} from 'lucide-react'

import './ModelInsights.css'

const models = [
  {
    title: 'Sales Prediction',
    category: 'Regression',
    description:
      'Estimates sales based on order quantity, discount, shipping time, and customer and product details.',
    endpoint: 'POST /predict-sales',
    icon: TrendingUp,
    color: 'blue',
    features: [
      'Quantity',
      'Discount',
      'Shipping Days',
      'Category',
      'Sub-Category',
      'Region',
      'Segment',
    ],
  },
  {
    title: 'Customer Return Prediction',
    category: 'Prediction Model',
    description:
      'Uses customer purchasing behaviour and RFM-related features to estimate the return prediction output.',
    endpoint: 'POST /predict-return',
    icon: ShoppingBag,
    color: 'orange',
    features: [
      'Recency',
      'Frequency',
      'Monetary',
      'Total Quantity',
      'Average Discount',
      'Average Order Value',
      'Customer Lifespan',
    ],
  },
  {
    title: 'Customer Segmentation',
    category: 'Clustering',
    description:
      'Groups customers using their Recency, Frequency, and Monetary values to understand purchasing behaviour.',
    endpoint: 'POST /segment-customer',
    icon: Users,
    color: 'purple',
    features: ['Recency', 'Frequency', 'Monetary'],
  },
  {
    title: 'Sales Forecasting',
    category: 'Time Series Forecast',
    description:
      'Generates future monthly sales estimates for the selected forecast horizon.',
    endpoint: 'GET /forecast-sales?periods=6',
    icon: RefreshCw,
    color: 'green',
    features: ['Historical sales data', 'Forecast periods'],
  },
]

const workflow = [
  {
    number: '01',
    title: 'Data Collection',
    description: 'Retail sales records are collected from the Superstore dataset.',
    icon: Database,
  },
  {
    number: '02',
    title: 'Data Processing',
    description: 'Data is cleaned, prepared, and transformed for analysis.',
    icon: Activity,
  },
  {
    number: '03',
    title: 'Machine Learning',
    description: 'Prepared data is used by prediction, segmentation, and forecasting models.',
    icon: BrainCircuit,
  },
  {
    number: '04',
    title: 'API Integration',
    description: 'The Flask backend provides prediction results to the React application.',
    icon: Server,
  },
]

function ModelInsights({ backendStatus = 'Unknown' }) {
  const isConnected = backendStatus === 'Connected'

  return (
    <section className="model-insights-page">
      <div className="model-insights-heading">
        <div>
          <span className="model-insights-eyebrow">
            MACHINE LEARNING
          </span>
          <h1>Model Insights</h1>
          <p>
            Explore the machine learning models and their integration
            in the Retail Sales Intelligence platform.
          </p>
        </div>

        <div className="model-insights-heading-icon">
          <BrainCircuit size={29} />
        </div>
      </div>

      <div className="model-overview-banner">
        <div className="model-overview-icon">
          <BrainCircuit size={27} />
        </div>

        <div className="model-overview-text">
          <h2>Machine Learning Overview</h2>
          <p>
            Four model capabilities are integrated into the
            application through the Flask API.
          </p>
        </div>

        <div className="model-connection-status">
          {isConnected ? (
            <CheckCircle2 size={17} />
          ) : (
            <AlertCircle size={17} />
          )}
          <span>{backendStatus}</span>
        </div>
      </div>

      <div className="model-section-heading">
        <div>
          <h2>Available Models</h2>
          <p>Model purpose, input features, and API endpoints.</p>
        </div>

        <span className="model-count">04 Models</span>
      </div>

      <div className="model-cards-grid">
        {models.map((model) => {
          const Icon = model.icon

          return (
            <article className="model-card" key={model.title}>
              <div className="model-card-top">
                <div className={`model-card-icon ${model.color}`}>
                  <Icon size={22} />
                </div>

                <span className="model-category">
                  {model.category}
                </span>
              </div>

              <h3>{model.title}</h3>

              <p className="model-description">
                {model.description}
              </p>

              <div className="model-features">
                <h4>Input Features</h4>
                <div className="model-feature-tags">
                  {model.features.map((feature) => (
                    <span key={feature}>{feature}</span>
                  ))}
                </div>
              </div>

              <div className="model-endpoint">
                <span>API Endpoint</span>
                <code>{model.endpoint}</code>
              </div>
            </article>
          )
        })}
      </div>

      <div className="model-workflow-card">
        <div className="model-section-heading">
          <div>
            <h2>Project Workflow</h2>
            <p>How data moves through the application.</p>
          </div>
        </div>

        <div className="model-workflow-grid">
          {workflow.map((step, index) => {
            const Icon = step.icon

            return (
              <div className="model-workflow-step" key={step.number}>
                <div className="workflow-step-top">
                  <div className="workflow-step-icon">
                    <Icon size={21} />
                  </div>
                  <span>{step.number}</span>
                </div>

                <h3>{step.title}</h3>
                <p>{step.description}</p>

                {index !== workflow.length - 1 && (
                  <ArrowUpRight
                    className="workflow-arrow"
                    size={19}
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>

      <div className="model-notes-card">
        <div className="model-notes-icon">
          <Activity size={21} />
        </div>

        <div>
          <h3>About Model Performance</h3>
          <p>
            Accuracy, R² score, MAE, RMSE, training time, and
            feature importance are not displayed here because
            verified metrics are not currently connected to this
            page. These can be added when the evaluation results
            or a model-metrics API are available.
          </p>
        </div>
      </div>
    </section>
  )
}

export default ModelInsights
