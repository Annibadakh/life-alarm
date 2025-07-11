import { useState } from "react";
import { addTask } from "../utils/localStorageUtils";
import { v4 as uuidv4 } from "uuid";

export default function AddTaskForm({ onTaskAdded }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("daily");
  const [dateOrDay, setDateOrDay] = useState("");

  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim() || (type !== "daily" && !dateOrDay)) {
      alert("Please fill all required fields.");
      return;
    }

    const newTask = {
      id: uuidv4(),
      title,
      description,
      type,
      dateOrDay: type === "daily" ? null : dateOrDay,
      createdAt: new Date().toISOString(),
    };

    addTask(newTask);
    onTaskAdded(); // notify parent to re-fetch
    setTitle("");
    setDescription("");
    setType("daily");
    setDateOrDay("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded-xl shadow-md space-y-4 w-full max-w-lg mx-auto">
      <h2 className="text-xl font-semibold text-gray-800">Add New Task</h2>

      <div>
        <label className="block mb-1 font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="e.g. Weekly Contest"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium text-gray-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="Describe the task..."
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium text-gray-700">Task Type</label>
        <select
          value={type}
          onChange={(e) => {
            setType(e.target.value);
            setDateOrDay(""); // reset date/day input
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="daily">Daily</option>
          <option value="date">Date Specific</option>
          <option value="recurring">Recurring Weekly</option>
        </select>
      </div>

      {type === "date" && (
        <div>
          <label className="block mb-1 font-medium text-gray-700">Date</label>
          <input
            type="date"
            value={dateOrDay}
            onChange={(e) => setDateOrDay(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
      )}

      {type === "recurring" && (
        <div>
          <label className="block mb-1 font-medium text-gray-700">Day of Week</label>
          <select
            value={dateOrDay}
            onChange={(e) => setDateOrDay(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">-- Select Day --</option>
            {daysOfWeek.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>
      )}

      <button
        type="submit"
        className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
      >
        Add Task
      </button>
    </form>
  );
}
