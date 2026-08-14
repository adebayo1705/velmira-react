import { createContext, useContext, useRef, useState } from "react";

const ToastContext = createContext();

export function ToastProvider({ children }) {

  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success",
  });

  const timeoutRef = useRef(null);

  const showToast = (message, type = "success") => {

    // Clear previous timer
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setToast({
      visible: true,
      message,
      type,
    });

    timeoutRef.current = setTimeout(() => {

      setToast({
        visible: false,
        message: "",
        type: "success",
      });

    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>

      {children}

      {/* ==================== GLOBAL TOAST ==================== */}

      <div
        className={`velmira-toast ${
          toast.visible ? "velmira-toast-show" : ""
        } ${toast.type}`}
      >

        <div className="velmira-toast-icon">

          {toast.type === "success" && "✓"}

          {toast.type === "error" && "✕"}

          {toast.type === "info" && "i"}

        </div>

        <span>
          {toast.message}
        </span>

      </div>

    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}