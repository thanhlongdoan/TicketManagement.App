import { createContext, ReactNode, useContext } from "react";
import { toast, ToastContainer, TypeOptions, ToastPosition } from "react-toastify";

interface IContext {
  toast: typeof toast;
}

const initialContext = {
  toast,
};

const ToastContext = createContext<IContext>(initialContext);

interface Props {
  children: ReactNode;
}
export const ToastProvider: React.FC<Props> = ({ children }) => {
  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <ToastContainer
        hideProgressBar
        toastClassName={(value?: {
          type?: TypeOptions;
          defaultClassName?: string;
          position?: ToastPosition;
          rtl?: boolean;
        }) => {
          switch (value?.type) {
            case "error":
              return `ErrorCustom ${value?.defaultClassName}`;
            default:
              return `SuccessCustom ${value?.defaultClassName}`;
          }
        }}
      />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const value = useContext(ToastContext);
  return {
    ...value,
  };
};
