import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
// SPREMEMBA: omogoči PWA + obvestilo o novi verziji
serviceWorkerRegistration.register({
    onUpdate: (registration) => {
        const userWantsRefresh = window.confirm(
            "Na voljo je nova različica aplikacije. Želite osvežiti?"
        );
        if (userWantsRefresh) {
            // Pove service workerju naj takoj prevzame kontrolo
            if (registration.waiting) {
                registration.waiting.postMessage({ type: "SKIP_WAITING" });
            }

            // Osveži aplikacijo
            window.location.reload();
        }
    },
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
