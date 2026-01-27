import * as crypto from "crypto";
import CryptoJS from "crypto-js";
/**
 * Derives a 3DES encryption key from a plain key (similar to tenant ID)
 * @param plainKey - The plain key to derive the 3DES key from
 * @returns 24-byte key suitable for 3DES encryption
 */
function derive3DesKeyFromPlainKey(plainKey: string): Buffer {
  // Create a fixed-length key based on the plainKey using SHA256
  const hash = crypto.createHash("sha256").update(plainKey, "utf8").digest();

  // 3DES requires a 24-byte (192-bit) key
  const keyBytes = Buffer.alloc(24);
  hash.copy(keyBytes, 0, 0, 24);

  return keyBytes;
}

/**
 * Encrypts a string using 3DES with the provided plain key
 * @param plainText - Text to encrypt
 * @param plainKey - Key used to derive the encryption key
 * @param strictMode - If true, throws errors; if false, returns original text on error
 * @returns Base64 encoded encrypted string
 */
export function encryptWith3Des(plainText: string, plainKey: string, strictMode: boolean = true): string {
  try {
    const keyBytes = derive3DesKeyFromPlainKey(plainKey);

    // Create cipher using 3DES in ECB mode
    // const cipher = crypto.createCipher("des-ede3", keyBytes);

    // For ECB mode with manual padding, we need to use the low-level approach
    const algorithm = "des-ede3-ecb";
    const cipherEcb = crypto.createCipheriv(algorithm, keyBytes, null);
    cipherEcb.setAutoPadding(true); // This handles PKCS7 padding

    let encrypted = cipherEcb.update(plainText, "utf8", "base64");
    encrypted += cipherEcb.final("base64");

    return encrypted;
  } catch (error) {
    if (strictMode) {
      throw error;
    }
    return plainText;
  }
}
function derive3DesKeyFromPlainKeyClient(plainKey: string) {
  // Create a fixed-length key based on the plainKey using SHA256
  const hash = CryptoJS.SHA256(plainKey);

  // 3DES requires a 24-byte (192-bit) key
  // Take first 24 bytes (6 words of 32 bits each = 192 bits)
  const keyWords = [];
  for (let i = 0; i < 6; i++) {
    keyWords.push(hash.words[i] || 0);
  }

  return CryptoJS.lib.WordArray.create(keyWords, 24);
}

/**
 * Encrypts a string using 3DES with the provided plain key
 * @param {string} plainText - Text to encrypt
 * @param {string} plainKey - Key used to derive the encryption key
 * @param {boolean} strictMode - If true, throws errors; if false, returns original text on error
 * @returns {string} Base64 encoded encrypted string
 */
export function encryptWith3DesClient(plainText: string, plainKey: string, strictMode: boolean = false): string {
  try {
    const keyBytes = derive3DesKeyFromPlainKeyClient(plainKey);

    // Encrypt using 3DES in ECB mode with PKCS7 padding (default)
    const encrypted = CryptoJS.TripleDES.encrypt(plainText, keyBytes, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });

    return encrypted.toString();
  } catch (error) {
    if (strictMode) {
      throw error;
    }
    return plainText;
  }
}

/**
 * Decrypts a 3DES encrypted string using the provided plain key
 * @param encryptedData - Base64 encoded encrypted data
 * @param plainKey - Key used to derive the encryption key
 * @param strictMode - If true, throws errors; if false, returns original data on error
 * @returns Decrypted string or original string if decryption fails
 */
export function decryptWith3Des(encryptedData: string, plainKey: string, strictMode: boolean = false): string {
  try {
    const keyBytes = derive3DesKeyFromPlainKey(plainKey);

    // Create decipher using 3DES in ECB mode
    const algorithm = "des-ede3-ecb";
    const decipher = crypto.createDecipheriv(algorithm, keyBytes, null);
    decipher.setAutoPadding(true); // This handles PKCS7 padding

    let decrypted = decipher.update(encryptedData, "base64", "utf8");
    decrypted += decipher.final("utf8");

    return decrypted;
  } catch (error) {
    if (strictMode) {
      throw error;
    }
    return encryptedData;
  }
}

export function decryptWith3DesClient(encryptedData: string, plainKey: string, strictMode: boolean = true): string {
  try {
    const keyBytes = derive3DesKeyFromPlainKeyClient(plainKey);

    const decrypted = CryptoJS.TripleDES.decrypt(encryptedData, keyBytes, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });

    return decrypted.toString(CryptoJS.enc.Utf8); // Decode as UTF-8
  } catch (error) {
    if (strictMode) throw error;
    return encryptedData;
  }
}

// Optional: Extension-style functions if you prefer that approach
declare global {
  interface String {
    encryptWith3Des(plainKey: string, strictMode?: boolean): string;
    encryptWith3DesClient(plainKey: string, strictMode?: boolean): string;
    decryptWith3Des(plainKey: string, strictMode?: boolean): string;
  }
}

String.prototype.encryptWith3DesClient = function (plainKey, strictMode = false) {
  return encryptWith3DesClient(this.toString(), plainKey, strictMode);
};

String.prototype.encryptWith3Des = function (plainKey: string, strictMode: boolean = false): string {
  return encryptWith3Des(this.toString(), plainKey, strictMode);
};

String.prototype.decryptWith3Des = function (plainKey: string, strictMode: boolean = false): string {
  return decryptWith3Des(this.toString(), plainKey, strictMode);
};
