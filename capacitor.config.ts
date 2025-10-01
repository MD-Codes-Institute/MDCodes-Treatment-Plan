import type { CapacitorConfig } from "@capacitor/cli";

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
  }
};

export default config;
