import ReactDOM from "react-dom/client";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const domNode = document.getElementById("root");
const root = ReactDOM.createRoot(domNode as HTMLElement);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
