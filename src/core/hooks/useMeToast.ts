import { useToast, type ToastMessageOptions } from 'primevue';

export const useMeToast = () => {
  const toast = useToast();

  const DEFAULT_SEVERITY: ToastMessageOptions['severity'] = 'info';

  const showToast = ({
    message = '',
    title = '',
    severity = DEFAULT_SEVERITY,
    life = 3000,
  }: {
    message?: string;
    title?: string;
    severity?: ToastMessageOptions['severity'];
    life?: number;
  }) => {
    toast.add({ severity, summary: title, detail: message, life });
  };

  return { showToast };
};
