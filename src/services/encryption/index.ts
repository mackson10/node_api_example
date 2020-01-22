import simpleEncryptor, { SimpleEncryptor } from "simple-encryptor";
import config from "../../config";

class CryptoService {
  private encryptor: SimpleEncryptor;
  constructor(privateKey: string) {
    this.encryptor = simpleEncryptor(privateKey);
  }

  encode(raw: string): string {
    return this.encryptor.encrypt(raw);
  }

  encodeObj(obj: object): string | null {
    try {
      return this.encode(JSON.stringify(obj));
    } catch (e) {
      return null;
    }
  }

  decode(encoded: string): string {
    const decoded = this.encryptor.decrypt(encoded);
    return decoded;
  }

  decodeObj(encoded: string): object | null {
    const decodedString = this.decode(encoded);
    try {
      return JSON.parse(decodedString);
    } catch (e) {
      return null;
    }
  }
}

export default new CryptoService(config.encryptionKey);
