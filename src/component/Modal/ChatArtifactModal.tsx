'use client'

import { FileText, Copy, Download, X } from 'lucide-react'
import type { ChatArtifactModalProps } from '../../type/model'

const ChatArtifactModal = ({ artifact, onClose }: ChatArtifactModalProps) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(artifact.text)
  }

  const handleDownload = () => {
    const a = document.createElement('a')
    a.href = URL.createObjectURL(new Blob([artifact.text], { type: 'text/plain' }))
    a.download = `${artifact.title.replace(/\s+/g, '_').toLowerCase()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  return (
    <div className="flex-1 flex flex-col h-full max-w-2xl bg-cards animate-in fade-in duration-200">
      <div className="flex items-center justify-between p-4 border-b border-borderGrey shrink-0">
        <div className="flex items-center gap-3">
          <FileText size={18} className="text-corePurple" />
          <h3 className="font-semibold text-sm text-text">{artifact.title}</h3>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={handleCopy} className="p-2 hover:bg-background transition-colors text-darkGrey" title="Copy">
            <Copy size={16} />
          </button>
          <button onClick={handleDownload} className="p-2 hover:bg-background transition-colors text-darkGrey" title="Download">
            <Download size={16} />
          </button>
          <button onClick={onClose} className="p-2 hover:bg-background transition-colors text-darkGrey" title="Close">
            <X size={16} />
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-8">
        <div className="whitespace-pre-wrap leading-relaxed text-[15px] text-text">
          {artifact.text}
        </div>
      </div>
    </div>
  )
}

export default ChatArtifactModal
