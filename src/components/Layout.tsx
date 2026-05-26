import { Link, NavLink, Outlet } from 'react-router-dom'
import logo from '../assets/logo.png'

export function Layout() {
  return (
    <div className="layout">
      <header className="site-header">
        <div className="site-header__inner">
          <Link to="/" className="brand" aria-label="ボドゲ倉庫 ホーム">
            <img src={logo} alt="ボドゲ倉庫" className="brand__logo" />
          </Link>
          <nav className="site-nav" aria-label="グローバルナビゲーション">
            <NavLink to="/" end>ホーム</NavLink>
            <NavLink to="/products">ボドゲ一覧</NavLink>
            <NavLink to="/blog">さくしゃのブログ</NavLink>
          </nav>
        </div>
      </header>
      <main className="site-main">
        <Outlet />
      </main>
      <footer className="site-footer">
        <div className="site-footer__inner">
          <img src={logo} alt="ボドゲ倉庫" className="site-footer__logo" />
          <div className="site-footer__text">
            <p>© {new Date().getFullYear()} ボドゲ倉庫</p>
            <p className="muted">個人で運営するボードゲーム紹介サイトです。</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
