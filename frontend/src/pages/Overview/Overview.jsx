
import { useMemo, useState } from 'react'
import {
  ShoppingCart,
  TrendingUp,
  Users,
  ChartNoAxesCombined,
  CalendarDays,
  ChevronDown,
  Download,
  ArrowUpRight,
  Search,
  Filter,
  X,
  MoreHorizontal,
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
  { category: 'Technology', sales: 42000, profit: 9000, quantity: 1850 },
  { category: 'Furniture', sales: 31000, profit: 5500, quantity: 1200 },
  { category: 'Office Supplies', sales: 24000, profit: 4200, quantity: 2600 },
]

const recentOrders = [
  {
    id: 'CA-2017-100111',
    customer: 'William Brown',
    category: 'Technology',
    sales: 2499,
    status: 'Delivered',
  },
  {
    id: 'CA-2017-100112',
    customer: 'Claire Gute',
    category: 'Furniture',
    sales: 849.5,
    status: 'Delivered',
  },
  {
    id: 'CA-2017-100113',
    customer: 'Sean Miller',
    category: 'Office Supplies',
    sales: 320,
    status: 'Processing',
  },
  {
    id: 'CA-2017-100114',
    customer: 'Brosina Hoffman',
    category: 'Technology',
    sales: 1250,
    status: 'Delivered',
  },
]

const dateOptions = [
  { label: 'Last 3 months', value: '3' },
  { label: 'Last 6 months', value: '6' },
  { label: 'Last 12 months', value: '12' },
  { label: 'All time', value: 'all' },
]

const chartPeriods = ['Monthly', 'Quarterly', 'Yearly']

const currency = (value) =>
  `$${Number(value).toLocaleString('en-US', {
    maximumFractionDigits: 2,
  })}`

function groupSalesData(data, period) {
  if (period === 'Monthly') return data

  if (period === 'Quarterly') {
    const quarters = []

    for (let index = 0; index < data.length; index += 3) {
      const group = data.slice(index, index + 3)

      quarters.push({
        month: `Q${Math.floor(index / 3) + 1}`,
        sales: group.reduce((sum, item) => sum + item.sales, 0),
        profit: group.reduce((sum, item) => sum + item.profit, 0),
      })
    }

    return quarters
  }

  return [
    {
      month: 'Year',
      sales: data.reduce((sum, item) => sum + item.sales, 0),
      profit: data.reduce((sum, item) => sum + item.profit, 0),
    },
  ]
}

function Overview() {
  const [dateRange, setDateRange] = useState('12')
  const [chartPeriod, setChartPeriod] = useState('Monthly')
  const [categoryMetric, setCategoryMetric] = useState('sales')
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false)

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [currentPage, setCurrentPage] = useState(1)

  const visibleSalesData = useMemo(() => {
    const count = dateRange === 'all' ? 12 : Number(dateRange)
    return salesData.slice(-count)
  }, [dateRange])

  const chartData = useMemo(
    () => groupSalesData(visibleSalesData, chartPeriod),
    [visibleSalesData, chartPeriod]
  )

  const filteredOrders = useMemo(() => {
    const search = searchTerm.trim().toLowerCase()

    return recentOrders.filter((order) => {
      const matchesSearch =
        !search ||
        order.id.toLowerCase().includes(search) ||
        order.customer.toLowerCase().includes(search)

      const matchesCategory =
        selectedCategory === 'All' ||
        order.category === selectedCategory

      const matchesStatus =
        selectedStatus === 'All' ||
        order.status === selectedStatus

      return matchesSearch && matchesCategory && matchesStatus
    })
  }, [searchTerm, selectedCategory, selectedStatus])

  const totalPages = Math.max(
    1,
    Math.ceil(filteredOrders.length / rowsPerPage)
  )

  const safePage = Math.min(currentPage, totalPages)

  const paginatedOrders = filteredOrders.slice(
    (safePage - 1) * rowsPerPage,
    safePage * rowsPerPage
  )

  const startRecord =
    filteredOrders.length === 0
      ? 0
      : (safePage - 1) * rowsPerPage + 1

  const endRecord = Math.min(
    safePage * rowsPerPage,
    filteredOrders.length
  )

  const resetFilters = () => {
    setSearchTerm('')
    setSelectedCategory('All')
    setSelectedStatus('All')
    setRowsPerPage(5)
    setCurrentPage(1)
  }

  const handleExport = () => {
    const headers = ['Order ID', 'Customer', 'Category', 'Sales', 'Status']

    const rows = filteredOrders.map((order) => [
      order.id,
      order.customer,
      order.category,
      order.sales,
      order.status,
    ])

    const csv = [
      headers,
      ...rows,
    ]
      .map((row) =>
        row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(',')
      )
      .join('\n')

    const blob = new Blob([csv], {
      type: 'text/csv;charset=utf-8;',
    })

    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')

    link.href = url
    link.download = 'retailiq-recent-orders.csv'
    link.click()

    URL.revokeObjectURL(url)
  }

  const metricLabel = {
    sales: 'Sales',
    profit: 'Profit',
    quantity: 'Quantity',
  }[categoryMetric]

  const metricFormatter =
    categoryMetric === 'quantity'
      ? (value) => Number(value).toLocaleString('en-IN')
      : currency

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
          <label className="date-select-wrap">
            <CalendarDays size={17} />

            <select
              className="date-select"
              value={dateRange}
              onChange={(event) => setDateRange(event.target.value)}
              aria-label="Select dashboard date range"
            >
              {dateOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <ChevronDown size={15} />
          </label>

          <button className="export-button" onClick={handleExport}>
            <Download size={17} />
            Export Orders
          </button>
        </div>
      </section>

      <section className="kpi-grid">
        <KpiCard
          title="Total Sales"
          value="$2.30M"
          change="+12.8%"
          positive={true}
          detail="Demo data"
          icon={<ShoppingCart />}
          color="blue"
        />

        <KpiCard
          title="Total Profit"
          value="$286.40K"
          change="+8.4%"
          positive={true}
          detail="Demo data"
          icon={<TrendingUp />}
          color="green"
        />

        <KpiCard
          title="Total Orders"
          value="9,994"
          change="+6.2%"
          positive={true}
          detail="Dataset row count"
          icon={<ChartNoAxesCombined />}
          color="purple"
        />

        <KpiCard
          title="Customers"
          value="793"
          change="-2.1%"
          positive={false}
          detail="Demo data"
          icon={<Users />}
          color="orange"
        />
      </section>

      <section className="charts-grid">
        <div className="panel sales-panel">
          <div className="panel-heading">
            <div>
              <h3>Sales &amp; Profit Trends</h3>
              <p>
                {chartPeriod} sales and profit performance
              </p>
            </div>

            <label className="chart-select-wrap">
              <select
                className="period-select"
                value={chartPeriod}
                onChange={(event) => setChartPeriod(event.target.value)}
                aria-label="Select chart period"
              >
                {chartPeriods.map((period) => (
                  <option key={period} value={period}>
                    {period}
                  </option>
                ))}
              </select>
              <ChevronDown size={14} />
            </label>
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
                data={chartData}
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
                    <stop offset="0%" stopColor="#3478f6" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#3478f6" stopOpacity={0} />
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
                  formatter={(value) => currency(value)}
                />

                <Area
                  type="monotone"
                  dataKey="sales"
                  name="Sales"
                  stroke="#3478f6"
                  strokeWidth={2.5}
                  fill="url(#salesGradient)"
                />

                <Area
                  type="monotone"
                  dataKey="profit"
                  name="Profit"
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
              <p>Category-wise {metricLabel.toLowerCase()} distribution</p>
            </div>

            <div className="category-menu-container">
              <button
                className="more-button"
                aria-label="Category chart options"
                aria-expanded={categoryMenuOpen}
                onClick={() => setCategoryMenuOpen((open) => !open)}
              >
                <MoreHorizontal size={19} />
              </button>

              {categoryMenuOpen && (
                <div className="category-menu">
                  {[
                    { label: 'Sales', value: 'sales' },
                    { label: 'Profit', value: 'profit' },
                    { label: 'Quantity', value: 'quantity' },
                  ].map((option) => (
                    <button
                      key={option.value}
                      className={
                        categoryMetric === option.value ? 'selected' : ''
                      }
                      onClick={() => {
                        setCategoryMetric(option.value)
                        setCategoryMenuOpen(false)
                      }}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
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
                  tickFormatter={
                    categoryMetric === 'quantity'
                      ? undefined
                      : (value) => `$${value / 1000}k`
                  }
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
                  formatter={(value) => [
                    metricFormatter(value),
                    metricLabel,
                  ]}
                />

                <Bar
                  dataKey={categoryMetric}
                  name={metricLabel}
                  fill="#3478f6"
                  radius={[0, 5, 5, 0]}
                  barSize={25}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="chart-demo-note">
            Illustrative category figures for UI testing.
          </p>
        </div>
      </section>

      <section className="panel orders-panel">
        <div className="panel-heading orders-heading">
          <div>
            <h3>Recent Orders</h3>
            <p>Search and filter the currently loaded transactions</p>
          </div>

          <button className="view-all" onClick={resetFilters}>
            <X size={15} />
            Clear filters
          </button>
        </div>

        <div className="orders-filters">
          <div className="orders-search">
            <Search size={17} />
            <input
              type="search"
              placeholder="Search Order ID or Customer..."
              value={searchTerm}
              onChange={(event) => {
                setSearchTerm(event.target.value)
                setCurrentPage(1)
              }}
            />
          </div>

          <label className="orders-filter-select">
            <Filter size={15} />
            <select
              value={selectedCategory}
              onChange={(event) => {
                setSelectedCategory(event.target.value)
                setCurrentPage(1)
              }}
              aria-label="Filter by category"
            >
              <option value="All">All Categories</option>
              <option value="Technology">Technology</option>
              <option value="Furniture">Furniture</option>
              <option value="Office Supplies">Office Supplies</option>
            </select>
          </label>

          <label className="orders-filter-select">
            <select
              value={selectedStatus}
              onChange={(event) => {
                setSelectedStatus(event.target.value)
                setCurrentPage(1)
              }}
              aria-label="Filter by order status"
            >
              <option value="All">All Statuses</option>
              <option value="Delivered">Delivered</option>
              <option value="Processing">Processing</option>
            </select>
          </label>
        </div>

        <div className="orders-count">
          Showing <strong>{startRecord}–{endRecord}</strong> of{' '}
          <strong>{filteredOrders.length}</strong> matching orders
          <span>({recentOrders.length} demo records loaded)</span>
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
              {paginatedOrders.length > 0 ? (
                paginatedOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="order-id">{order.id}</td>
                    <td>{order.customer}</td>
                    <td>{order.category}</td>
                    <td className="sales-value">{currency(order.sales)}</td>
                    <td>
                      <span
                        className={`order-status ${order.status.toLowerCase()}`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="empty-orders">
                    No orders match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="orders-pagination">
          <label>
            Rows per page
            <select
              value={rowsPerPage}
              onChange={(event) => {
                setRowsPerPage(Number(event.target.value))
                setCurrentPage(1)
              }}
            >
              {[5, 10, 25, 50].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </label>

          <div className="pagination-buttons">
            <button
              disabled={safePage <= 1}
              onClick={() => setCurrentPage((page) => page - 1)}
            >
              Previous
            </button>

            <span>
              Page {safePage} of {totalPages}
            </span>

            <button
              disabled={safePage >= totalPages}
              onClick={() => setCurrentPage((page) => page + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </section>

      <p className="demo-note">
        Overview charts and recent orders currently use illustrative demo data.
        Connect the PostgreSQL-backed API to display live results.
      </p>
    </div>
  )
}

export default Overview
