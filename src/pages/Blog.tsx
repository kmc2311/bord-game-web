import { useEffect, useMemo, useState } from 'react'
import { loadPosts } from '../lib/content'
import type { Post } from '../types/content'
import { PostCard } from '../components/PostCard'
import { TagFilter } from '../components/TagFilter'
import { useActiveTags } from '../lib/useActiveTags'

export function Blog() {
  const [posts, setPosts] = useState<Post[]>([])
  const active = useActiveTags()

  useEffect(() => {
    loadPosts().then(setPosts).catch(console.error)
  }, [])

  const filtered = useMemo(() => {
    if (active.length === 0) return posts
    return posts.filter((p) => active.some((t) => p.tags.includes(t)))
  }, [posts, active])

  return (
    <div className="page">
      <header className="page__head">
        <h1>Blog</h1>
        <p className="muted">制作の裏側やお知らせをお届けします。</p>
      </header>
      <TagFilter />
      {filtered.length === 0 ? (
        <p className="muted">該当する記事がありません。</p>
      ) : (
        <div className="grid grid--cards">
          {filtered.map((p) => (
            <PostCard key={p.id} post={p} />
          ))}
        </div>
      )}
    </div>
  )
}
