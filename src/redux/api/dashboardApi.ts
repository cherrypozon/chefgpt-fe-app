import type { 
  StatItem, 
  WasteDataItem, 
  DemographicsData, 
  CoversDataItem, 
  WasteTrendItem, 
  TopDishItem 
} from '../types'
import dashboardData from '../../mock-data/dashboard.json'

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const dashboardApi = {
  getStats: async (): Promise<{ success: boolean; data: StatItem[] }> => {
    await delay(400)
    return {
      success: true,
      data: dashboardData.stats as StatItem[],
    }
  },

  getWasteData: async (): Promise<{ success: boolean; data: WasteDataItem[] }> => {
    await delay(300)
    return {
      success: true,
      data: dashboardData.wasteData as WasteDataItem[],
    }
  },

  getDemographics: async (): Promise<{ success: boolean; data: DemographicsData }> => {
    await delay(300)
    return {
      success: true,
      data: dashboardData.demographics as DemographicsData,
    }
  },

  getCoversData: async (): Promise<{ success: boolean; data: CoversDataItem[] }> => {
    await delay(300)
    return {
      success: true,
      data: dashboardData.coversData as CoversDataItem[],
    }
  },

  getWasteTrend: async (): Promise<{ success: boolean; data: WasteTrendItem[] }> => {
    await delay(300)
    return {
      success: true,
      data: dashboardData.wasteTrend as WasteTrendItem[],
    }
  },

  getTopDishes: async (): Promise<{ success: boolean; data: TopDishItem[] }> => {
    await delay(300)
    return {
      success: true,
      data: dashboardData.topDishes as TopDishItem[],
    }
  },

  getAllDashboardData: async () => {
    await delay(600)
    return {
      success: true,
      data: {
        stats: dashboardData.stats as StatItem[],
        wasteData: dashboardData.wasteData as WasteDataItem[],
        demographics: dashboardData.demographics as DemographicsData,
        coversData: dashboardData.coversData as CoversDataItem[],
        wasteTrend: dashboardData.wasteTrend as WasteTrendItem[],
        topDishes: dashboardData.topDishes as TopDishItem[],
      },
    }
  },
}
