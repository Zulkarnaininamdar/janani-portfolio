import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import ScrollProgress from '../components/ui/ScrollProgress'

const EASE = [0.16, 1, 0.3, 1]

export default function MarkdownPage({ title, markdown, backLabel = 'Back to portfolio' }) {
  return (
    <div style={{ background: 'var(--ink)', minHeight: '100vh' }}>
      <ScrollProgress />
      <header className="md-bar">
        <Link to="/" className="text-link back-link">
          <ArrowLeft size={16} strokeWidth={1.5} /> {backLabel}
        </Link>
        <span className="md-bar__name">
          <img src="/images/brand/mark-160.png" alt="" width="34" height="34" />
          Janani Pradhaban
        </span>
      </header>

      <article className="markdown-page">
        <motion.h1
          className="markdown-page__title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: EASE }}
        >
          {title}
        </motion.h1>
        <motion.div
          className="markdown-page__rule"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          style={{ transformOrigin: 'left' }}
          transition={{ duration: 1.2, delay: 0.3, ease: EASE }}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.45, ease: EASE }}
        >
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </motion.div>
      </article>
    </div>
  )
}
