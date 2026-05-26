import { Link } from 'react-router-dom'
import type { Post } from '../types/content'
import { formatDate, resolveAsset } from '../lib/content'
import { TagBadge } from './TagBadge'

interface Props {
  post: Post
}

export function PostCard({ post }: Props) {
  return (
    <Link to={`/blog/${post.id}`} className="card">
      <div className="card__media">
        {post.coverImage ? (
          <img src={resolveAsset(post.coverImage)} alt="" loading="lazy" />
        ) : (
          <div className="card__media-placeholder" aria-hidden="true" />
        )}
      </div>
      <div className="card__body">
        <div className="card__tags">
          {post.tags.map((t) => (
            <TagBadge key={t} tag={t} />
          ))}
        </div>
        <h3 className="card__title">{post.title}</h3>
        <p className="card__excerpt">{post.excerpt}</p>
        <div className="card__meta">
          <span className="card__date">{formatDate(post.publishedAt)}</span>
        </div>
      </div>
    </Link>
  )
}
