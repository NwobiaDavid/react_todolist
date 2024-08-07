import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    setDate(new Date().toLocaleDateString());
  }, []);

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { text: newTodo.trim(), completed: false }]);
      setNewTodo('');
    }
  };

  const confirmDelete = (index) => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      setTodos(todos.filter((_, i) => i !== index));
    }
  };

  const toggleComplete = (index) => {
    setTodos(
      todos.map((todo, i) => {
        if (i === index) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      })
    );
  };

  return (
    <main className=" flex max-w-screen justify-center">
      <div className=" container mt-5 border xl:w-[40%] md:w-[60%] lg:w-[50%] rounded-md shadow-sm p-2 md:p-4">
        <div className="flex items-center mb-2 justify-between">
          <div className="flex items-center">
            <img
              className=" w-[30px] md:w-[60px] h-[30px] md:h-[60px] object-cover"
              src="/React png logo.webp"
              alt="logo"
            />
            <h1 className=" text-xl">Todo List</h1>
          </div>
          <h1 className=" font-bold">{date}</h1>
        </div>

        <div className="mb-5 flex border px-3 py-1 overflow-hidden items-center justify-between w-full rounded-full">
          <input
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            className=" outline-none border-none w-[80%] p-2 md:p-3"
            placeholder="Add a new todo"
            onKeyUp={(e) => e.key === 'Enter' && addTodo()}
          />
          <button
            className=" py-1 md:py-2 hover:bg-cyan-600 bg-cyan-400  hover:border-cyan-700 flex justify-center items-center hover:font-semibold hover:text-white duration-200 active:scale-95 px-3 rounded-full mb-[5px] w-[20%] mt-2"
            onClick={addTodo}
          >
            Add
          </button>
        </div>

        <ul>
          <h1 className=" font-semibold text-sm">Todo List:</h1>
          {todos.map((todo, index) => (
            <li
              key={index}
              className={`mb-2 p-3 w-full border border-cyan-100 rounded-lg flex justify-between items-center   ${
                todo.completed && 'opacity-30'
              } `}
            >
              <span
                className={`w-full  font-semibold  ${
                  todo.completed ? 'line-through text-gray-500' : ''
                }`}
              >
                {todo.text}
              </span>
              <div className="flex">
                <button
                  className=" border-none ml-2"
                  onClick={() => toggleComplete(index)}
                >
                  {todo.completed ? (
                    <div className="p-2 border rounded-lg flex justify-center items-center hover:bg-cyan-500 hover:border-cyan-600 hover:text-white duration-200 text-cyan-500">
                      <Icon
                        className=" border-none outline-none "
                        height={20}
                        icon="material-symbols:undo-rounded"
                      />
                    </div>
                  ) : (
                    <div className="p-2 border rounded-lg flex justify-center items-center hover:bg-cyan-500 hover:border-cyan-600 hover:text-white duration-200 text-cyan-500">
                      <Icon
                        className="border-none"
                        height={20}
                        icon="material-symbols:done"
                      />
                    </div>
                  )}
                </button>
                <button
                  className=" ml-2 border-none "
                  onClick={() => confirmDelete(index)}
                >
                  <div className="p-2 border rounded-lg flex justify-center items-center hover:bg-cyan-500 hover:border-cyan-600 hover:text-white duration-200 text-cyan-500">
                    <Icon
                      className="border-none "
                      height={20}
                      icon="material-symbols:delete-outline-rounded"
                    />
                  </div>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

export default App;
