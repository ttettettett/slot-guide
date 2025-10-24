# AGENTS.md

## Project type
- Framework: Next.js 15 (React 19)
- Package manager: **npm**（pnpmは使用しない）
- Runtime: Node.js v20
- Hosting: **Firebase App Hosting**
- Auth: Firebase Authentication (Google)
- DB: Cloud Firestore (Native)
- Secrets: **Google Cloud Secret Manager** 経由（App Hostingの `apphosting.yaml` でマッピング）

## Repo layout
- `src/app/**` : UI / Pages （`page.tsx` がトップ）
- `src/lib/**` : Firebase 初期化 (`firebase.ts`), DB ユーティリティ
- `firestore.rules` : 本番用セキュリティルール
- `apphosting.yaml` : App Hosting 設定（Secret マッピング以外は最小限）
- `.nvmrc` : `v20`

## Setup commands (run exactly)
- **Install**: `npm ci`
- **Dev**: `npm run dev`  # runs on port 5173
- **Build**: `npm run build`
- **Start**: `npm start`
- **Lint**: `npm run lint`

## Environment & secrets
- クライアント公開値（Firebase Web Config）は **NEXT_PUBLIC_** で注入：
  - `NEXT_PUBLIC_FB_API_KEY`
  - `NEXT_PUBLIC_FB_AUTH_DOMAIN`
  - `NEXT_PUBLIC_FB_PROJECT_ID`
  - `NEXT_PUBLIC_FB_APP_ID`
- サーバー秘匿値は **Secret Manager** → `apphosting.yaml` で参照：
  - `OPENAI_API_KEY`（例）
- **禁止**：秘匿値を `.env*` でGitにコミットしない。App Hosting に直接生の環境変数を埋め込まない（Secret Manager経由）。

## Firestore rules (authoritative)
- `firestore.rules` を変更する場合は、既存のアクセス制御（本人のみ読み書き）を保持すること。
- 破壊的変更が必要なら PR 説明に明記。

## Auth
- Google サインインのみ。`Authorized domains` は Hosting のドメインを追加済み想定。
- エラー `auth/api-key-not-valid` が出たら「Firebase Web Configの不一致」を最優先で確認。

## Allowed edits
- 新機能追加は `src/app` と `src/lib` に限定。
- ビルド/CIが通らない依存追加は禁止。必要時はPRで理由を記載。

## Prohibited
- `pnpm` / `yarn` への切替
- `apphosting.yaml` のリソース設定を大きく変更
- Secret を平文で配置
- Firestore ルールの緩和（全読み書き可など）

## Git workflow
- Base branch: `dev`（Preview deploy）
- Production: `main`
- PR 要件: `npm run build` / `npm run lint` 通過。要サマリ。

## Task recipes (how to ask Codex)
1. **「ノートのCRUD UIを整える」**
   - 変更先: `src/app/page.tsx`
   - 受け入れ条件: サインイン後に note を追加→即リスト反映（onSnapshot）。
2. **「Firestore ルールを更新」**
   - 変更先: `firestore.rules`
   - 受け入れ条件: 未ログインで書込み失敗・ログインユーザー本人のみ成功。
3. **「OpenAI 呼び出しのサーバー関数を追加」**
   - 変更先: `src/app/api/generate/route.ts`
   - 使用Secret: `OPENAI_API_KEY`（`process.env.OPENAI_API_KEY`）

## Troubleshooting
- `auth/api-key-not-valid`: Web Configの値/ドメインを再確認。
- Secret が読めない: App Hosting のサービスアカウントに `Secret Manager Secret Accessor` を付与。
