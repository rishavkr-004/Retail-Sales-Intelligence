
import { ArrowUpRight, ArrowDownRight } from 'lucide-react'
import './KpiCard.css'

function KpiCard({
  title,
  value,
  change,
  positive,
  detail,
  icon,
  color,
}) {
  return (
    <div className="kpi-card">
      <div className="kpi-top">
        <span>{title}</span>
        <div className={`kpi-icon ${color}`}>
          {icon}
        </div>
      </div>

      <div className="kpi-value">{value}</div>

      <div className="kpi-bottom">
        <span className={`kpi-change ${positive ? 'positive' : 'negative'}`}>
          {positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {change}
        </span>
        <span>{detail}</span>
      </div>
    </div>
  )
}

export default KpiCard
