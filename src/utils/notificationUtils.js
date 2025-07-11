import { getTasks } from "./localStorageUtils";

export function requestNotificationPermission() {
  if ("Notification" in window) {
    if (Notification.permission === "default") {
      Notification.requestPermission();
    }
  }
}

export function showTodayNotifications() {
  if (Notification.permission !== "granted") return;

  const tasks = getTasks();
  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];
  const weekday = today.toLocaleDateString("en-US", { weekday: "long" });

  const todayTasks = tasks.filter((task) => {
    if (task.type === "daily") return true;
    if (task.type === "date" && task.dateOrDay === todayStr) return true;
    if (task.type === "recurring" && task.dateOrDay === weekday) return true;
    return false;
  });

  if (todayTasks.length === 0) return;

  const body = [`📝 You have ${todayTasks.length} task${todayTasks.length !== 1 && "s"} today:\n`]
    .concat(
      todayTasks.map((task, index) => `${index + 1}. ${task.title} - ${task.description}`)
    )
    .join("\n");

  new Notification("Life Alarm 🔔", {
    body,
    icon: "./alarmlogo.png",
  });
}
