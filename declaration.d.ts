// declarations.d.ts
declare module '*.png' {
  const value: any;
  export default value;
}

declare module '@env' {
  export const API_URL: string;
  export const WS_URL: string;
}