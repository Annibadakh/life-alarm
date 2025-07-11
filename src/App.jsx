import { useEffect, useState } from "react";
import AddTaskForm from "./components/AddTaskForm";
import TaskList from "./components/TaskList";
import { requestNotificationPermission, showTodayNotifications } from "./utils/notificationUtils";

function App() {
  const [taskTrigger, setTaskTrigger] = useState(0);

  const handleTaskAdded = () => {
    setTaskTrigger(taskTrigger + 1);
  };

  useEffect(() => {
    // Ask for browser permission
    requestNotificationPermission();

    // Check last notified date and trigger today's notification only once per day
    const lastNotified = localStorage.getItem("life_alarm_last_notified");
    const todayDate = new Date().toISOString().split("T")[0];

    if (lastNotified == todayDate) {
      showTodayNotifications();
      localStorage.setItem("life_alarm_last_notified", todayDate);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
        Life Alarm 🔔
      </h1>

      <AddTaskForm onTaskAdded={handleTaskAdded} />
      <TaskList key={taskTrigger} />
    </div>
  );
}

export default App;
