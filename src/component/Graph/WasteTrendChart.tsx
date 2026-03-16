'use client'

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import type { WasteTrendItem } from '../../type/model'
import { TOOLTIP_STYLE, TOOLTIP_LABEL_STYLE, TOOLTIP_ITEM_STYLE } from '../../helper/constant'

interface WasteTrendChartProps {
  data: WasteTrendItem[]
}

const WasteTrendChart = ({ data }: WasteTrendChartProps) => {
  return (
    <div className="p-5 border border-borderGrey bg-cards transition-all duration-300 hover:shadow-lg hover:shadow-corePurple/10 hover:-translate-y-1">
      <h3 className="text-base font-bold text-text mb-0.5">Waste Rate<br/>Trend</h3>
      <p className="text-xs text-darkGrey mb-5">Weekly average %</p>
      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 5, right: 0, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="wasteGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#D97706" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#D97706" stopOpacity={0}   />
              </linearGradient>
            </defs>
            <XAxis dataKey="week" hide />
            <YAxis hide domain={[20, 40]} />
            <Tooltip
              contentStyle={TOOLTIP_STYLE}
              labelStyle={TOOLTIP_LABEL_STYLE}
              itemStyle={TOOLTIP_ITEM_STYLE}
            />
            <Area
              type="monotone"
              dataKey="rate"
              stroke="#D97706"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#wasteGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default WasteTrendChart
