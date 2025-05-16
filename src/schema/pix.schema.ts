import { z } from "zod";
import { KeyType } from "../enums";

export const PixQrCodeSchema = z.object({
    key: z.string({
        description: "Chave PIX - Telefone, CPF, CNPJ, Email ou Aleatória",
        required_error: "Chave Obrigatória"
    }),
    amount: z.number({
        coerce: true,
        description: "(Opcional) Valor que você quer receber",
        invalid_type_error: "Valor inválido!"
    }).min(0, "Valor não pode ser menor que 0!").nullish(),
    name: z.string({
        description: "Nome que será exibido ao escanear QR Code",
        required_error: "Nome é obrigatório!"
    }).max(25, "Nome até 24 Caracteres!"),
    reference: z.string({
        description: "(Opcional) Identificador da Transação!",
    }).max(25, "Identificador deve ter até 24 Caracteres!").nullish(),
    keyType: z.nativeEnum(KeyType, {
        errorMap: (_, ctx) => ({ message: `O KeyType '${ctx.data}' é inválido. Deve ser um dos seguintes valores: ${Object.values(KeyType).join(", ")}`}),
    }),
    city: z.string({
        description: "(Opcional) Cidade do beneficiário - Padrão: Brasil",
    }).max(25, "Cidade deve ter até 15 Caracteres").nullish().default("Brasil"),
});

export type PixQrCode = z.infer<typeof PixQrCodeSchema>