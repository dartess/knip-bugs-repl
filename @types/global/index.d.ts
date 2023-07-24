/* eslint-disable import/no-default-export -- by design */
type Asset = string;
declare module '*.png' {
  const asset: Asset;
  export default asset;
}
declare module '*.jpg' {
  const asset: Asset;
  export default asset;
}
declare module '*.gif' {
  const asset: Asset;
  export default asset;
}
declare module '*.svg' {
  const asset: Asset;
  export default asset;
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
interface Navigator {
  getInstalledRelatedApps?: () => Promise<unknown[]>;
}
