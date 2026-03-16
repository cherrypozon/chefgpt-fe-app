'use client'

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import type { CoversDataItem } from '../../type/model'
import { TOOLTIP_STYLE, TOOLTIP_LABEL_STYLE, TOOLTIP_ITEM_STYLE } from '../../helper/constant'

interface DailyCoversChartProps {
  data: CoversDataItem[]
}

const DailyCoversChart = ({ data }: DailyCoversChartProps) => {
  return (
    <div className="p-5 border border-borderGrey bg-cards transition-all duration-300 hover:shadow-lg hover:shadow-corePurple/10 hover:-translate-y-1">
      <h3 className="text-base font-bold text-text mb-0.5">Daily Covers<br/>— 2 Weeks</h3>
      <p className="text-xs text-darkGrey mb-5">Actual vs Forecasted</p>
      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 5, right: 0, left: -20, bottom: 0 }}
          >
            <XAxis dataKey="day" hide />
            <YAxis hide />
            <Tooltip
              contentStyle={TOOLTIP_STYLE}
              labelStyle={TOOLTIP_LABEL_STYLE}
              itemStyle={TOOLTIP_ITEM_STYLE}
            />
            <Area
              type="monotone"
              dataKey="actual"
              stroke="#A100FF"
              strokeWidth={2}
              fill="none"
            />
            <Area
              type="monotone"
              dataKey="forecast"
              stroke="#4B5563"
              strokeDasharray="5 5"
              strokeWidth={2}
              fill="none"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="flex gap-5 mt-3 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-0.5 bg-corePurple" />
          <span className="text-darkGrey">Actual</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-0 border-t-2 border-dashed border-gray-600" />
          <span className="text-darkGrey">Forecast</span>
        </div>
      </div>
    </div>
  )
}

export default DailyCoversChart
