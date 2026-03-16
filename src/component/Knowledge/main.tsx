'use client'

import { useState } from 'react'
import { Upload, FileText, Trash2 } from 'lucide-react'
import MainModal from '../Modal/MainModal'
import Header from '../Header/main'
import type { KnowledgeDoc } from '../../type/model'
import { INITIAL_DOCS } from '../../helper/constant'


const Knowledge = () => {
  const [docs,        setDocs]        = useState<KnowledgeDoc[]>(INITIAL_DOCS)
  const [isDragging,  setIsDragging]  = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [selectedDoc, setSelectedDoc] = useState<KnowledgeDoc | null>(null)
  const [search,      setSearch]      = useState('')

  const simulateUpload = () => {
    setIsUploading(true)
    setTimeout(() => {
      setIsUploading(false)
      setDocs(prev => [{
        id:   Date.now(),
        name: 'New Uploaded Document.pdf',
        size: '1.2 MB',
        date: 'Just now',
        tags: ['New', 'Uncategorized'],
      }, ...prev])
    }, 2000)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    simulateUpload()
  }

  const removeDoc = (id: number) => setDocs(prev => prev.filter(d => d.id !== id))

  const filtered = docs.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex flex-col h-full w-full bg-background">

      <Header
        title="Knowledge Base"
        subtitle={`RAG SOURCES → ${docs.length} CONNECTED`}
        badges={[
          { text: `${docs.length} Context Sources Active`, variant: 'success' },
        ]}
        showDate
      />

      {/* ── Search bar (fixed) ── */}
      <div className="px-8 pt-6 pb-0 max-w-7xl mx-auto w-full shrink-0">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <h2 className="text-base font-semibold text-text">Document Library</h2>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search recipes, playbooks, data sources..."
            className="w-full md:w-80 p-2.5 border border-borderGrey rounded-xl bg-cards text-sm text-text placeholder:text-darkGrey placeholder:text-xs focus:outline-none transition-all"
          />
        </div>
      </div>

      {/* ── Drop zone (fixed) ── */}
      <div className="px-8 pt-6 pb-0 max-w-7xl mx-auto w-full shrink-0">
        <div
          className={[
            'w-full p-12 border-2 border-dashed flex flex-col items-center justify-center transition-colors',
            isDragging
              ? 'border-corePurple bg-corePurple/10'
              : 'border-borderGrey bg-cards',
          ].join(' ')}
          onDragOver={e => { e.preventDefault(); setIsDragging(true) }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
        >
          {isUploading ? (
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 mb-4 border-4 border-borderGrey border-t-corePurple rounded-full animate-spin" />
              <p className="font-mono text-sm text-corePurple">Processing document...</p>
            </div>
          ) : (
            <>
              <div className="w-14 h-14 mb-4 flex items-center justify-center bg-background border border-borderGrey">
                <Upload size={20} className="text-corePurple" />
              </div>
              <h3 className="text-sm font-semibold mb-2 text-text">
                Drop files to add to Knowledge Base
              </h3>
              <p className="text-[10px] text-center max-w-md text-darkGrey">
                Supports PDF, Excel, CSV, Word — will be chunked and vectorized automatically
              </p>
              <button
                onClick={simulateUpload}
                className="mt-5 px-5 py-1.5 border border-borderGrey text-xs font-medium text-text bg-background hover:bg-cards transition-colors"
              >
                Browse
              </button>
            </>
          )}
        </div>
      </div>

      {/* ── Indexed Documents label (fixed) ── */}
      <div className="px-8 pt-6 pb-0 max-w-7xl mx-auto w-full shrink-0 mb-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-darkGrey">
          Indexed Documents
        </p>
      </div>

      {/* ── Scrollable Content (Document grid) ── */}
      <div className="flex-1 overflow-y-auto scrollbar">
        <div className="px-8 pt-4 pb-8 max-w-7xl mx-auto w-full">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(doc => (
            <div
              key={doc.id}
              className="p-6 border border-borderGrey bg-cards transition-all relative group"
            >
              {/* Online indicator */}
              <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-green-500 border-2 border-cards" />

              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 flex items-center justify-center bg-corePurple/10 text-corePurple">
                  <FileText size={20} />
                </div>
                {/* Hover actions */}
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => setSelectedDoc(doc)}
                    className="px-2 py-1 text-[10px] font-medium text-text hover:bg-background transition-colors"
                  >
                    View
                  </button>
                  <button
                    onClick={() => removeDoc(doc.id)}
                    className="p-1 text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              <h3 className="text-sm font-semibold mb-1.5 line-clamp-2 text-text">{doc.name}</h3>

              <div className="flex items-center gap-3 text-[10px] font-mono mb-3 text-darkGrey">
                <span>{doc.size}</span>
                <span>·</span>
                <span>{doc.date}</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {doc.tags.map((tag, i) => (
                  <span key={i} className="px-3 py-1 text-xs font-mono bg-background text-darkGrey">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="col-span-full p-12 text-center border border-dashed border-borderGrey bg-cards text-darkGrey">
              No documents found.
            </div>
          )}
        </div>
        </div>
      </div>

      {/* ── Document viewer modal ── */}
      <MainModal
        isOpen={!!selectedDoc}
        onClose={() => setSelectedDoc(null)}
        title={selectedDoc?.name ?? 'Document Viewer'}
      >
        {selectedDoc && (
          <div className="space-y-6">
            <div className="flex items-center gap-4 pb-6 border-b border-borderGrey">
              <div className="w-16 h-16 flex items-center justify-center bg-corePurple/10 text-corePurple">
                <FileText size={32} />
              </div>
              <div>
                <h4 className="text-xl font-semibold text-text">{selectedDoc.name}</h4>
                <div className="flex items-center gap-3 text-sm font-mono mt-2 text-darkGrey">
                  <span>{selectedDoc.size}</span>
                  <span>·</span>
                  <span>Uploaded: {selectedDoc.date}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h5 className="text-xs font-semibold uppercase tracking-widest text-darkGrey">
                Document Tags
              </h5>
              <div className="flex flex-wrap gap-2">
                {selectedDoc.tags.map((tag, i) => (
                  <span key={i} className="px-3 py-1 text-xs font-mono bg-background text-darkGrey">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h5 className="text-xs font-semibold uppercase tracking-widest text-darkGrey">
                Content Preview
              </h5>
              <div className="p-6 border border-borderGrey bg-background font-mono text-sm leading-relaxed text-darkGrey space-y-3">
                <p>This is a simulated preview of the document contents.</p>
                <p>The document has been successfully chunked and vectorized for the RAG system.</p>
                <p>Vector dimensions: 1536</p>
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-6 border-t border-borderGrey">
              <button
                onClick={() => setSelectedDoc(null)}
                className="px-6 py-2 border border-borderGrey text-sm font-medium text-text hover:bg-background transition-colors"
              >
                Close
              </button>
              <button className="px-6 py-2 text-sm font-medium bg-corePurple text-white hover:bg-darkPurple transition-colors">
                Download Original
              </button>
            </div>
          </div>
        )}
      </MainModal>
    </div>
  )
}

export default Knowledge