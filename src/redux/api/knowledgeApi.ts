import type { KnowledgeDocument, DocumentTag } from '../types'
import knowledgeData from '../../mock-data/knowledge.json'

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const knowledgeApi = {
  getDocuments: async (): Promise<{ success: boolean; data: KnowledgeDocument[] }> => {
    await delay(500)
    return {
      success: true,
      data: knowledgeData.documents as KnowledgeDocument[],
    }
  },

  getTags: async (): Promise<{ success: boolean; data: DocumentTag[] }> => {
    await delay(200)
    return {
      success: true,
      data: knowledgeData.tags as DocumentTag[],
    }
  },

  uploadDocument: async (file: File): Promise<{ success: boolean; data: KnowledgeDocument }> => {
    await delay(2000) // Simulate upload + processing time

    const newDoc: KnowledgeDocument = {
      id: `doc-${Date.now()}`,
      name: file.name,
      fileUrl: `/uploads/${file.name}`,
      size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      fileType: file.name.split('.').pop() || 'unknown',
      uploadDate: new Date().toISOString(),
      uploadedBy: 'usr-001',
      tags: ['New', 'Uncategorized'],
      isIndexed: false,
      chunkCount: 0,
      status: 'chunking',
      date: new Date().toLocaleString('en-US', { 
        month: 'short', 
        day: '2-digit', 
        year: 'numeric'
      }),
    }

    return {
      success: true,
      data: newDoc,
    }
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  deleteDocument: async (_documentId: string): Promise<{ success: boolean; message: string }> => {
    await delay(500)
    return {
      success: true,
      message: 'Document deleted successfully',
    }
  },

  updateDocumentStatus: async (
    documentId: string, 
    status: KnowledgeDocument['status']
  ): Promise<{ success: boolean; data: { id: string; status: string } }> => {
    await delay(300)
    return {
      success: true,
      data: { id: documentId, status },
    }
  },
}
