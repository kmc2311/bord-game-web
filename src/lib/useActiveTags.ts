import { useSearchParams } from 'react-router-dom'
import type { Tag } from '../types/tag'
import { TAG_VALUES } from '../types/tag'

export function useActiveTags(): Tag[] {
  const [params] = useSearchParams()
  const raw = params.get('tag')
  if (!raw) return []
  return raw
    .split(',')
    .filter((v): v is Tag => (TAG_VALUES as readonly string[]).includes(v))
}
