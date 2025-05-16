import pkg from 'steplix-emv-qrcps';
const { Merchant } = pkg;

import { stripHtml } from "string-strip-html";
import type { PixQrCode } from '../schema/pix.schema';
import { KeyType } from '../enums';

export default class BrCode {
    key: PixQrCode["key"];
    amount: PixQrCode["amount"];
    name: PixQrCode["name"];
    reference: PixQrCode["reference"];
    keyType: PixQrCode["keyType"];
    city: PixQrCode["city"];

    constructor({ key, amount, name, reference, keyType, city}: PixQrCode) {
        this.key = this.normalize(key);
        this.amount = amount;
        this.name = this.normalize(name);
        this.reference = this.normalize(reference);
        this.keyType = keyType;
        this.city = this.normalize(city);
    }

    formatText(text: string | null) {
        if (!text) return '';

        return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
    }

    normalize<T>(text: T) {
        if (text != null) {
            return stripHtml(`${text}`).result;
        }

        return text;
    }

    formatedName() {
        return this.formatText(this.name);
    }

    formatedCity() {
        return this.formatText(this.city);
    }

    formatedAmount() {
        if (this.amount) {
            return this.amount.toString().replace('.', '').replace(',', '.').replace(' ', '').replace("R$", '');
        }
        else {
            return ''
        }
    }

    formatedReference() {
        return this.formatText(this.reference ?? '').replace(' ', '');
    }

    formated_key() {
        var rkey = this.key;
        var ktype = this.keyType.toLowerCase();

        if (ktype == KeyType.Telefone || ktype == KeyType.Cnpj || ktype == KeyType.Cpf) {
            rkey = rkey.replace(/\D/g, '');
        }

        if (ktype == KeyType.Telefone) {
            rkey = "+55" + rkey
        }

        return rkey.trim()
    }

    generateCode() {
        var emvqr = Merchant.buildEMVQR();

        emvqr.setPayloadFormatIndicator("01");
        emvqr.setCountryCode("BR")
        emvqr.setMerchantCategoryCode("0000");
        emvqr.setTransactionCurrency("986");
        const merchantAccountInformation = Merchant.buildMerchantAccountInformation();
        merchantAccountInformation.setGloballyUniqueIdentifier("BR.GOV.BCB.PIX");

        merchantAccountInformation.addPaymentNetworkSpecific("01", this.formated_key());

        emvqr.addMerchantAccountInformation("26", merchantAccountInformation);

        if (this.name) {
            emvqr.setMerchantName(this.formatedName());
        }

        if (this.city) {
            emvqr.setMerchantCity(this.formatedCity());
        }

        if (this.amount && this.amount != null) {
            emvqr.setTransactionAmount(this.formatedAmount());
        }

        const additionalDataFieldTemplate = Merchant.buildAdditionalDataFieldTemplate();

        if (this.reference) {
            additionalDataFieldTemplate.setReferenceLabel(this.formatedReference());
        }
        else {
            additionalDataFieldTemplate.setReferenceLabel("***");
        }

        emvqr.setAdditionalDataFieldTemplate(additionalDataFieldTemplate);
        return emvqr.generatePayload();
    }
}