// hooks/useModalConfirm.ts
const confirmCallbackRef = { current: () => { } };

export const useModalConfirm = () => {
  const setCallback = (fn: () => void) => {
    confirmCallbackRef.current = fn;
  };

  const runCallback = () => {
    if (confirmCallbackRef.current) {
      confirmCallbackRef.current();
    }
  };

  return { setCallback, runCallback };
};

export const confirmRef = confirmCallbackRef;
