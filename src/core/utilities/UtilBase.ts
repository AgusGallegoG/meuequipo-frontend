export class UtilBase {
  static isObjectEmpty(obj: any): boolean {
    return obj && typeof obj === 'object' && Object.keys(obj).length === 0;
  }

  public static isDefined<T>(value: T): boolean {
    return typeof value !== 'undefined';
  }

  public static isString<T>(value: T): boolean {
    return typeof value === 'string';
  }

  public static isNumber<T>(value: T): boolean {
    return typeof value === 'number';
  }

  public static isDefault<T>(value: T, defaultValue: T): boolean {
    return JSON.stringify(value) === JSON.stringify(defaultValue);
  }

  public static isNullOrEmpty(data: string): boolean {
    return !(
      UtilBase.isDefined(data) &&
      data !== null &&
      UtilBase.isString(data) &&
      data.trim().length > 0
    );
  }

  public static exist<T>(value: T): boolean {
    return UtilBase.isDefined(value) && value !== null;
  }

  public static wait(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  public static getYear(date: Date): string {
    return date.getFullYear().toString();
  }

  private static convertBase64ToBlob(base64: string, filename: string, type: string) {
    const byteString = window.atob(base64);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const file = new File([ab], filename, { type });
    return new Blob([file], { type: 'octet/stream' });
  }

  private static onDownload(blob: Blob, title: string) {
    const link = document.createElement('a');
    document.body.appendChild(link);
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = title;
    link.click();
    window.URL.revokeObjectURL(url);
  }

  public static onDownloadBase64(base64: string, filename: string, type: string) {
    const blob = this.convertBase64ToBlob(base64, filename, type);
    this.onDownload(blob, filename);
  }

  /**
   * Devuelve true si estamos en modo desarrollo -> npm run local
   *
   * @param mode Desarrollo/ produccion /pruebas
   */
  public static checkEnvironment(mode = 'development'): boolean {
    return import.meta.env.MODE === mode;
  }

  public static cloneVueProxy(proxy) {
    const raw = toRaw(proxy);
    return this.deepClone(raw);
  }

  static deepClone(obj) {
    if (obj === null || typeof obj !== 'object') return obj;
    if (obj instanceof Date) return new Date(obj);
    if (obj instanceof Array) return obj.map(this.deepClone.bind(this));
    if (obj instanceof File) {
      return new File([obj], obj.name, {
        type: obj.type,
        lastModified: obj.lastModified,
      });
    }

    const cloned = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        cloned[key] = this.deepClone(obj[key]);
      }
    }
    return cloned;
  }
}
