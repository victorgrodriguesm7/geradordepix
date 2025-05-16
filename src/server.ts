import express from "express";
import { Request, Response } from 'express';
import { handleGenerateQrCode } from "./pix";

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.get("/", (_, res) => {
    res.status(200).json({ hello: "world!" });
})

app.route("/:key")
    .get((req: Request, res: Response) => {
        handleGenerateQrCode(req, res);
    })
    .post((req: Request, res: Response) => {
        handleGenerateQrCode(req, res);
    });

app.listen(port, () => {
    console.log(`Starting Server on port`, port)
});