# Slot Guide Minimal Starter

Firebase App Hosting + Next.js 15 の最小構成です。Google サインインと Cloud Firestore の読み書きを確認するシンプルなノートアプリが含まれます。

## 必要な環境変数
App Hosting のビルド環境で以下の公開設定を指定してください。

- `NEXT_PUBLIC_FB_API_KEY`
- `NEXT_PUBLIC_FB_AUTH_DOMAIN`
- `NEXT_PUBLIC_FB_PROJECT_ID`
- `NEXT_PUBLIC_FB_APP_ID`
- 任意: `NEXT_PUBLIC_USE_FIREBASE_EMULATORS` を `true` にするとローカルエミュレーターに接続します。

Secret Manager には `OPENAI_API_KEY`（例）を用意し、`apphosting.yaml` の設定で参照します。

## コマンド

```bash
npm ci
npm run dev
npm run build
npm start
npm run lint
```

## Firestore ルール
`firestore.rules` では、認証済みユーザー自身のドキュメントのみ読み書きできます。
