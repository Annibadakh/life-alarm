export default function TaskItem({ task, onDelete }) {
  return (
    <div className="p-4 border rounded-lg shadow-sm flex justify-between items-start bg-gray-50">
      <div>
        <h3 className="text-lg font-semibold">{task.title}</h3>
        <p className="text-sm text-gray-700 mb-1">{task.description}</p>
        <p className="text-xs text-gray-500 italic">
          Type: {task.type}{" "}
          {task.type !== "daily" && `- ${task.dateOrDay}`}
        </p>
      </div>

      <button
        onClick={() => onDelete(task.id)}
        className="text-red-600 hover:text-red-800 font-medium text-sm"
      >
        Delete
      </button>
    </div>
  );
}
