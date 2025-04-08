import { Response } from "./types/httpjson";

export interface ElectronProps {
  isElectron: boolean,
  addResponse?: (response: Response[]) => Promise<void>;
}
interface ElectronWindow extends Window {
  electron?: ElectronProps;
}
export const useElectron = (): ElectronProps => {

  return {
    isElectron: !!(window as ElectronWindow).electron,
    addResponse: (window as ElectronWindow).electron?.addResponse
  }
}