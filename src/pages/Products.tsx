import { useEffect, useMemo, useState } from 'react'
import { loadProducts } from '../lib/content'
import type { Product } from '../types/content'
import { ProductCard } from '../components/ProductCard'
import { TagFilter } from '../components/TagFilter'
import { useActiveTags } from '../lib/useActiveTags'

export function Products() {
  const [products, setProducts] = useState<Product[]>([])
  const active = useActiveTags()

  useEffect(() => {
    loadProducts().then(setProducts).catch(console.error)
  }, [])

  const filtered = useMemo(() => {
    if (active.length === 0) return products
    return products.filter((p) => active.some((t) => p.tags.includes(t)))
  }, [products, active])

  return (
    <div className="page">
      <header className="page__head">
        <h1>Products</h1>
        <p className="muted">取り扱い中のボードゲーム一覧です。</p>
      </header>
      <TagFilter />
      {filtered.length === 0 ? (
        <p className="muted">該当する商品がありません。</p>
      ) : (
        <div className="grid grid--cards">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  )
}
