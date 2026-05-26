import type { Tag } from '../types/tag'
import { TAG_LABELS } from '../types/tag'

interface Props {
  tag: Tag
}

export function TagBadge({ tag }: Props) {
  return <span className={`tag tag--${tag}`}>{TAG_LABELS[tag]}</span>
}
