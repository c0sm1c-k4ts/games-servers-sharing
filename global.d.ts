export {};

declare global {
  interface Window {
    electronAPI: {
      // TODO: add normal type definitions
      getWebViewAddress: (callback: (address: string) => void) => void;
    };
  }
  //...
}
