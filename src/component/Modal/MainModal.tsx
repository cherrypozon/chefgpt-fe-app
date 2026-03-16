import React from 'react'
import { X } from 'lucide-react'

interface MainModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

export const MainModal = ({ isOpen, onClose, title, children }: MainModalProps) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 animate-fade-up">
      <div className="w-full max-w-2xl shadow-xl flex flex-col max-h-[90vh] bg-cards border border-borderGrey">
        <div className="flex items-center justify-between p-4 border-b border-borderGrey">
          <h3 className="text-lg font-semibold text-text">{title}</h3>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-background rounded transition-colors text-darkGrey"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-6 overflow-y-auto flex-1 scrollbar">
          {children}
        </div>
      </div>
    </div>
  )
}

export default MainModal