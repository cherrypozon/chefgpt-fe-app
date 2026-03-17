import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import chatReducer from './slices/chatSlice'
import dashboardReducer from './slices/dashboardSlice'
import knowledgeReducer from './slices/knowledgeSlice'
import complianceReducer from './slices/complianceSlice'
import contextFeedReducer from './slices/contextFeedSlice'
import uiReducer from './slices/uiSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    dashboard: dashboardReducer,
    knowledge: knowledgeReducer,
    compliance: complianceReducer,
    contextFeed: contextFeedReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
