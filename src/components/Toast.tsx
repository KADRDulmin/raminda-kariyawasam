import { Toaster, toast } from 'sonner';
import { useStore } from '@nanostores/react';
import { notificationStore } from '../stores/notificationStore';
import { useEffect } from 'react';

export default function Toast() {
  const notification = useStore(notificationStore);

  useEffect(() => {
    if (notification) {
      switch (notification.type) {
        case 'success':
          toast.success(notification.message);
          break;
        case 'error':
          toast.error(notification.message);
          break;
        case 'info':
          toast.info(notification.message);
          break;
      }
    }
  }, [notification]);

  return (
    <Toaster
      position="top-right"
      expand={false}
      richColors
      theme="dark"
      toastOptions={{
        style: {
          background: 'var(--glass-background)',
          border: 'var(--glass-border)',
          backdropFilter: 'blur(10px)',
        },
      }}
    />
  );
}
