import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { KnowledgeState, KnowledgeDocument } from '../types'
import { knowledgeThunks } from '../thunks/knowledgeThunks'

const initialState: KnowledgeState = {
  documents: [],
  tags: [],
  selectedDocument: null,
  searchQuery: '',
  isUploading: false,
  isLoading: false,
  error: null,
}

const knowledgeSlice = createSlice({
  name: 'knowledge',
  initialState,
  reducers: {
    setSelectedDocument: (state, action: PayloadAction<KnowledgeDocument | null>) => {
      state.selectedDocument = action.payload
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
    },
    clearError: (state) => {
      state.error = null
    },
    updateDocumentStatus: (state, action: PayloadAction<{ id: string; status: KnowledgeDocument['status'] }>) => {
      const doc = state.documents.find(d => d.id === action.payload.id)
      if (doc) {
        doc.status = action.payload.status
        doc.isIndexed = action.payload.status === 'ready'
      }
    },
  },
  extraReducers: (builder) => {
    // Fetch Documents
    builder
      .addCase(knowledgeThunks.fetchDocuments.pending, (state) => {
        state.isLoading = true
      })
      .addCase(knowledgeThunks.fetchDocuments.fulfilled, (state, action) => {
        state.isLoading = false
        state.documents = action.payload.data
      })
      .addCase(knowledgeThunks.fetchDocuments.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })

    // Fetch Tags
    builder
      .addCase(knowledgeThunks.fetchTags.fulfilled, (state, action) => {
        state.tags = action.payload.data
      })

    // Upload Document
    builder
      .addCase(knowledgeThunks.uploadDocument.pending, (state) => {
        state.isUploading = true
      })
      .addCase(knowledgeThunks.uploadDocument.fulfilled, (state, action) => {
        state.isUploading = false
        state.documents.unshift(action.payload.data)
      })
      .addCase(knowledgeThunks.uploadDocument.rejected, (state, action) => {
        state.isUploading = false
        state.error = action.payload as string
      })

    // Delete Document
    builder
      .addCase(knowledgeThunks.deleteDocument.fulfilled, (state, action) => {
        state.documents = state.documents.filter(d => d.id !== action.meta.arg)
        if (state.selectedDocument?.id === action.meta.arg) {
          state.selectedDocument = null
        }
      })
  },
})

export const { 
  setSelectedDocument, 
  setSearchQuery, 
  clearError,
  updateDocumentStatus 
} = knowledgeSlice.actions

export default knowledgeSlice.reducer
