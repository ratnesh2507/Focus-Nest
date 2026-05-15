import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import "./index.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <>
      <App />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#131a16",
            color: "#e8ebe6",
            border: "1px solid rgba(255,255,255,0.09)",
            borderRadius: "10px",
            fontFamily: '"Instrument Sans", system-ui, sans-serif',
            fontSize: "13px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
          },
          success: {
            iconTheme: {
              primary: "#4a8c5c",
              secondary: "#131a16",
            },
          },
        }}
      />
    </>
  </StrictMode>,
);
