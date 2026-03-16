'use client'

import {
  BarChart, Bar, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts'
import type { WasteDataItem } from '../../type/model'
import { TOOLTIP_STYLE, TOOLTIP_LABEL_STYLE, TOOLTIP_ITEM_STYLE } from '../../helper/constant'

interface FoodWasteChartProps {
  data: WasteDataItem[]
}

const FoodWasteChart = ({ data }: FoodWasteChartProps) => {
  return (
    <div className="p-5 border border-borderGrey bg-cards transition-all duration-300 hover:shadow-lg hover:shadow-corePurple/10 hover:-translate-y-1">
      <h3 className="text-base font-bold text-text mb-0.5">Food Waste by Dish</h3>
      <p className="text-xs text-darkGrey mb-5">
        Last 30 days · Percentage of prepared quantity wasted
      </p>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: -20, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="var(--border-grey)"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: 'var(--dark-grey)' }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: 'var(--dark-grey)' }}
              tickFormatter={v => `${v}%`}
            />
            <Tooltip
              cursor={{ fill: 'var(--background)' }}
              contentStyle={TOOLTIP_STYLE}
              labelStyle={TOOLTIP_LABEL_STYLE}
              itemStyle={TOOLTIP_ITEM_STYLE}
            />
            <Bar dataKey="value" barSize={30}>
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default FoodWasteChart
