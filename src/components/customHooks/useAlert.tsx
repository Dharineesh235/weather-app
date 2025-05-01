import { useState } from "react";

export function useAlert(timeoutMs: number = 2000) {
  const [alert, setAlert] = useState(0);
  const [message, setMessage] = useState<string>("");

  const showAlert = (msg: string) => {
    setMessage(msg);
    setAlert(1);

    setTimeout(() => {
      setAlert(0);
      setMessage("");
    }, timeoutMs);
  };

  return { alert, message, setAlert, showAlert };
}
