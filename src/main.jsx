import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "../index.css";
import SpinnerFullPage from "./components/SpinnerFullPage.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <React.Suspense fallback={<SpinnerFullPage/>}>
            <App/>
        </React.Suspense>
    </React.StrictMode>
);
