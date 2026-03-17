'use client'

import { useEffect } from 'react'
import { FileText, Upload, Check, AlertTriangle, X } from 'lucide-react'
import MainModal from '../Modal/MainModal'
import Header from '../Header/main'
import {
  useAppDispatch,
  useAppSelector,
  setActiveModal,
  closeModal,
  setSelectedCheck,
  complianceThunks,
} from '../../redux'
import type { RootState, SafetyCheck } from '../../redux'

// Status config for icons and colors
const STATUS_CONFIG: Record<SafetyCheck['status'], { textColor: string; bgColor: string; Icon: React.ComponentType<{ size?: number }> }> = {
  pass:    { textColor: 'text-emerald-400', bgColor: 'bg-emerald-500/10', Icon: Check         },
  warning: { textColor: 'text-amber-400',   bgColor: 'bg-amber-500/10',   Icon: AlertTriangle },
  fail:    { textColor: 'text-red-400',     bgColor: 'bg-red-500/10',     Icon: X             },
}

const Compliance = () => {
  const dispatch = useAppDispatch()
  const activeModal = useAppSelector((state: RootState) => state.ui.activeModal)
  const selectedCheck = useAppSelector((state: RootState) => state.compliance.selectedCheck)
  const stats = useAppSelector((state: RootState) => state.compliance.stats)
  const safetyChecks = useAppSelector((state: RootState) => state.compliance.safetyChecks)
  const reportTypes = useAppSelector((state: RootState) => state.compliance.reportTypes)
  const dateRanges = useAppSelector((state: RootState) => state.compliance.dateRanges)

  // Fetch data on mount
  useEffect(() => {
    dispatch(complianceThunks.fetchStats())
    dispatch(complianceThunks.fetchSafetyChecks())
    dispatch(complianceThunks.fetchReportTypes())
    dispatch(complianceThunks.fetchDateRanges())
  }, [dispatch])

  return (
    <div className="flex flex-col h-full w-full bg-background">

      <Header
        title="Compliance & Safety"
        subtitle="INSPECTION CHECKPOINTS"
        rightContent={
          <button
            onClick={() => dispatch(setActiveModal('report'))}
            className="px-6 py-3 flex items-center gap-2 font-semibold text-white bg-corePurple hover:opacity-90 transition-opacity"
          >
            <FileText size={18} />
            Generate Report
          </button>
        }
      />

      {/* ── Stat cards (fixed) ── */}
      <div className="p-6 pb-0 max-w-7xl mx-auto w-full shrink-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className={`p-5 border ${stat.bgColor} ${stat.borderColor}`}>
              <p className={`text-[10px] font-semibold uppercase tracking-widest mb-1.5 ${stat.textColor}`}>
                {stat.label}
              </p>
              <p className={`text-3xl font-bold ${stat.textColor}`}>{stat.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Section title (fixed) ── */}
      <div className="px-6 pt-6 pb-0 max-w-7xl mx-auto w-full shrink-0 mb-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-text">Recent Checks</h3>
          <button
            onClick={() => dispatch(setActiveModal('history'))}
            className="text-xs font-semibold text-corePurple hover:underline"
          >
            View All History
          </button>
        </div>
      </div>

      {/* ── Scrollable Content (Check rows) ── */}
      <div className="flex-1 overflow-y-auto scrollbar">
        <div className="p-6 pt-4 max-w-7xl mx-auto w-full">

          {/* ── Check rows ── */}
          <div className="space-y-4">
          {safetyChecks.map(check => {
            const { textColor, bgColor, Icon } = STATUS_CONFIG[check.status]
            return (
              <div
                key={check.id}
                className="flex flex-col md:flex-row md:items-center justify-between p-5 border border-borderGrey bg-cards hover:border-corePurple transition-all"
              >
                <div className="flex items-start gap-3 mb-4 md:mb-0">
                  <div className={`w-10 h-10 flex items-center justify-center shrink-0 ${bgColor} ${textColor}`}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-text">{check.task}</h4>
                    <p className="text-[10px] mt-1 text-darkGrey">{check.desc}</p>
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      <span className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider bg-background text-darkGrey">
                        Last checked: {check.date}
                      </span>
                      {check.status !== 'pass' && (
                        <span className={`px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider ${bgColor} ${textColor}`}>
                          Requires Action
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => { dispatch(setSelectedCheck(check)); dispatch(setActiveModal('log')) }}
                  className="px-5 py-2.5 text-xs font-semibold border border-borderGrey bg-background text-text hover:bg-cards transition-colors self-start md:self-center shrink-0"
                >
                  Log Check
                </button>
              </div>
            )
          })}
        </div>
        </div>
      </div>

      {/* ── Generate Report Modal ── */}
      <MainModal
        isOpen={activeModal === 'report'}
        onClose={() => dispatch(closeModal())}
        title="Generate Compliance Report"
      >
        <div className="space-y-6">
          <p className="text-sm text-darkGrey">Select the parameters for your compliance report.</p>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-darkGrey">
                Date Range
              </label>
              <select className="w-full p-3 border border-borderGrey bg-background text-text focus:outline-none focus:ring-1 focus:ring-corePurple">
                {dateRanges.map(range => (
                  <option key={range.id} value={range.id}>{range.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-darkGrey">
                Report Type
              </label>
              <select className="w-full p-3 border border-borderGrey bg-background text-text focus:outline-none focus:ring-1 focus:ring-corePurple">
                {reportTypes.map(type => (
                  <option key={type.id} value={type.id}>{type.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-6 border-t border-borderGrey">
            <button
              onClick={() => dispatch(closeModal())}
              className="px-6 py-2 border border-borderGrey text-sm font-medium text-text hover:bg-background transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => dispatch(closeModal())}
              className="px-6 py-2 text-sm font-medium bg-corePurple text-white hover:opacity-90 transition-opacity"
            >
              Generate & Download
            </button>
          </div>
        </div>
      </MainModal>

      {/* ── View All History Modal ── */}
      <MainModal
        isOpen={activeModal === 'history'}
        onClose={() => dispatch(closeModal())}
        title="Compliance History"
      >
        <div className="space-y-4">
          <div className="flex gap-4 mb-4">
            <input
              type="text"
              placeholder="Search logs..."
              className="flex-1 p-3 border border-borderGrey bg-background text-text placeholder:text-darkGrey focus:outline-none focus:ring-1 focus:ring-corePurple"
            />
            <button className="px-4 py-2 border border-borderGrey text-sm font-medium text-text bg-background hover:bg-cards transition-colors">
              Filter
            </button>
          </div>

          <div className="space-y-2">
            {[...safetyChecks, ...safetyChecks].map((check, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 border border-borderGrey bg-background"
              >
                <div>
                  <h4 className="font-medium text-sm text-text">{check.task}</h4>
                  <p className="text-xs mt-1 text-darkGrey">{check.date} · Logged by {check.checkedBy}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-mono uppercase tracking-wider ${STATUS_CONFIG[check.status].bgColor} ${STATUS_CONFIG[check.status].textColor}`}>
                  {check.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </MainModal>

      {/* ── Log Check Modal ── */}
      <MainModal
        isOpen={activeModal === 'log'}
        onClose={() => { dispatch(closeModal()); dispatch(setSelectedCheck(null)) }}
        title={`Log Check: ${selectedCheck?.task ?? 'New Entry'}`}
      >
        <div className="space-y-6">
          <div className="p-4 border border-corePurple bg-corePurple/10">
            <p className="text-sm text-text">{selectedCheck?.desc}</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-darkGrey">
                Status
              </label>
              <div className="flex gap-6">
                {(['pass', 'warning', 'fail'] as const).map(s => (
                  <label key={s} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value={s}
                      defaultChecked={s === 'pass'}
                      className="accent-corePurple"
                    />
                    <span className="text-text capitalize">{s}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-darkGrey">
                Notes / Corrective Action
              </label>
              <textarea
                className="w-full p-3 border border-borderGrey bg-background text-text placeholder:text-darkGrey focus:outline-none focus:ring-1 focus:ring-corePurple min-h-[100px]"
                placeholder="Enter details..."
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-darkGrey">
                Attach Photo (Optional)
              </label>
              <div className="w-full p-6 border border-dashed border-borderGrey bg-background flex flex-col items-center justify-center cursor-pointer hover:bg-cards transition-colors">
                <Upload size={20} className="mb-2 text-darkGrey" />
                <span className="text-xs text-darkGrey">Click to upload</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-6 border-t border-borderGrey">
            <button
              onClick={() => { dispatch(closeModal()); dispatch(setSelectedCheck(null)) }}
              className="px-6 py-2 border border-borderGrey text-sm font-medium text-text hover:bg-background transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => { dispatch(closeModal()); dispatch(setSelectedCheck(null)) }}
              className="px-6 py-2 text-sm font-medium bg-corePurple text-white hover:opacity-90 transition-opacity"
            >
              Submit Log
            </button>
          </div>
        </div>
      </MainModal>
    </div>
  )
}

export default Compliance