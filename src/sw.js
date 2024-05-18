import { cleanupOutdatedCaches, precacheAndRoute } from "workbox-precaching";

cleanupOutdatedCaches();

precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener("push", (event) => {
  let pushData = event.data.json();
  if (!pushData || !pushData.title) {
    console.error(
      "Received WebPush with an empty title. Received body: ",
      pushData
    );
  }
  const unreadCount = pushData.unreadCount;
  if (navigator.setAppBadge) {
    console.log("setAppBadge available");
    if (unreadCount && unreadCount > 0) {
      navigator.setAppBadge(unreadCount);
    } else {
      navigator.clearAppBadge();
    }
  } else {
    console.log("No setAppBadge available");
  }

  self.registration.showNotification(pushData.title, pushData).then(() => {});
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();

  if (!event.notification.data) {
    console.error(
      "Click on WebPush with empty data, where url should be. Notification: ",
      event.notification
    );
    return;
  }
  if (!event.notification.data.url) {
    console.error(
      "Click on WebPush without url. Notification: ",
      event.notification
    );
    return;
  }

  clients.openWindow(event.notification.data.url).then(() => {});
});

self.addEventListener("install", (event) => {
  console.log("Service Worker installed");
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker activated");
});
