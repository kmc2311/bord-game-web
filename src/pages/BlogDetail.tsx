import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { formatDate, loadPostBody, loadPosts, resolveAsset } from '../lib/content'
import type { Post } from '../types/content'
import { TagBadge } from '../components/TagBadge'

export function BlogDetail() {
  const { id } = useParams<{ id: string }>()
  const [post, setPost] = useState<Post | null | undefined>(undefined)
  const [body, setBody] = useState<string>('')

  useEffect(() => {
    let cancelled = false
    loadPosts()
      .then((items) => {
        const found = items.find((p) => p.id === id) ?? null
        if (cancelled) return
        setPost(found)
        if (found) {
          loadPostBody(found)
            .then((text) => {
              if (!cancelled) setBody(text)
            })
            .catch((e) => {
              console.error(e)
              if (!cancelled) setBody('')
            })
        }
      })
      .catch(() => setPost(null))
    return () => {
      cancelled = true
    }
  }, [id])

  if (post === undefined) {
    return (
      <div className="page">
        <p className="muted">読み込み中…</p>
      </div>
    )
  }
  if (post === null) {
    return (
      <div className="page">
        <h1>記事が見つかりませんでした</h1>
        <Link to="/blog" className="btn btn--ghost">
          ← ブログ一覧へ
        </Link>
      </div>
    )
  }

  return (
    <div className="page page--detail">
      <Link to="/blog" className="back-link">
        ← ブログ一覧
      </Link>
      <article className="post">
        {post.coverImage && (
          <img className="post__cover" src={resolveAsset(post.coverImage)} alt="" />
        )}
        <div className="card__tags">
          {post.tags.map((t) => (
            <TagBadge key={t} tag={t} />
          ))}
        </div>
        <h1 className="post__title">{post.title}</h1>
        <p className="post__date muted">{formatDate(post.publishedAt)}</p>
        <div className="post__body markdown">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
        </div>
      </article>
    </div>
  )
}
