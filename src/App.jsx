import { useState } from "react";

export default function App() {
  const [text, setText] = useState("");
  const [tasks, setTasks] = useState([]);

  function addTask(e) {
    e.preventDefault();
    if (!text.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: text.trim(), done: false }]);
    setText("");
  }

  function toggleTask(id) {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  function removeTask(id) {
    setTasks(tasks.filter((t) => t.id !== id));
  }

  return (
    <div className="app">
      <h1>To-Do List</h1>

      <form onSubmit={addTask}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Digite uma tarefa..."
        />
        <button>Adicionar</button>
      </form>

      <ul>
        {tasks.map((t) => (
          <li key={t.id} className={t.done ? "done" : ""}>
            <label>
              <input type="checkbox" checked={t.done} onChange={() => toggleTask(t.id)} />
              <span>{t.text}</span>
            </label>
            <button className="remove" onClick={() => removeTask(t.id)}>✕</button>
          </li>
        ))}
      </ul>

      <p className="count">
        {tasks.length === 0
          ? "Nenhuma tarefa ainda."
          : `${tasks.filter((t) => !t.done).length} pendente(s) de ${tasks.length}`}
      </p>
    </div>
  );
}
