import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.css";
async function initServiceWorker() {
  let swRegistration = await navigator.serviceWorker.register(
    "/freshtrack/sw.js",
    { scope: "/freshtrack/" }
  );
  let pushManager = swRegistration.pushManager;

  if (!pushManager) {
    alert("PushManager is not active");
    return;
  }

  let permissionState = await pushManager.permissionState({
    userVisibleOnly: true,
  });
  switch (permissionState) {
    case "prompt":
      console.log("Push permission must be requested");
      break;
    case "granted":
      console.log("Push permission already granted");
      break;
    case "denied":
      console.log("Push permission denied");
  }
}

if (navigator.serviceWorker) {
  initServiceWorker();
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
