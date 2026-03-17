'use client'

import { useRef, useEffect } from 'react'
import { Square, FileText, ChevronRight, Send, Mic, Paperclip, ChevronDown, X, ImageIcon, AlertTriangle } from 'lucide-react'
import ChatArtifactModal from '../Modal/ChatArtifactModal'
import Header from '../Header/main'
import LiveContextFeed from '../Modal/LiveEventModal'
import {
  useAppDispatch,
  useAppSelector,
  chatThunks,
  setInput,
  setModelOpen,
  setSelectedModel,
  addAttachedFiles,
  removeAttachedFile,
  clearAttachedFiles,
  toggleRecording,
  setActiveArtifact,
  clearActiveArtifact,
} from '../../redux'
import type { RootState } from '../../redux/store'

// Static UI config (shortcuts and context tags)
const SHORTCUTS = [
  { icon: FileText,      text: "Optimize tonight's menu" },
  { icon: AlertTriangle, text: 'Fix high-waste dishes', iconClassName: 'text-green-500' },
  { icon: FileText,      text: 'Generate PO'             },
  { icon: FileText,      text: 'Event-based suggestions' },
]

const CONTEXT_TAGS = [
  { icon: '🗓️', text: 'Nearby Events (3 days)' },
  { icon: '⭐', text: 'Recent Dish Feedback'    },
  { icon: '👥', text: "Today's Guest Mix"        },
]

const FilePill = ({ name, onRemove }: { name: string; onRemove: () => void }) => (
  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-background border border-borderGrey text-xs text-darkGrey font-mono max-w-[160px]">
    <ImageIcon size={11} className="shrink-0 text-corePurple" />
    <span className="truncate">{name}</span>
    <button onClick={onRemove} className="shrink-0 hover:text-text transition-colors ml-0.5">
      <X size={10} />
    </button>
  </div>
)

const Conversation = () => {
  const dispatch = useAppDispatch()
  
  // Redux state
  const messages = useAppSelector((state: RootState) => state.chat.messages)
  const isTyping = useAppSelector((state: RootState) => state.chat.isTyping)
  const selectedModel = useAppSelector((state: RootState) => state.chat.selectedModel)
  const models = useAppSelector((state: RootState) => state.chat.models)
  const activeChatId = useAppSelector((state: RootState) => state.chat.activeChatId)
  const input = useAppSelector((state: RootState) => state.ui.input)
  const modelOpen = useAppSelector((state: RootState) => state.ui.modelOpen)
  const attachedFiles = useAppSelector((state: RootState) => state.ui.attachedFiles)
  const isRecording = useAppSelector((state: RootState) => state.ui.isRecording)
  const activeArtifact = useAppSelector((state: RootState) => state.ui.activeArtifact)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const modelRef = useRef<HTMLDivElement>(null)

  // Fetch messages when chat changes
  useEffect(() => {
    dispatch(chatThunks.fetchMessages(activeChatId))
    dispatch(clearActiveArtifact())
  }, [activeChatId, dispatch])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (modelRef.current && !modelRef.current.contains(e.target as Node)) {
        dispatch(setModelOpen(false))
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [dispatch])

  const handleSend = (text: string) => {
    if (!text.trim()) return
    
    dispatch(chatThunks.sendMessage({
      chatId: activeChatId,
      text,
      modelId: selectedModel?.id || 'orchestrator',
      attachedFiles,
    }))
    
    dispatch(setInput(''))
    dispatch(clearAttachedFiles())
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []).map(f => f.name)
    dispatch(addAttachedFiles(files))
    e.target.value = ''
  }

  return (
    <div className="flex flex-col h-full w-full bg-background">

      <Header
        title="Agentic Chat"
        subtitle="ORCHESTRATOR → SPECIALIST AGENTS"
        badges={[
          { text: '5 Context Sources Active', variant: 'success' },
          { text: 'High Waste: 2 Dishes',     variant: 'warning' },
        ]}
        showDate
      />

      <div className="flex-1 overflow-hidden flex w-full">

        {/*Chat column (70%)*/}
        <div className="flex flex-col overflow-hidden w-[70%] border-r border-borderGrey">

          <div className="flex-1 overflow-y-auto p-6 pr-8 space-y-8 pb-32 scrollbar">

            <div className="flex justify-center my-4">
              <div className="px-4 py-1 text-xs font-mono border border-borderGrey bg-cards text-darkGrey">
                Session started · 5 agents online · Context loaded from 6 sources
              </div>
            </div>

            {messages.map((msg, idx: number) => (
              <div key={msg.id} className="flex flex-col">

                {msg.sender === 'ai' && (
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-7 h-7 flex items-center justify-center text-white ${idx === 0 ? 'bg-darkPurple' : 'bg-corePurple'}`}>
                      <Square size={12} className="fill-current" />
                    </div>
                    <span className="text-xs font-semibold text-text">
                      {idx === 0 ? 'ChefGPT Orchestrator' : 'Waste Analyst + Menu Planner'}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 font-mono bg-cards text-darkGrey">
                      {idx === 0 ? 'ORCHESTRATOR' : 'SPECIALIST'}
                    </span>
                    <span className="text-[10px] text-darkGrey font-mono">09:00</span>
                  </div>
                )}

                {msg.sender === 'user' && (
                  <div className="flex items-center justify-end gap-3 mb-2">
                    <span className="text-[10px] text-darkGrey font-mono">09:03</span>
                    <span className="text-xs font-semibold text-text">Executive Chef</span>
                    <div className="w-7 h-7 bg-black text-white flex items-center justify-center font-mono text-[10px] border border-borderGrey">
                      EC
                    </div>
                  </div>
                )}

                <div className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={[
                    'p-4 max-w-[85%] shadow-sm',
                    msg.sender === 'user'
                      ? 'bg-corePurple text-white'
                      : 'bg-cards text-text border border-borderGrey',
                  ].join(' ')}>

                    {msg.isArtifact ? (
                      <div
                        className="p-3 border border-corePurple bg-background cursor-pointer hover:opacity-90 transition-opacity flex items-center justify-between"
                        onClick={() => dispatch(setActiveArtifact({ id: msg.id, text: msg.text, title: msg.artifactTitle ?? '' }))}
                      >
                        <div className="flex items-center gap-3">
                          <FileText size={18} className="text-corePurple" />
                          <div>
                            <p className="font-semibold text-xs text-text">{msg.artifactTitle}</p>
                            <p className="text-[10px] text-darkGrey">Click to view document</p>
                          </div>
                        </div>
                        <ChevronRight size={14} className="text-darkGrey" />
                      </div>
                    ) : (
                      <div className="whitespace-pre-wrap leading-relaxed text-[13px]">{msg.text}</div>
                    )}

                    {msg.sender === 'ai' && idx === 0 && (
                      <div className="mt-5 flex flex-wrap gap-2">
                        {SHORTCUTS.map((s, i) => {
                          const Icon = s.icon
                          return (
                            <button
                              key={i}
                              onClick={() => handleSend(s.text)}
                              className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium border border-corePurple text-[#C2A3FF] hover:bg-white/5 transition-colors"
                            >
                              <Icon size={12} className={s.iconClassName} /> {s.text}
                            </button>
                          )
                        })}
                      </div>
                    )}
                  </div>
                </div>

              </div>
            ))}

            {isTyping && (
              <div className="flex flex-col">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 flex items-center justify-center text-white bg-corePurple">
                    <Square size={14} className="fill-current" />
                  </div>
                  <span className="text-sm font-semibold text-text">ChefGPT</span>
                </div>
                <div className="p-5 max-w-[85%] border border-borderGrey bg-cards w-24 flex items-center justify-center gap-1.5">
                  {[0, 1, 2].map(i => (
                    <span key={i} className="w-1.5 h-1.5 bg-corePurple rounded-full animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/*Input area*/}
          <div className="px-6 pb-6 pt-4 bg-background shrink-0">

            {/* Context tags — only when artifact is open */}
            {activeArtifact && (
              <div className="flex flex-wrap gap-2 mb-3">
                {CONTEXT_TAGS.map((tag, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono border bg-cards text-darkGrey border-borderGrey"
                  >
                    <span>{tag.icon}</span>
                    {tag.text}
                  </div>
                ))}
              </div>
            )}

            {/*Chat box */}
            <div className="border border-borderGrey bg-cards rounded-2xl overflow-visible focus-within:ring-1 focus-within:ring-corePurple transition-all">

              {/* Attached files */}
              {attachedFiles.length > 0 && (
                <div className="flex flex-wrap gap-2 px-4 pt-3">
                  {attachedFiles.map(name => (
                    <FilePill key={name} name={name} onRemove={() => dispatch(removeAttachedFile(name))} />
                  ))}
                </div>
              )}

              {/* Textarea */}
              <textarea
                rows={3}
                value={input}
                onChange={e => dispatch(setInput(e.target.value))}
                onKeyDown={e => {
                  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(input) }
                }}
                placeholder="Ask ChefGPT anything — menu planning, waste reduction, procurement..."
                className="w-full px-4 pt-3 pb-1 bg-transparent text-text placeholder:text-darkGrey placeholder:text-sm text-[13px] focus:outline-none resize-none leading-relaxed"
              />

              {/* Toolbar */}
              <div className="flex items-center justify-between px-3 py-2.5 border-t border-borderGrey">

                {/* Left — model + attach */}
                <div className="flex items-center gap-1">

                  {/* Model selector */}
                  <div className="relative" ref={modelRef}>
                    <button
                      onClick={() => dispatch(setModelOpen(!modelOpen))}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-mono text-darkGrey hover:text-text hover:bg-background border border-transparent hover:border-borderGrey transition-all rounded"
                    >
                      <Square size={9} className="fill-corePurple text-corePurple shrink-0" />
                      {selectedModel?.label || 'Select Model'}
                      <ChevronDown size={11} className={`transition-transform duration-150 ${modelOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {modelOpen && (
                      <div className="absolute bottom-full left-0 mb-2 w-52 bg-cards border border-borderGrey shadow-2xl z-50">
                        <p className="text-[10px] font-medium uppercase tracking-widest text-darkGrey px-3 pt-3 pb-1.5">
                          Select Model
                        </p>
                        {models.map(model => (
                          <button
                            key={model.id}
                            onClick={() => { dispatch(setSelectedModel(model)); dispatch(setModelOpen(false)) }}
                            className={[
                              'w-full flex items-start gap-2.5 px-3 py-2.5 text-left transition-colors',
                              selectedModel?.id === model.id
                                ? 'bg-corePurple/10 text-corePurple'
                                : 'hover:bg-background text-text',
                            ].join(' ')}
                          >
                            <Square
                              size={9}
                              className={`mt-1 shrink-0 ${selectedModel?.id === model.id ? 'fill-corePurple text-corePurple' : 'fill-darkGrey text-darkGrey'}`}
                            />
                            <div>
                              <p className="text-[12px] font-semibold leading-none">{model.label}</p>
                              <p className="text-[10px] text-darkGrey mt-0.5">{model.desc}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Divider */}
                  <div className="w-px h-4 bg-borderGrey mx-1" />

                  {/* Attach */}
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="p-1.5 text-darkGrey hover:text-text transition-colors rounded"
                    title="Attach file"
                  >
                    <Paperclip size={14} />
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.csv,.xlsx,.png,.jpg,.jpeg"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>

                {/* Right — voice + send */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => dispatch(toggleRecording())}
                    title="Voice mode"
                    className={[
                      'p-1.5 transition-colors rounded',
                      isRecording
                        ? 'text-red-400 bg-red-500/10 animate-pulse'
                        : 'text-darkGrey hover:text-text hover:bg-background',
                    ].join(' ')}
                  >
                    <Mic size={14} />
                  </button>

                  <button
                    onClick={() => handleSend(input)}
                    disabled={!input.trim() && attachedFiles.length === 0}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-semibold bg-corePurple text-white rounded disabled:opacity-40 disabled:cursor-not-allowed hover:bg-darkPurple transition-colors"
                  >
                    <Send size={11} />
                    Send
                  </button>
                </div>
              </div>
            </div>

            {/* Hint */}
            <p className="text-[11px] text-darkGrey mt-2 text-center font-mono font-semibold">
              Enter to send · Shift+Enter for new line · {selectedModel?.label || 'Orchestrator'} active
            </p>
          </div>
        </div>

        {/* ── Right panel (30%) ── */}
        <div className="w-[30%] overflow-hidden">
          {activeArtifact ? (
            <ChatArtifactModal
              artifact={activeArtifact}
              onClose={() => dispatch(clearActiveArtifact())}
            />
          ) : (
            <LiveContextFeed />
          )}
        </div>

      </div>
    </div>
  )
}

export default Conversation