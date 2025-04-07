interface ElectronWindow extends Window {
  electron?: {
    isElectron: boolean;
  };
}

export const isElectron = !!(window as ElectronWindow).electron?.isElectron;
