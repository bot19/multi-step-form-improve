/// <reference types="vite/client" />

declare module '*.svg' {
  import type { FunctionComponent, SVGProps } from 'react';
  export const ReactComponent: FunctionComponent<SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

declare module '*.svg?react' {
  import type { FunctionComponent, SVGProps } from 'react';
  const ReactComponent: FunctionComponent<SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}

type ViteTypeOptions = object;

declare const __APP_VERSION__: string;

interface ImportMetaEnv {
  readonly VITE_GITHUB_SHA?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
