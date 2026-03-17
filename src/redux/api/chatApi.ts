import type { ChatGroup, Message, SendMessageRequest, SendMessageResponse, AgentResponse } from '../types'
import chatData from '../../mock-data/chats.json'

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const chatApi = {
  getChatHistory: async (): Promise<{ success: boolean; data: ChatGroup[] }> => {
    await delay(500)
    return {
      success: true,
      data: chatData.chatHistory as ChatGroup[],
    }
  },

  getMessages: async (chatId: string): Promise<{ success: boolean; data: Message[] }> => {
    await delay(300)
    const messages = chatData.messages[chatId as keyof typeof chatData.messages] || []
    return {
      success: true,
      data: messages as Message[],
    }
  },

  sendMessage: async (request: SendMessageRequest): Promise<SendMessageResponse> => {
    await delay(1500) // Simulate AI processing time

    const text = request.text.toLowerCase()
    let agentResponse: AgentResponse

    if (text.includes('optimize') || text.includes('menu') || text.includes('waste') || text.includes('fix')) {
      agentResponse = chatData.agentResponses.optimize_menu as AgentResponse
    } else if (text.includes('po') || text.includes('generate') || text.includes('purchase')) {
      agentResponse = chatData.agentResponses.generate_po as AgentResponse
    } else {
      agentResponse = chatData.agentResponses.default as AgentResponse
    }

    const userMessage: Message = {
      id: Date.now(),
      sender: 'user',
      text: request.text,
      isArtifact: false,
      timestamp: new Date().toISOString(),
    }

    const aiMessage: Message = {
      id: Date.now() + 1,
      sender: 'ai',
      text: agentResponse.text,
      isArtifact: agentResponse.isArtifact,
      artifactTitle: agentResponse.artifactTitle,
      agentType: agentResponse.agentType,
      timestamp: new Date().toISOString(),
    }

    return {
      success: true,
      data: {
        userMessage,
        aiMessage,
      },
    }
  },

  getModels: async () => {
    await delay(200)
    return {
      success: true,
      data: chatData.models,
    }
  },

  getShortcuts: async () => {
    await delay(200)
    return {
      success: true,
      data: chatData.shortcuts,
    }
  },
}
