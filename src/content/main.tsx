import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

const container = document.createElement("div");
container.id = "Unspend";
document.body.appendChild(container);
createRoot(container).render(<StrictMode>{/* <App /> */}</StrictMode>);
