import { useState } from 'react'
import { Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import '../index.css'
import '../markdown.css'

// Import Markdown content
import readmeRaw from '../docs/README.md?raw'
import universalGuideRaw from '../docs/UNIVERSAL_PAYMENT_GUIDE.md?raw'

const docsMap = {
  'overview': { title: 'Project Overview', content: readmeRaw },
  'universal-payment': { title: 'Universal Payment Guide', content: universalGuideRaw }
}

export default function Docs() {
  const [activeDoc, setActiveDoc] = useState('overview')

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-darker)' }}>
      {/* Sidebar */}
      <aside className="docs-sidebar">
        <div className="logo" style={{ marginBottom: '2rem', padding: '0 1rem' }}>
          <img src="/favicon.ico" alt="WizPay Logo" style={{ width: '32px', height: '32px', borderRadius: '8px' }} />
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>WizPay</Link>
        </div>
        
        <h3 style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '1rem', padding: '0 1rem', letterSpacing: '0.05em' }}>
          Documentation
        </h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', padding: '0 0.5rem' }}>
          {Object.entries(docsMap).map(([key, doc]) => (
            <button 
              key={key}
              onClick={() => setActiveDoc(key)}
              style={{
                background: activeDoc === key ? 'rgba(139, 92, 246, 0.15)' : 'transparent',
                color: activeDoc === key ? 'white' : 'var(--text-muted)',
                border: 'none',
                textAlign: 'left',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                cursor: 'pointer',
                fontFamily: 'var(--font-body)',
                fontSize: '0.95rem',
                transition: 'all 0.2s',
                fontWeight: activeDoc === key ? '500' : '400',
              }}
            >
              {doc.title}
            </button>
          ))}
        </div>
        
        <div style={{ marginTop: 'auto', padding: '2rem 1rem 0' }}>
          <Link to="/" className="btn btn-outline" style={{ width: '100%', fontSize: '0.9rem' }}>
            &larr; Back to Home
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="docs-main">
        <div className="markdown-body">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {docsMap[activeDoc].content}
          </ReactMarkdown>
        </div>
      </main>
    </div>
  )
}
