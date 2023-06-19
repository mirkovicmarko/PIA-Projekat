import { Response } from "express";

import { SESSION_DATA } from "@consts";

export default function check_login_impl(req, res: Response) {
    if(req.session[SESSION_DATA.user_id]) {
        res.json({ id_korisnika: req.session[SESSION_DATA.user_id], tip_korisnika: req.session[SESSION_DATA.user_type] });
    }
    else {
        res.statusCode = 401;
        res.send();
    }
};
