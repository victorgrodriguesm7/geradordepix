
import QRCode from 'qrcode';

export const generateQrCode = async (code: string, size: number): Promise<string> => {
    return QRCode.toDataURL(code, { width: size, height: size });
}