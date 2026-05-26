import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <div className="page">
      <h1>404</h1>
      <p className="muted">お探しのページは見つかりませんでした。</p>
      <Link to="/" className="btn btn--ghost">
        ← ホームへ
      </Link>
    </div>
  )
}
