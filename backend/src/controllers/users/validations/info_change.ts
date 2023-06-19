import { InferSchemaType } from "mongoose";

import UserModel from "@models/User";
import * as validation from './utils';

type User = InferSchemaType<typeof UserModel.schema>;

export default function info_change(data: User) {
    let errors: string[] = [];

    if (!validation.email(data.email)) {
        errors.push('I-mejl mora biti u ispravnom formatu.');
    }

    if (!validation.phone_number(data.phone_number)) {
        errors.push('Telefon mora biti u ispravnom formatu.');
    }

    if (data.profile_picture) {
        if (!validation.picture_format(data.profile_picture)) {
            errors.push('Profilna slika mora biti u JPG ili PNG formatu.');
        }
        if (!validation.picture_dimensions(data.profile_picture)) {
            errors.push('Rezolucija profilne slike mora biti u opsegu od 100px do 300px.');
        }
    }

    return errors.length > 0 ? errors : null;
}
