import type { Message } from '../type/model'

let messageIdCounter = 0

/**
 * Generates a unique ID for messages
 */
export const generateMessageId = (): number => {
  messageIdCounter += 1
  return Date.now() + messageIdCounter
}

/**
 * Creates a user message object
 */
export const createUserMessage = (text: string): Message => ({
  id: generateMessageId(),
  sender: 'user',
  text,
  isArtifact: false,
})

/**
 * Creates an AI message object
 */
export const createAiMessage = (text: string, isArtifact: boolean = false, title?: string): Message => ({
  id: generateMessageId(),
  sender: 'ai',
  text,
  isArtifact,
  title,
})
