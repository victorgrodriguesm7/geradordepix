import { Request, Response } from 'express';
import { PixQrCode, PixQrCodeSchema } from "./schema/pix.schema";
import BrCode from './lib/br.code';
import { generateQrCode } from './lib/qrcode';

const QR_CODE_SIZE = 400;

export const createPixQrCode = async (props: PixQrCode) => {
    const brCode = new BrCode(props);

    const code = brCode.generateCode();

    const qrCode = await generateQrCode(code, QR_CODE_SIZE);

    return { qrCode, copyAndPaste: code };
}

export const handleGenerateQrCode = async (req: Request, res: Response) => {
    try {
        const result = PixQrCodeSchema.safeParse({ ...req.params, ...req.body, ...req.query});

        if (!result.success)
            return res.status(400).json({ error: result.error.errors }).send()
        
        const { qrCode, copyAndPaste } = await createPixQrCode(result.data);

        return res.status(200).json({
            image: qrCode,
            copyAndPaste, 
            ...result.data
        });
    } catch (error) {
        return res.status(500).json({
            error: "Ocorreu um erro"
        }).send();
    }
}