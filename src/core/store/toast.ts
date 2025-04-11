import { defineStore } from 'pinia';
import type { ToastMessageOptions } from 'primevue';

export const useToastStore = defineStore('toast', {
  state: (): {
    title: string;
    message: string;
    severity: ToastMessageOptions['severity'];
  } => ({
    title: '',
    message: '',
    severity: undefined,
  }),

  actions: {
    onShowToast({
      title,
      message,
      severity,
    }: {
      title: string;
      message: string;
      severity: ToastMessageOptions['severity'];
    }) {
      this.title = title;
      this.message = message;
      this.severity = severity;
    },
  },
});
