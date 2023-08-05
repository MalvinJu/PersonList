import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(private toastService: MatSnackBar) { }

  show(
    message: string,
    position: 'bottom' | 'top' = 'bottom',
    showCloseButton: boolean = false,
    duration: number = 2500,
    color:
      | 'primary'
      | 'warn'
      | 'alert' = 'primary' ) {
        this.toastService.open(message, showCloseButton ? "Close" : "", {
          duration: duration,
          panelClass: ['mat-toolbar', `mat-${color}`],
          verticalPosition: position
        });
    }
}
