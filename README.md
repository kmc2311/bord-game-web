# ボドゲ倉庫

個人で運営するボードゲーム紹介＆ブログサイトです。Vite + React + TypeScript の SPA で、データはリポジトリ内の JSON / Markdown / 画像を直接編集して反映します。

## セットアップ

```bash
npm install
npm run dev     # 開発サーバー
npm run build   # 本番ビルド
npm run preview # ビルド結果のプレビュー
npm run lint    # ESLint
```

## サイト構成

| ルート | 内容 |
| --- | --- |
| `/` | ホーム（新商品ピックアップ＋最新ブログ） |
| `/products` | 商品一覧（タグで絞り込み） |
| `/products/:id` | 商品詳細・外部購入リンク |
| `/blog` | ブログ一覧（タグで絞り込み） |
| `/blog/:id` | ブログ記事（Markdown） |
| `/about` | サイト紹介 |

タグは `新商品 / SALE / ブログ / その他` の 4 種類で、商品・ブログ共通で利用できます。

## 投稿手順

`/edit` のような管理画面は持たず、リポジトリのファイルを直接編集してコミットすることで公開内容を更新します。

### 1. 商品を追加する

1. 画像を `public/images/products/` 配下に配置（例: `public/images/products/starlight/cover.png`）
2. `public/data/products.json` に新しいエントリを追加

```jsonc
{
  "id": "starlight-route",              // URL に使う一意の英数 ID
  "title": "スターライト・ルート",
  "description": "夜空を旅するセットコレクション系ゲーム。",
  "price": 3800,                        // 任意（省略可）
  "images": [
    "/images/products/starlight/cover.png",
    "/images/products/starlight/sub1.png"
  ],
  "tags": ["new", "sale"],              // "new" | "sale" | "blog" | "other"
  "externalUrl": "https://example.booth.pm/items/xxxx",
  "publishedAt": "2026-05-10"
}
```

### 2. ブログ記事を追加する

1. Markdown 本文を `public/data/posts/<id>.md` に作成
2. アイキャッチ画像を `public/images/posts/` 配下に配置
3. `public/data/posts.json` にメタ情報を追加

```jsonc
{
  "id": "hello",
  "title": "ボドゲ倉庫を開店しました",
  "excerpt": "一覧ページに表示する短い説明。",
  "coverImage": "/images/posts/hello.png",
  "bodyPath": "data/posts/hello.md",    // 本文 Markdown ファイルへのパス
  "tags": ["blog"],
  "publishedAt": "2026-05-12"
}
```

> `body` フィールドに Markdown を直接書く形式にも対応していますが、長文は `bodyPath` の別ファイル運用を推奨します。

### 3. 反映

開発サーバー (`npm run dev`) を起動していれば、JSON や Markdown を保存した時点でホットリロードされます。本番では `npm run build` の成果物（`dist/`）をデプロイしてください。

## ディレクトリ構成

```
public/
  data/
    products.json
    posts.json
    posts/*.md
  images/
    products/...
    posts/...
src/
  components/   共通 UI (Layout, TagFilter, ProductCard, PostCard, TagBadge)
  lib/          データ読み込み・ユーティリティ
  pages/        各ルートのページコンポーネント
  types/        型定義 (Tag, Product, Post)
  App.tsx       ルーティング
  main.tsx      エントリポイント
  App.css       サイト全体のスタイル
  index.css     ベースのリセット / カラーパレット
```

## デプロイ

SPA ルーティングを使っているため、`/products/:id` などへの直接アクセスを `index.html` にフォールバックする設定が必要です。Vercel / Netlify / Cloudflare Pages であれば Vite プリセットでそのまま動作します。
