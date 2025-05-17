# 📦 PixAPI

**PixAPI** é uma API simples e eficiente que gera QR Codes de pagamento via **PIX** a partir de uma chave e dados opcionais como valor, nome do recebedor e identificador da transação. Ideal para integrações rápidas ou geração de QR Codes dinâmicos.

---

## 🌐 Como acessar

Você pode usar a API de duas formas:

- **Publicamente** via:  
  [`https://pix.v7r.dev`](https://pix.v7r.dev)

- **Localmente**, após clonar e rodar o projeto (veja instruções abaixo)

---

## 🚀 Como funciona
A API possui uma única rota:

```bash
GET /:key
POST /:key
```
Você envia a **chave PIX** diretamente na URL e os demais dados via:

- `query params` (GET)
- ou corpo da requisição (POST, formato JSON)

A resposta será um **JSON** com:

```json
{
  "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA...",
  "copyAndPaste": "00020126580014BR.GOV.BCB.PIX...",
  "key": "00000000000",
  "amount": 25.5,
  "name": "Fulano da Silva",
  "reference": "Pedido123",
  "keyType": "cpf",
  "city": "São Paulo"
}
```

## 📥 Instalação e execução

```bash
git clone https://github.com/seu-usuario/pixapi.git
cd pixapi
yarn install
yarn dev
```

## 🧪 Exemplo de requisição

```
GET /00000000000?amount=25.50&name=Fulano%20da%20Silva&reference=Pedido123&keyType=cpf&city=São%20Paulo
```

| Parâmetro | Tipo   | Obrigatório | Descrição                                                        |
|-----------|--------|-------------|------------------------------------------------------------------|
| key       | string | ✅           | Chave PIX (Telefone, CPF, CNPJ, E-mail ou Aleatória)             |
| amount    | number | ❌           | Valor opcional a receber (mínimo 0)                              |
| name      | string | ✅           | Nome que será exibido ao escanear o QR Code (máx. 25 caracteres) |
| reference | string | ❌           | Identificador da transação (máx. 25 caracteres)                  |
| keyType   | enum   | ✅           | Tipo da chave: cpf, cnpj, email, telefone, outro                   |
| city      | string | ❌           | Cidade do beneficiário (máx. 25 caracteres) - padrão: "Brasil"   |

### 📌 Tipos válidos para keyType
- `cpf`
- `cnpj`
- `email`
- `phone`
- `random`


### 🧠 Tecnologias utilizadas
- [Express](https://expressjs.com/)
- [Zod](https://zod.dev/)
- [qrcode](https://www.npmjs.com/qrcode)
- [steplix-emv-qrcps](https://github.com/steplix/emv-qrcps) para formatação do payload do PIX

### :page_facing_up: Licença
Este projeto está sobre uma licença MIT - veja o arquivo da [LICENÇA](/LICENSE) para detalhes. 

### :mailbox_with_mail: Entre em contato!

<a href="mailto:victorgrodriguesm7@gmail.com" target="_blank" >
  <img alt="Email - Victor Gabriel" src="https://img.shields.io/badge/Email--%23F8952D?style=social&logo=gmail">
</a>
<a href="https://www.linkedin.com/in/victorgrodriguesm7/">
    <img src="https://img.shields.io/badge/Linkedin--%23F8952D?style=social&logo=linkedin">
</a>