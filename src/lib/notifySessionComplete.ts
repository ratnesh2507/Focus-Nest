import toast from "react-hot-toast";

export async function notifySessionComplete() {
  // In-app toast
  toast.success("🎉 Study session completed!");

  // Browser notification
  if ("Notification" in window) {
    if (Notification.permission === "default") {
      await Notification.requestPermission();
    }

    if (Notification.permission === "granted") {
      new Notification("Focus Nest", {
        body: "Your study session is complete.",
      });
    }
  }

  const audio = new Audio("/alarm.mp3");
  audio.play().catch(() => {
    // Ignore autoplay restrictions if sound cannot play
  });
}
