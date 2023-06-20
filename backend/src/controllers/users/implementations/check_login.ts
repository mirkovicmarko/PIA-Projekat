import { Response } from "express";

import { SESSION_DATA } from "@consts";

export default function check_login(req, res: Response) {
    if(req.session[SESSION_DATA.user_id]) {
        res.json({ user_id: req.session[SESSION_DATA.user_id], user_type: req.session[SESSION_DATA.user_type] });
    }
    else {
        res.statusCode = 401;
        res.send();
    }
};
