# Slot Guide Minimal Starter

Firebase App Hosting + Next.js 15 の最小構成です。Google サインインと Cloud Firestore の読み書きを確認するシンプルなノートアプリが含まれます。

## 必要な環境変数
App Hosting のビルド環境では Secret Manager に以下の公開設定を登録し、`apphosting.yaml` で環境変数へマッピングしてください。

- `NEXT_PUBLIC_FB_API_KEY`
- `NEXT_PUBLIC_FB_AUTH_DOMAIN`
- `NEXT_PUBLIC_FB_PROJECT_ID`
- `NEXT_PUBLIC_FB_APP_ID`
- 任意: `NEXT_PUBLIC_USE_FIREBASE_EMULATORS` を `true` にするとローカルエミュレーターに接続します。

`apphosting.yaml` の `secrets` に次のように追記すると、デプロイ時に自動で `process.env.*` に注入されます。

```yaml
secrets:
  - env: NEXT_PUBLIC_FB_API_KEY
    secret: projects/${PROJECT_ID}/secrets/NEXT_PUBLIC_FB_API_KEY/versions/latest
  - env: NEXT_PUBLIC_FB_AUTH_DOMAIN
    secret: projects/${PROJECT_ID}/secrets/NEXT_PUBLIC_FB_AUTH_DOMAIN/versions/latest
  - env: NEXT_PUBLIC_FB_PROJECT_ID
    secret: projects/${PROJECT_ID}/secrets/NEXT_PUBLIC_FB_PROJECT_ID/versions/latest
  - env: NEXT_PUBLIC_FB_APP_ID
    secret: projects/${PROJECT_ID}/secrets/NEXT_PUBLIC_FB_APP_ID/versions/latest
```

Secret Manager には `OPENAI_API_KEY`（例）も用意し、同様に `apphosting.yaml` の設定で参照します。

### ローカル開発

1. Firebase Console でプロジェクトの Web アプリを作成し、構成値（API Key など）を確認します。
2. リポジトリ直下の `.env.local.example` を `.env.local` にコピーし、取得した値で書き換えます。
3. `npm run dev` を実行すると、環境変数が読み込まれてサインインや Firestore へのアクセスをテストできます。

Firebase Web Config の値が設定されていない場合、トップページに不足している環境変数が表示されます。

### ローカル開発

1. Firebase Console でプロジェクトの Web アプリを作成し、構成値（API Key など）を確認します。
2. リポジトリ直下の `.env.local.example` を `.env.local` にコピーし、取得した値で書き換えます。
3. `npm run dev` を実行すると、環境変数が読み込まれてサインインや Firestore へのアクセスをテストできます。

Firebase Web Config の値が設定されていない場合、トップページに不足している環境変数が表示されます。

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
