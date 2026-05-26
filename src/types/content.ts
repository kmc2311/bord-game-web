import type { Tag } from './tag'

export interface Product {
  id: string
  title: string
  description: string
  price?: number
  /** プレイ人数（例: "2〜4人"） */
  players?: string
  /** プレイ時間（例: "5分程度"） */
  playtime?: string
  images: string[]
  tags: Tag[]
  externalUrl?: string
  publishedAt: string
}

export interface Post {
  id: string
  title: string
  excerpt: string
  coverImage?: string
  /** Markdown 本文。`bodyPath` が指定されていれば fetch して使う */
  body?: string
  /** `/data/posts/<id>.md` のような相対パス（任意） */
  bodyPath?: string
  tags: Tag[]
  publishedAt: string
}
