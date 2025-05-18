import express from "express";
import { Request, Response } from 'express';
import cors from "cors";
import { handleGenerateQrCode } from "./pix";

const app = express();

app.use(express.json());
app.use(cors());

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

export {
    app
};