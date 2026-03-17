import { createAsyncThunk } from '@reduxjs/toolkit'
import { knowledgeApi } from '../api/knowledgeApi'

const fetchDocuments = createAsyncThunk(
  'knowledge/fetchDocuments',
  async (_, { rejectWithValue }) => {
    try {
      return await knowledgeApi.getDocuments()
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch documents')
    }
  }
)

const fetchTags = createAsyncThunk(
  'knowledge/fetchTags',
  async (_, { rejectWithValue }) => {
    try {
      return await knowledgeApi.getTags()
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch tags')
    }
  }
)

const uploadDocument = createAsyncThunk(
  'knowledge/uploadDocument',
  async (file: File, { rejectWithValue }) => {
    try {
      return await knowledgeApi.uploadDocument(file)
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to upload document')
    }
  }
)

const deleteDocument = createAsyncThunk(
  'knowledge/deleteDocument',
  async (documentId: string, { rejectWithValue }) => {
    try {
      return await knowledgeApi.deleteDocument(documentId)
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to delete document')
    }
  }
)

export const knowledgeThunks = { fetchDocuments, fetchTags, uploadDocument, deleteDocument }
