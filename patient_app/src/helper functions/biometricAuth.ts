import CapacitorFingerprintAuth from "capacitor-fingerprint-auth";


export const authenticateWithBiometrics = async (): Promise<boolean> => {
  try {
    const result = await CapacitorFingerprintAuth.show();
    return result.verified;
  } catch (error) {
    console.error("Biometric authentication error:", error);
    return false;
  }
};
