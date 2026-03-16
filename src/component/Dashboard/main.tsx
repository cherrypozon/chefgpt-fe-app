'use client'

import {
  FoodWasteChart, GuestNationalityChart, DailyCoversChart,
  WasteTrendChart, TopRatedDishesChart
} from '../Graph'
import {
  STATS, WASTE_DATA, DEMOGRAPHICS,
  COVERS_DATA, WASTE_TREND, TOP_DISHES
} from '../../helper/constant'
import Header from '../Header/main'

const Dashboard = () => {
  return (
    <div className="flex flex-col h-full w-full bg-background">

      <Header
        title="Dashboards"
        subtitle="ANALYTICS → WASTE · COVERS · DEMOGRAPHICS"
        badges={[
          { text: '5 Context Sources Active', variant: 'success' },
          { text: 'High Waste: 2 Dishes', variant: 'warning' },
        ]}
        showDate
      />

      {/* ── Scrollable Content ── */}
      <div className="flex-1 overflow-y-auto scrollbar">
        <div className="p-6 max-w-7xl mx-auto w-full space-y-6">

          {/* ── Stat cards ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map((stat, i) => (
              <div key={i} className="p-5 border border-borderGrey bg-cards relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-corePurple/10 hover:-translate-y-1 cursor-pointer">
                <p className="text-[10px] font-semibold uppercase tracking-widest mb-3 text-darkGrey">
                  {stat.label}
                </p>
                <p className="text-3xl font-bold mb-1.5 text-text">{stat.value}</p>
                <p className={`text-xs font-medium ${stat.color}`}>{stat.sub}</p>
                {/* Decorative circle */}
                <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full opacity-10 bg-text" />
              </div>
            ))}
          </div>

          {/* ── Charts row ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <FoodWasteChart data={WASTE_DATA} />
            <GuestNationalityChart data={DEMOGRAPHICS} totalCovers={340} />
          </div>

          {/* ── Bottom row ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <DailyCoversChart data={COVERS_DATA} />
            <WasteTrendChart data={WASTE_TREND} />
            <TopRatedDishesChart data={TOP_DISHES} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard