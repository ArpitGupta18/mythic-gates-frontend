import { Service, signal } from '@angular/core';

export type ToastType = 'success' | 'info' | 'warning' | 'error';

export interface ToastMessage {
  message: string;
  type: ToastType;
}

@Service()
export class Toast {
  toast = signal<ToastMessage | null>(null);

  show(message: string, type: ToastType = 'info') {
    this.toast.set({ message, type });

    setTimeout(() => {
      this.toast.set(null);
    }, 3000);
  }

  success(message: string) {
    this.show(message, 'success');
  }

  warning(message: string) {
    this.show(message, 'warning');
  }

  error(message: string) {
    this.show(message, 'error');
  }

  info(message: string) {
    this.show(message, 'info');
  }
}
