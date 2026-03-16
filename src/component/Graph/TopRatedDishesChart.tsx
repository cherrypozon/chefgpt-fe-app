'use client'

import { Star } from 'lucide-react'
import type { TopDishItem } from '../../type/model'

interface TopRatedDishesChartProps {
  data: TopDishItem[]
}

const TopRatedDishesChart = ({ data }: TopRatedDishesChartProps) => {
  return (
    <div className="p-5 border border-borderGrey bg-cards transition-all duration-300 hover:shadow-lg hover:shadow-corePurple/10 hover:-translate-y-1">
      <h3 className="text-base font-bold text-text mb-0.5">Top Rated Dishes</h3>
      <p className="text-xs text-darkGrey mb-5">Last 7 days · Guest feedback</p>
      <div className="space-y-3">
        {data.map((dish, i) => (
          <div key={i} className="flex items-center justify-between gap-3">
            <span className="text-xs font-medium text-text w-16 shrink-0">{dish.name}</span>
            <div className="flex-1 h-1 bg-background relative">
              <div
                className="absolute top-0 left-0 h-full"
                style={{
                  width: `${(dish.rating / 5) * 100}%`,
                  backgroundColor: dish.color,
                }}
              />
            </div>
            <div
              className="flex items-center gap-1 w-12 justify-end text-xs font-mono shrink-0"
              style={{ color: dish.color }}
            >
              <Star size={10} fill="currentColor" />
              {dish.rating}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TopRatedDishesChart
