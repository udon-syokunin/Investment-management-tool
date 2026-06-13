# 📒 投資ノートアプリ

株式投資のノート・収支管理・学習メモをまとめたモバイルWebアプリ（PWA）です。

---

## 🚀 Vercelへのデプロイ手順（約15分）

### Step 1: GitHubリポジトリを作る

1. [github.com](https://github.com) でアカウント作成（未登録の場合）
2. 右上の「+」→「New repository」
3. Repository name: `invest-note-app`
4. **Public** を選択 → 「Create repository」

### Step 2: このフォルダをGitHubにアップロード

```bash
# このフォルダ内でターミナルを開いて実行
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/あなたのユーザー名/invest-note-app.git
git push -u origin main
```

**ターミナルが苦手な場合:** GitHub Desktop を使うと GUI で操作できます
→ https://desktop.github.com/

### Step 3: Vercelにデプロイ

1. [vercel.com](https://vercel.com) にアクセス
2. 「Sign Up」→「Continue with GitHub」でログイン
3. 「New Project」→ `invest-note-app` リポジトリを選択
4. Framework Preset: **Vite** を選択（自動で検出されるはず）
5. 「Deploy」をクリック → 1〜2分で完了！

デプロイ完了後、`https://invest-note-app.vercel.app` のようなURLが発行されます。

---

## 📱 iPhoneにインストールする

1. iPhoneのSafariでVercelのURLを開く
2. 画面下部の「共有」ボタン（四角に矢印）をタップ
3. 「ホーム画面に追加」をタップ
4. 名前を確認して「追加」

これでホーム画面にアイコンが追加され、ネイティブアプリのように使えます！

---

## 💻 ローカルで開発する場合

```bash
npm install
npm run dev
```

ブラウザで http://localhost:3000 が開きます。

---

## 📁 ファイル構成

```
invest-note-app/
├── public/
│   ├── manifest.json    # PWA設定
│   ├── icon-192.png     # アプリアイコン（要作成）
│   └── icon-512.png     # アプリアイコン（要作成）
├── src/
│   ├── App.jsx          # メインアプリ
│   └── main.jsx         # エントリーポイント
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## ⚠️ アイコンについて

`public/` フォルダに `icon-192.png` と `icon-512.png` を追加してください。
- [favicon.io](https://favicon.io) などで簡単に作れます
- 未設定でもアプリとして動作します

---

## 🔒 データについて

データはブラウザのlocalStorageに保存されます。
- ブラウザ/アプリを削除するとデータも消えます
- 機種変更時はデータが引き継がれません
- 将来的にはクラウド同期を追加することをお勧めします
