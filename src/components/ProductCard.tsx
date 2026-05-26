import { Link } from 'react-router-dom'
import type { Product } from '../types/content'
import { resolveAsset } from '../lib/content'
import { TagBadge } from './TagBadge'

interface Props {
  product: Product
}

export function ProductCard({ product }: Props) {
  const cover = product.images[0]
  return (
    <Link to={`/products/${product.id}`} className="card">
      <div className="card__media">
        {cover ? (
          <img src={resolveAsset(cover)} alt="" loading="lazy" />
        ) : (
          <div className="card__media-placeholder" aria-hidden="true" />
        )}
      </div>
      <div className="card__body">
        <div className="card__title-row">
          <h3 className="card__title">{product.title}</h3>
          <div className="card__specs">
            {product.players && <span className="card__spec">{product.players}</span>}
            {product.playtime && <span className="card__spec">{product.playtime}</span>}
          </div>
        </div>
        <div className="card__price-row">
          {typeof product.price === 'number' && (
            <span className="card__price">
              {product.price.toLocaleString()}円<span className="card__tax">（税込）</span>
            </span>
          )}
          <div className="card__tags">
            {product.tags.map((t) => (
              <TagBadge key={t} tag={t} />
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
}
