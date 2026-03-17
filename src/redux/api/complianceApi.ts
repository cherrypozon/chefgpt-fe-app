import type { ComplianceStat, SafetyCheck, SafetyTask, LogCheckRequest } from '../types'
import complianceData from '../../mock-data/compliance.json'

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const complianceApi = {
  getStats: async (): Promise<{ success: boolean; data: ComplianceStat[] }> => {
    await delay(300)
    return {
      success: true,
      data: complianceData.stats as ComplianceStat[],
    }
  },

  getSafetyChecks: async (): Promise<{ success: boolean; data: SafetyCheck[] }> => {
    await delay(400)
    return {
      success: true,
      data: complianceData.safetyChecks as SafetyCheck[],
    }
  },

  getSafetyTasks: async (): Promise<{ success: boolean; data: SafetyTask[] }> => {
    await delay(300)
    return {
      success: true,
      data: complianceData.safetyTasks as SafetyTask[],
    }
  },

  logCheck: async (request: LogCheckRequest): Promise<{ success: boolean; data: SafetyCheck }> => {
    await delay(800)

    const newCheck: SafetyCheck = {
      id: Date.now(),
      taskId: request.taskId,
      task: request.taskName,
      desc: '',
      date: new Date().toLocaleString('en-US', { 
        month: 'short', 
        day: '2-digit', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      status: request.status,
      checkedBy: request.checkedBy,
    }

    return {
      success: true,
      data: newCheck,
    }
  },

  generateReport: async (
    _dateRange: string, 
    reportType: string
  ): Promise<{ success: boolean; data: { reportId: string; fileUrl: string; generatedAt: string } }> => {
    await delay(2000) // Simulate report generation

    return {
      success: true,
      data: {
        reportId: `rpt-${Date.now()}`,
        fileUrl: `https://storage.example.com/reports/${reportType}_${Date.now()}.pdf`,
        generatedAt: new Date().toISOString(),
      },
    }
  },

  getReportTypes: async () => {
    await delay(200)
    return {
      success: true,
      data: complianceData.reportTypes,
    }
  },

  getDateRanges: async () => {
    await delay(200)
    return {
      success: true,
      data: complianceData.dateRanges,
    }
  },
}
