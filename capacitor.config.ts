import type { CapacitorConfig } from "@capacitor/cli";
import { KeyboardResize } from '@capacitor/keyboard';

const config: CapacitorConfig = {
  appId: "com.mdcodes.treatmentplan",
  appName: "MD Codes Treatment Plan ",
  webDir: "dist",
  server: {
    // Adicione esta seção!
    allowNavigation: [
      "*.firebaseapp.com",
      "*.firebaseio.com",
      "*.googleapis.com",
      "*.google.com"
    ]
  },
  plugins: {
    Keyboard: {
      resize: KeyboardResize.None,
    },
  },
};

export default config;
