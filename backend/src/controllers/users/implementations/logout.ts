import { Response } from "express";

export default function logout(req, res: Response) {
    req.session.destroy();
    res.send();
}