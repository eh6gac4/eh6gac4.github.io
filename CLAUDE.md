# CLAUDE.md — eh6gac4.github.io Portfolio

## プロジェクト概要

Fumiko Cho（アートディレクター / デザイナー）のポートフォリオサイト。
Astro 5 で構築し、GitHub Actions 経由で GitHub Pages に自動デプロイ。

- **本番URL**: https://eh6gac4.github.io
- **デプロイ**: `main` ブランチへの push で自動実行

## 実行環境

- Node.js: v22（nvm 管理）

## よく使うコマンド

```bash
npm run dev      # 開発サーバー起動
npm run build    # ビルド確認
npm install <package>  # 依存パッケージ追加
```

## ディレクトリ構成

```
src/
  layouts/Layout.astro        # ベースレイアウト（フォント・CSS変数定義）
  pages/index.astro           # メインページ（唯一のルート）
  components/
    PasswordOverlay.astro     # パスワードロック（sessionStorage 使用）
  data/
    works.ts                  # 作品一覧データ（ここを編集して作品を管理）
public/
  images/                     # サムネイル画像置き場
.github/workflows/deploy.yml  # GitHub Pages 自動デプロイ
```

## デザイン方針

- フォント: DM Sans（本文）/ DM Mono（monospace）
- カラー: `--color-bg: #fff`, `--color-text: #111`, `--color-muted: #888`, `--color-border: #e8e8e8`
- ベースフォントサイズ: 14px（ラベル・キャプションは 10–11px）
- 余白・アニメーション: 控えめで静的なデザインを維持すること
- **追加機能・リファクタリングは要求がない限り行わない**

## 作品の追加・編集

`src/data/works.ts` の配列を編集する。画像がある場合は `public/images/` に置き `image` フィールドで指定。

```ts
{ title: '作品タイトル', image: '/images/work.jpg' }
```

## パスワード

`src/components/PasswordOverlay.astro` の `CORRECT_PASSWORD` を変更する。
クライアントサイドのみの保護（本格的な認証ではない）。

## デプロイ

`main` ブランチに push するだけで GitHub Actions が自動でビルド＆デプロイ。
GitHub リポジトリの Settings > Pages > Source を **GitHub Actions** に設定済みであること。
