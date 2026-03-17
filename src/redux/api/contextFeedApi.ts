import type { Event, DishFeedback, GuestMix, ContextSource, Alert } from '../types'
import contextFeedData from '../../mock-data/context-feed.json'

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const contextFeedApi = {
  getEvents: async (): Promise<{ success: boolean; data: Event[] }> => {
    await delay(300)
    return {
      success: true,
      data: contextFeedData.events as Event[],
    }
  },

  getDishFeedback: async (): Promise<{ success: boolean; data: DishFeedback[] }> => {
    await delay(300)
    return {
      success: true,
      data: contextFeedData.dishFeedback as DishFeedback[],
    }
  },

  getGuestMix: async (): Promise<{ success: boolean; data: GuestMix[] }> => {
    await delay(300)
    return {
      success: true,
      data: contextFeedData.guestMix as GuestMix[],
    }
  },

  getContextSources: async (): Promise<{ success: boolean; data: ContextSource[] }> => {
    await delay(300)
    return {
      success: true,
      data: contextFeedData.contextSources as ContextSource[],
    }
  },

  getAlerts: async (): Promise<{ success: boolean; data: Alert[] }> => {
    await delay(200)
    return {
      success: true,
      data: contextFeedData.alerts as Alert[],
    }
  },

  dismissAlert: async (_alertId: string): Promise<{ success: boolean }> => {
    await delay(300)
    return { success: true }
  },

  getAllContextFeed: async () => {
    await delay(500)
    return {
      success: true,
      data: {
        events: contextFeedData.events as Event[],
        dishFeedback: contextFeedData.dishFeedback as DishFeedback[],
        guestMix: contextFeedData.guestMix as GuestMix[],
        contextSources: contextFeedData.contextSources as ContextSource[],
        alerts: contextFeedData.alerts as Alert[],
      },
    }
  },
}
