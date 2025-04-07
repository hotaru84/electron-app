
export interface ElectronProps {
  isElectron: boolean,
  parsePcap?: (fileBuffer: ArrayBuffer) => Promise<{ requests: unknown[]; responses: unknown[] }>;
}
interface ElectronWindow extends Window {
  electron?: ElectronProps;
}
export const useElectron = (): ElectronProps => {

  return {
    isElectron: !!(window as ElectronWindow).electron,
    parsePcap: (window as ElectronWindow).electron?.parsePcap
  }
}