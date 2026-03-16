'use client'

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import type { DemographicItem } from '../../type/model'
import { TOOLTIP_STYLE, TOOLTIP_LABEL_STYLE, TOOLTIP_ITEM_STYLE } from '../../helper/constant'

interface GuestNationalityChartProps {
  data: DemographicItem[]
  totalCovers: number
}

const GuestNationalityChart = ({ data, totalCovers }: GuestNationalityChartProps) => {
  return (
    <div className="p-5 border border-borderGrey bg-cards transition-all duration-300 hover:shadow-lg hover:shadow-corePurple/10 hover:-translate-y-1">
      <h3 className="text-base font-bold text-text mb-0.5">Guest Nationality Mix</h3>
      <p className="text-xs text-darkGrey mb-5">
        Today's bookings · F&B preference context
      </p>
      <div className="flex items-center justify-center h-64">

        {/* Donut */}
        <div className="w-1/2 h-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%" cy="50%"
                innerRadius={60} outerRadius={90}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, i) => (
                  <Cell key={i} fill={entry.color} stroke="none" />
                ))}
              </Pie>
              <Tooltip
                contentStyle={TOOLTIP_STYLE}
                labelStyle={TOOLTIP_LABEL_STYLE}
                itemStyle={TOOLTIP_ITEM_STYLE}
              />
            </PieChart>
          </ResponsiveContainer>
          {/* Center label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-xl font-bold text-text">{totalCovers}</span>
            <span className="text-[10px] text-darkGrey">covers</span>
          </div>
        </div>

        {/* Legend */}
        <div className="w-1/2 pl-8 space-y-3">
          {data.map((d, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 shrink-0" style={{ backgroundColor: d.color }} />
              <div>
                <p className="text-xs font-medium text-text">{d.name}</p>
                <p className="text-[10px] text-darkGrey">{d.value}%</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default GuestNationalityChart
