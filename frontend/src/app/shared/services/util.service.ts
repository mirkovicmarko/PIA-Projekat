import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  image_file_to_base64(image_file: File) {
    const reader = new FileReader();

    return new Promise((success, _failure) => {
      reader.onerror = () => {
        reader.abort();
      };

      reader.onload = () => {
        success(reader.result);
      };

      reader.readAsDataURL(image_file);
    });
  }

  data_file_to_text(file: File) {
    const reader = new FileReader();

    return new Promise((success, _failure) => {
      reader.onerror = () => {
        reader.abort();
      };

      reader.onload = () => {
        success(reader.result);
      };

      reader.readAsText(file);
    });
  };
}
