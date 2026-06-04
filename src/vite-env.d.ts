// src/vite-env.d.ts
interface ImportMetaEnv {
  readonly VITE_HASURA_HTTP: string
  readonly VITE_HASURA_WS: string
  readonly VITE_HASURA_ROLE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}