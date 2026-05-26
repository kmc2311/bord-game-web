import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { formatDate, loadProducts, resolveAsset } from '../lib/content'
import type { Product } from '../types/content'
import { TagBadge } from '../components/TagBadge'

export function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<Product | null | undefined>(undefined)
  const [activeImage, setActiveImage] = useState(0)

  useEffect(() => {
    loadProducts()
      .then((items) => setProduct(items.find((p) => p.id === id) ?? null))
      .catch(() => setProduct(null))
  }, [id])

  if (product === undefined) {
    return (
      <div className="page">
        <p className="muted">読み込み中…</p>
      </div>
    )
  }
  if (product === null) {
    return (
      <div className="page">
        <h1>商品が見つかりませんでした</h1>
        <Link to="/products" className="btn btn--ghost">
          ← 商品一覧へ
        </Link>
      </div>
    )
  }

  const main = product.images[activeImage] ?? product.images[0]

  return (
    <div className="page page--detail">
      <Link to="/products" className="back-link">
        ← 商品一覧
      </Link>
      <article className="detail">
        <div className="detail__media">
          {main && (
            <img className="detail__main-image" src={resolveAsset(main)} alt={product.title} />
          )}
          {product.images.length > 1 && (
            <div className="detail__thumbs">
              {product.images.map((src, i) => (
                <button
                  key={src + i}
                  type="button"
                  className={`detail__thumb${i === activeImage ? ' is-active' : ''}`}
                  onClick={() => setActiveImage(i)}
                  aria-label={`画像 ${i + 1}`}
                >
                  <img src={resolveAsset(src)} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="detail__body">
          <div className="card__tags">
            {product.tags.map((t) => (
              <TagBadge key={t} tag={t} />
            ))}
          </div>
          <h1 className="detail__title">{product.title}</h1>
          <p className="detail__date muted">{formatDate(product.publishedAt)}</p>
          {typeof product.price === 'number' && (
            <p className="detail__price">¥{product.price.toLocaleString()}</p>
          )}
          <p className="detail__description">{product.description}</p>
          {product.externalUrl && (
            <a
              className="btn btn--primary btn--lg"
              href={product.externalUrl}
              target="_blank"
              rel="noreferrer noopener"
            >
              購入ページへ（外部サイト）
            </a>
          )}
        </div>
      </article>
    </div>
  )
}
