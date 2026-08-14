import "../../styles/toast.css";
import { FaCheck, FaTimesCircle } from "react-icons/fa";

function Toast({ visible, message, type }) {
  if (!visible) {
    return null;
  }

  return (
    <div className={`toast ${type}`}>
      <div className="toast-icon">
        {type === "success" ? (
          <FaCheck />
        ) : (
          <FaTimesCircle />
        )}
      </div>

      <span>{message}</span>
    </div>
  );
}

export default Toast;