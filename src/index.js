import "./styles.css";
import { createRoot } from "react-dom/client";
import Experience from "./Experience";
import { StrictMode } from "react";

const root = createRoot(document.getElementById('root'))

root.render(
    <StrictMode>
        <Experience />
    </StrictMode>
);