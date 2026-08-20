import { useState } from "react";
import "./app.css";

/**
 * @typedef {Object} Task
 * @property {number} id
 * @property {string} text
 * @property {boolean} completed
 */

function App() {
  const [task, setTask] = useState("");

  /** @type {[Task[], Function]} */
  const [tasks, setTasks] = useState([]);

  function addTask() {
    if (task.trim() === "") {
      alert("Enter Task");
      return;
    }

    const newTask = {
      id: Date.now(),
      text: task,
      completed: false,
    };

    setTasks(
      /** @param {Task[]} oldTasks */
      (oldTasks) => [...oldTasks, newTask]
    );

    setTask("");
  }

  /**
   * @param {number} id
   */
  function deleteTask(id) {
    setTasks(
      /** @param {Task[]} oldTasks */
      (oldTasks) =>
        oldTasks.filter(
          /** @param {Task} task */
          (task) => task.id !== id
        )
    );
  }

  /**
   * @param {number} id
   */
  function toggleTask(id) {
    setTasks(
      /** @param {Task[]} oldTasks */
      (oldTasks) =>
        oldTasks.map(
          /** @param {Task} task */
          (task) =>
            task.id === id
              ? {
                  ...task,
                  completed: !task.completed,
                }
              : task
        )
    );
  }

  const completedTasks = tasks.filter(
    /** @param {Task} task */
    (task) => task.completed
  ).length;

  const remainingTasks =
    tasks.length - completedTasks;

  /**
   * @param {Event} e
   */
  function handleChange(e) {
    const input =
      /** @type {HTMLInputElement} */
      (e.target);

    setTask(input.value);
  }

  /**
   * @param {KeyboardEvent} e
   */
  function handleKeyDown(e) {
    if (e.key === "Enter") {
      addTask();
    }
  }

  return (
    <div className="app">
      <div className="todo-container">

        <h1>My To-Do List</h1>

        <p className="subtitle">
          Organize your tasks and stay productive
        </p>

        <div className="input-section">

          <input
            type="text"
            placeholder="Enter a new task..."
            value={task}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />

          <button
            className="add-btn"
            onClick={addTask}
          >
            Add Task
          </button>

        </div>

        <div className="stats">

          <div className="stat">
            <span>{tasks.length}</span>
            <p>Total</p>
          </div>

          <div className="stat">
            <span>{completedTasks}</span>
            <p>Completed</p>
          </div>

          <div className="stat">
            <span>{remainingTasks}</span>
            <p>Remaining</p>
          </div>

        </div>

        <div className="task-list">

          {tasks.length === 0 ? (

            <p className="empty">
              No tasks yet. Add your first task!
            </p>

          ) : (

            tasks.map(
              /** @param {Task} task */
              (task) => (

                <div
                  className={
                    "task-item " +
                    (task.completed
                      ? "completed"
                      : "")
                  }
                  key={task.id}
                >

                  <span className="task-text">
                    {task.text}
                  </span>

                  <div className="actions">

                    <button
                      className="done-btn"
                      onClick={() =>
                        toggleTask(task.id)
                      }
                    >
                      {task.completed
                        ? "Undo"
                        : "Done"}
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        deleteTask(task.id)
                      }
                    >
                      Delete
                    </button>

                  </div>

                </div>

              )
            )

          )}

        </div>

      </div>
    </div>
  );
}

export default App;