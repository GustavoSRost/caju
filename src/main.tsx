import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import './index.css'
import 'primereact/resources/themes/saga-blue/theme.css';  // Tema PrimeReact
import 'primereact/resources/primereact.min.css';           // CSS do PrimeReact
import 'primeicons/primeicons.css';                         // Ícones PrimeReact

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
