import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ToastClassesType, ToastPositionsType } from '../interfaces/toast.type';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private toastrService: ToastrService) {}

  /**
   * Bu fonksiyon ekrana bildirim mesajlarını gösterir.
   * @param message : Gösterilmek istenen mesajdır.
   * @param title : Mesajın başlık bilgisini tutar.
   * @param code : Mesajın code bilgisini tutar.
   * @param type : Mesajın tipini tutar.
   * @param position : Mesajın ekranın neresinde gösterilmek istendiğini
   * bilgisini tutar.
   */
  show(
    message: string = 'success_message',
    type: ToastClassesType = 'success',
    position: ToastPositionsType = 'bottom-right',
    title?: string,
    code?: string
  ) {
    const prefix: string = 'toast-';
    position = (prefix + position) as ToastPositionsType;
    type = (prefix + type) as ToastClassesType;
    title = title;
    message = message + (code ? '<br>' + code : '');
    this.toastrService.show(
      message,
      title,
      {
        positionClass: position,
        progressBar: true,
        enableHtml: true,
      },
      type
    );
  }
}
