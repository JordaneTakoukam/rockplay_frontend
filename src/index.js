import "./polyfill";
import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import configureStore from "./redux/configStore";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { ToastProvider } from "react-toast-notifications";
import { BrowserRouter } from "react-router-dom";
import { Web3ReactProvider } from "@web3-react/core";
import { ethers } from "ethers";
import "react-toastify/dist/ReactToastify.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import "assets/scss/style.scss";
import "assets/scss/dice.scss";
import "assets/scss/fonts.scss";
import "assets/scss/timer.scss";

const getLibrary = (provider) => {
    const library = new ethers.providers.Web3Provider(provider);
    library.pollingInterval = 8000;
    return library;
};

// Fonction pour intégrer Tawk.to
const integrateTawkTo = () => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = "https://embed.tawk.to/6762a8f149e2fd8dfef9cdbc/1ifcm7snd";
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");
    document.body.appendChild(script);
};

const RootComponent = () => {
    useEffect(() => {
        integrateTawkTo(); // Charger Tawk.to une fois le composant monté
    }, []);

    return (
        <Provider store={configureStore()}>
            <ToastContainer />
            <BrowserRouter>
                <ToastProvider>
                    <Web3ReactProvider getLibrary={getLibrary}>
                        <App />
                    </Web3ReactProvider>
                </ToastProvider>
            </BrowserRouter>
        </Provider>
    );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RootComponent />);

serviceWorker.unregister();
