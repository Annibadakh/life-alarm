const TASK_KEY = "life_alarm_tasks";

export function getTasks() {
  return JSON.parse(localStorage.getItem(TASK_KEY)) || [];
}

export function saveTasks(tasks) {
  localStorage.setItem(TASK_KEY, JSON.stringify(tasks));
}

export function addTask(task) {
  const tasks = getTasks();
  tasks.push(task);
  saveTasks(tasks);
}

export function deleteTask(id) {
  const tasks = getTasks().filter(t => t.id !== id);
  saveTasks(tasks);
}
