/// <reference types="vite/client" />
/// <reference types="vite-plugin-glsl/ext" />
interface ImportMetaEnv {
  readonly VITE_HUGGING_FACE_ACCESS_TOKEN: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}