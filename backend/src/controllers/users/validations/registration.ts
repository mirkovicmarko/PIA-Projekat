import { InferSchemaType } from "mongoose";

import UserModel from "@models/User";
import * as validation from './utils';

type User = InferSchemaType<typeof UserModel.schema>;

export default function registration(data: User) {
    let errors: string[] = [];

    if (!validation.password(data.password)) {
        errors.push('Lozinka mora biti dužine od 8 do 16 i da sadrži minimum: 1 malo slovo, 1 veliko slovo, 1 specijalni karakter i 1 broj.');
    }

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
