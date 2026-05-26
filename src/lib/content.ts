import type { Post } from '../types/content'
import type { Product } from '../types/content'

let productsCache: Promise<Product[]> | null = null
let postsCache: Promise<Post[]> | null = null

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status}`)
  }
  return res.json() as Promise<T>
}

export function loadProducts(): Promise<Product[]> {
  if (!productsCache) {
    productsCache = fetchJson<Product[]>(
      `${import.meta.env.BASE_URL}data/products.json`,
    ).then((items) =>
      [...items].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)),
    )
  }
  return productsCache
}

export function loadPosts(): Promise<Post[]> {
  if (!postsCache) {
    postsCache = fetchJson<Post[]>(
      `${import.meta.env.BASE_URL}data/posts.json`,
    ).then((items) =>
      [...items].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)),
    )
  }
  return postsCache
}

export async function loadPostBody(post: Post): Promise<string> {
  if (post.body) return post.body
  if (post.bodyPath) {
    const url = post.bodyPath.startsWith('/')
      ? post.bodyPath
      : `${import.meta.env.BASE_URL}${post.bodyPath}`
    const res = await fetch(url)
    if (!res.ok) throw new Error(`Failed to fetch ${url}`)
    return res.text()
  }
  return ''
}

export function resolveAsset(path: string): string {
  if (/^https?:\/\//.test(path)) return path
  const trimmed = path.startsWith('/') ? path.slice(1) : path
  return `${import.meta.env.BASE_URL}${trimmed}`
}

export function formatDate(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`
}
