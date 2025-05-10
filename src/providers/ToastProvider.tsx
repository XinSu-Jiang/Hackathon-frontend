import { useToastStore } from '@/store/useToastStore';
import Toast from '@/components/Toast';

const ToastProvider = () => {
  const toastList = useToastStore((state) => state.toastList);

  return (
    <div
      id="toast-container"
      className="pointer-events-none fixed bottom-13 left-1/2 z-[9999] flex w-full -translate-x-1/2 transform flex-col items-center gap-2 p-4"
    >
      {toastList.map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </div>
  );
};

export default ToastProvider;
