import { useSearchParams } from 'react-router-dom'
import type { Tag } from '../types/tag'
import { TAG_LABELS, TAG_VALUES } from '../types/tag'
import { useActiveTags } from '../lib/useActiveTags'

interface Props {
  /** 表示するタグ。省略時は全タグ */
  available?: Tag[]
}

export function TagFilter({ available }: Props) {
  const tags = available ?? [...TAG_VALUES]
  const [params, setParams] = useSearchParams()
  const active = new Set(useActiveTags())

  function toggle(tag: Tag) {
    const next = new Set(active)
    if (next.has(tag)) next.delete(tag)
    else next.add(tag)
    const value = [...next].join(',')
    const newParams = new URLSearchParams(params)
    if (value) newParams.set('tag', value)
    else newParams.delete('tag')
    setParams(newParams, { replace: true })
  }

  function clear() {
    const newParams = new URLSearchParams(params)
    newParams.delete('tag')
    setParams(newParams, { replace: true })
  }

  return (
    <div className="tag-filter" role="group" aria-label="タグで絞り込み">
      <button
        type="button"
        className={`tag-filter__btn${active.size === 0 ? ' is-active' : ''}`}
        onClick={clear}
      >
        すべて
      </button>
      {tags.map((tag) => (
        <button
          key={tag}
          type="button"
          className={`tag-filter__btn tag-filter__btn--${tag}${active.has(tag) ? ' is-active' : ''}`}
          onClick={() => toggle(tag)}
          aria-pressed={active.has(tag)}
        >
          {TAG_LABELS[tag]}
        </button>
      ))}
    </div>
  )
}
