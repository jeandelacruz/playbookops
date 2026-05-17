declare module "react" {
  export type ReactNode = unknown;
  export type SetStateAction<T> = T | ((previous: T) => T);
  export type Dispatch<T> = (value: T) => void;
  export type ReactSVG = Record<string, unknown>;
  export type SVGProps<T> = Record<string, unknown> & { ref?: unknown };
  export interface RefAttributes<T> {
    ref?: unknown;
  }
  export interface ForwardRefExoticComponent<P> {
    (props: P): JSX.Element;
  }

  export function StrictMode(props: { children?: ReactNode }): JSX.Element;
  export function useEffect(effect: () => void | (() => void), deps?: readonly unknown[]): void;
  export function useMemo<T>(factory: () => T, deps: readonly unknown[]): T;
  export function useRef<T>(initialValue: T): { current: T };
  export function useState<T>(initialValue: T | (() => T)): [T, Dispatch<SetStateAction<T>>];
}

declare module "react/jsx-runtime" {
  export function jsx(type: unknown, props: unknown, key?: unknown): JSX.Element;
  export function jsxs(type: unknown, props: unknown, key?: unknown): JSX.Element;
  export const Fragment: (props: { children?: unknown }) => JSX.Element;
}

declare namespace JSX {
  type Element = unknown;

  interface IntrinsicAttributes {
    key?: string | number;
  }

  interface IntrinsicElements {
    [elementName: string]: {
      [attributeName: string]: unknown;
      children?: unknown;
      className?: string;
      htmlFor?: string;
      id?: string;
      role?: string;
      title?: string;
      type?: string;
      value?: string | number | readonly string[];
      checked?: boolean;
      disabled?: boolean;
      href?: string;
      target?: string;
      rel?: string;
      src?: string;
      alt?: string;
      width?: string | number;
      height?: string | number;
      style?: Record<string, string | number>;
      "aria-label"?: string;
      "aria-live"?: string;
      "aria-expanded"?: boolean;
      "aria-haspopup"?: string | boolean;
      onClick?: (event: any) => void;
      onChange?: (event: any) => void;
      onMouseDown?: (event: any) => void;
      onKeyDown?: (event: any) => void;
    };
  }
}
