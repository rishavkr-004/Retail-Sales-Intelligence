
import {
  ShoppingCart,
  TrendingUp,
  Users,
  ChartNoAxesCombined,
  CalendarDays,
  ChevronDown,
  Download,
  ArrowUpRight,
} from 'lucide-react'

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
} from 'recharts'

import KpiCard from '../../components/KpiCard'
import './Overview.css'

const salesData = [
  { month: 'Jan', sales: 12000, profit: 3200 },
  { month: 'Feb', sales: 15500, profit: 4100 },
  { month: 'Mar', sales: 13800, profit: 3700 },
  { month: 'Apr', sales: 19000, profit: 5200 },
  { month: 'May', sales: 17500, profit: 4800 },
  { month: 'Jun', sales: 22000, profit: 6100 },
  { month: 'Jul', sales: 20500, profit: 5700 },
  { month: 'Aug', sales: 25000, profit: 7200 },
  { month: 'Sep', sales: 23000, profit: 6500 },
  { month: 'Oct', sales: 28500, profit: 8100 },
  { month: 'Nov', sales: 26000, profit: 7500 },
  { month: 'Dec', sales: 32000, profit: 9200 },
]

const categoryData = [
  { category: 'Technology', sales: 42000 },
  { category: 'Furniture', sales: 31000 },
  { category: 'Office Supplies', sales: 24000 },
]

const recentOrders = [
  {
    id: 'CA-2017-100111',
    customer: 'William Brown',
    category: 'Technology',
    sales: '$2,499.00',
    status: 'Delivered',
  },
  {
    id: 'CA-2017-100112',
    customer: 'Claire Gute',
    category: 'Furniture',
    sales: '$849.50',
    status: 'Delivered',
  },
  {
    id: 'CA-2017-100113',
    customer: 'Sean Miller',
    category: 'Office Supplies',
    sales: '$320.00',
    status: 'Processing',
  },
  {
    id: 'CA-2017-100114',
    customer: 'Brosina Hoffman',
    category: 'Technology',
    sales: '$1,250.00',
    status: 'Delivered',
  },
]

function Overview({ setActivePage }) {
  return (
    <div className="overview-page">
      <section className="page-heading">
        <div>
          <div className="eyebrow">RETAIL SALES INTELLIGENCE</div>
          <h1>Dashboard Overview</h1>
          <p>
            Monitor your retail performance and business insights in one place.
          </p>
        </div>

        <div className="heading-actions">
          <button className="date-button">
            <CalendarDays size={17} />
            Last 12 months
            <ChevronDown size={15} />
          </button>

          <button
            className="export-button"
            onClick={() => window.print()}
          >
            <Download size={17} />
            Export
          </button>
        </div>
      </section>

      <section className="kpi-grid">
        <KpiCard
          title="Total Sales"
          value="$2.30M"
          change="+12.8%"
          positive={true}
          detail="vs. previous period"
          icon={<ShoppingCart />}
          color="blue"
        />

        <KpiCard
          title="Total Profit"
          value="$286.40K"
          change="+8.4%"
          positive={true}
          detail="vs. previous period"
          icon={<TrendingUp />}
          color="green"
        />

        <KpiCard
          title="Total Orders"
          value="9,994"
          change="+6.2%"
          positive={true}
          detail="vs. previous period"
          icon={<ChartNoAxesCombined />}
          color="purple"
        />

        <KpiCard
          title="Customers"
          value="793"
          change="-2.1%"
          positive={false}
          detail="vs. previous period"
          icon={<Users />}
          color="orange"
        />
      </section>

      <section className="charts-grid">
        <div className="panel sales-panel">
          <div className="panel-heading">
            <div>
              <h3>Sales &amp; Profit Trends</h3>
              <p>Monthly sales and profit performance</p>
            </div>

            <button className="period-select">
              Monthly
              <ChevronDown size={14} />
            </button>
          </div>

          <div className="chart-legend">
            <span>
              <i className="legend-sales" />
              Sales
            </span>
            <span>
              <i className="legend-profit" />
              Profit
            </span>
          </div>

          <div className="chart-area">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={salesData}
                margin={{ top: 10, right: 8, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id="salesGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="#3478f6"
                      stopOpacity={0.2}
                    />
                    <stop
                      offset="95%"
                      stopColor="#3478f6"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#edf0f5"
                />

                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#8993a5', fontSize: 12 }}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#8993a5', fontSize: 12 }}
                  tickFormatter={(value) => `$${value / 1000}k`}
                />

                <Tooltip
                  formatter={(value) =>
                    `$${Number(value).toLocaleString()}`
                  }
                />

                <Area
                  type="monotone"
                  dataKey="sales"
                  stroke="#3478f6"
                  strokeWidth={2.5}
                  fill="url(#salesGradient)"
                />

                <Area
                  type="monotone"
                  dataKey="profit"
                  stroke="#19b88a"
                  strokeWidth={2.5}
                  fill="none"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="panel category-panel">
          <div className="panel-heading">
            <div>
              <h3>Sales by Category</h3>
              <p>Category-wise sales distribution</p>
            </div>

            <button className="more-button" aria-label="More options">
              •••
            </button>
          </div>

          <div className="chart-area category-chart">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={categoryData}
                layout="vertical"
                margin={{ top: 10, right: 10, left: 5, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  horizontal={false}
                  stroke="#edf0f5"
                />

                <XAxis
                  type="number"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#8993a5', fontSize: 11 }}
                  tickFormatter={(value) => `$${value / 1000}k`}
                />

                <YAxis
                  type="category"
                  dataKey="category"
                  width={105}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#657084', fontSize: 11 }}
                />

                <Tooltip
                  formatter={(value) =>
                    `$${Number(value).toLocaleString()}`
                  }
                />

                <Bar
                  dataKey="sales"
                  fill="#3478f6"
                  radius={[0, 5, 5, 0]}
                  barSize={25}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      <section className="panel orders-panel">
        <div className="panel-heading">
          <div>
            <h3>Recent Orders</h3>
            <p>A quick look at recent transactions</p>
          </div>

          <button
            className="view-all"
            onClick={() => setActivePage('Sales Prediction')}
          >
            View all
            <ArrowUpRight size={15} />
          </button>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>ORDER ID</th>
                <th>CUSTOMER</th>
                <th>CATEGORY</th>
                <th>SALES</th>
                <th>STATUS</th>
              </tr>
            </thead>

            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td className="order-id">{order.id}</td>
                  <td>{order.customer}</td>
                  <td>{order.category}</td>
                  <td className="sales-value">{order.sales}</td>
                  <td>
                    <span className={`order-status ${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <p className="demo-note">
        Demo dashboard data — connect your Render API to display live project results.
      </p>
    </div>
  )
}

export default Overview
