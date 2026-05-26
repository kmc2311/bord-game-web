import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { formatDate, loadPosts, loadProducts } from '../lib/content'
import type { Post, Product } from '../types/content'
import { ProductCard } from '../components/ProductCard'
import { TagBadge } from '../components/TagBadge'

type NewsItem =
  | { kind: 'product'; id: string; title: string; date: string; tags: Product['tags'] }
  | { kind: 'post'; id: string; title: string; date: string; tags: Post['tags'] }

export function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [posts, setPosts] = useState<Post[]>([])
  const carouselRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    loadProducts().then(setProducts).catch(console.error)
    loadPosts().then(setPosts).catch(console.error)
  }, [])

  const recommended = products.slice(0, 8)

  const news: NewsItem[] = [
    ...products.map<NewsItem>((p) => ({
      kind: 'product',
      id: p.id,
      title: titleForProduct(p),
      date: p.publishedAt,
      tags: p.tags,
    })),
    ...posts.map<NewsItem>((p) => ({
      kind: 'post',
      id: p.id,
      title: p.title,
      date: p.publishedAt,
      tags: p.tags,
    })),
  ]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 8)

  function scrollCarousel(dir: -1 | 1) {
    const el = carouselRef.current
    if (!el) return
    const amount = el.clientWidth * 0.8
    el.scrollBy({ left: dir * amount, behavior: 'smooth' })
  }

  return (
    <div className="page page--home">
      <section className="section section--featured">
        <h2 className="section-title">おすすめ</h2>
        <div className="carousel">
          <button
            type="button"
            className="carousel__nav carousel__nav--prev"
            onClick={() => scrollCarousel(-1)}
            aria-label="前へ"
          >
            ‹
          </button>
          <div className="carousel__track" ref={carouselRef}>
            {recommended.length === 0 ? (
              <p className="muted">商品はまだありません。</p>
            ) : (
              recommended.map((p) => (
                <div className="carousel__item" key={p.id}>
                  <ProductCard product={p} />
                </div>
              ))
            )}
          </div>
          <button
            type="button"
            className="carousel__nav carousel__nav--next"
            onClick={() => scrollCarousel(1)}
            aria-label="次へ"
          >
            ›
          </button>
        </div>
      </section>

      <section className="section section--news">
        <h2 className="section-title">新着情報</h2>
        <ul className="news">
          {news.length === 0 ? (
            <li className="muted">お知らせはまだありません。</li>
          ) : (
            news.map((item) => (
              <li className="news__item" key={`${item.kind}-${item.id}`}>
                <Link
                  to={item.kind === 'product' ? `/products/${item.id}` : `/blog/${item.id}`}
                  className="news__link"
                >
                  <div className="news__head">
                    <time className="news__date">{formatDate(item.date)}</time>
                    <div className="news__tags">
                      {item.tags.map((t) => (
                        <TagBadge key={t} tag={t} />
                      ))}
                    </div>
                  </div>
                  <p className="news__title">{item.title}</p>
                </Link>
              </li>
            ))
          )}
        </ul>
      </section>

      <section className="section section--featured section--list">
        <h2 className="section-title">商品一覧</h2>
        {products.length === 0 ? (
          <p className="muted">商品はまだありません。</p>
        ) : (
          <div className="grid grid--cards">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

function titleForProduct(p: Product): string {
  if (p.tags.includes('sale')) {
    return `${p.title}発売！\n発売を記念してセール開催！！`
  }
  return `${p.title} 発売！`
}
