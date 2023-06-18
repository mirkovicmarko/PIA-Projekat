import sizeOf from 'image-size';

export function password(password: string) {
    const regex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{7,12}$/);
    return regex.test(password);
}

export function email(email: string) {
    const regex = new RegExp(/^[a-z][a-z\d]*@[a-z]+\.[a-z]+$/i);
    return regex.test(email);
}

export function phone_number(phone_number: string) {
    const regex = new RegExp(/^[\+]?[0-9]{10,12}$/);
    return regex.test(phone_number);
}

export function picture_format(picture: string) {
    const base64_format = picture.split('base64,')[0];

    const regex = new RegExp(/.((png)|(jpg)|(jpeg))./i);
    return regex.test(base64_format);
}

export function picture_dimensions(picture: string) {
    const base64_picture_string = picture.split('base64,')[1];
    const picture_picture = Buffer.from(base64_picture_string, 'base64');
    const dimensions = sizeOf(picture_picture);

    return dimensions.height >= 100 && dimensions.height <= 300
        && dimensions.width >= 100 && dimensions.width <= 300;
}
