import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.css";
import { registerSW } from "virtual:pwa-register";

// async function initServiceWorker() {
//   let swRegistration = await navigator.serviceWorker.register(
//     "/freshtrack/sw.js",
//     { scope: "/freshtrack/" }
//   );
//   let pushManager = swRegistration.pushManager;

//   if (!pushManager) {
//     alert("PushManager is not active");
//     return;
//   }

//   let permissionState = await pushManager.permissionState({
//     userVisibleOnly: true,
//   });
//   switch (permissionState) {
//     case "prompt":
//       console.log("Push permission must be requested");
//       break;
//     case "granted":
//       console.log("Push permission already granted");
//       break;
//     case "denied":
//       console.log("Push permission denied");
//   }
// }

// if (navigator.serviceWorker) {
//   initServiceWorker();
// }

console.log("starting registration");

registerSW({
  onRegisteredSW: (swScriptUrl, registration) => {
    console.log("registering: " + swScriptUrl + " " + registration);
  },
  onRegisterError(error) {
    console.error("Service worker registration error:", error);
  },
})();

console.log("initiated registration");

// // Check if the browser supports service workers
// if ("serviceWorker" in navigator) {
//   // Create a new instance of Workbox
//   const wb = new Workbox("/service-worker.js"); // Path to your service worker file

//   // Register the service worker
//   wb.register()
//     .then((registration) => {
//       // Service worker registered successfully
//       console.log("Service worker registered: ", registration);
//     })
//     .catch((error) => {
//       // Failed to register service worker
//       console.error("Service worker registration failed: ", error);
//     });
// }

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
