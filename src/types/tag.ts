export const TAG_VALUES = ['new', 'sale', 'blog', 'other'] as const

export type Tag = (typeof TAG_VALUES)[number]

export const TAG_LABELS: Record<Tag, string> = {
  new: '新商品',
  sale: 'SALE',
  blog: 'ブログ',
  other: 'その他',
}
