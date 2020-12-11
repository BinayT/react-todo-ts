import React, { useState } from 'react';
import './App.css';

type FormElem = React.FormEvent<HTMLFormElement>;

interface ITodo {
  text: string;
  complete: boolean;
}

function App() {
  const [value, setValue] = useState<string>('');
  const [todos, setTodos] = useState<ITodo[]>([]);

  const handleSubmit = (e: FormElem): void => {
    e.preventDefault();
    addTodo(value);
    setValue('');
  };

  const addTodo = (text: string): void => {
    const newTodos: ITodo[] = [...todos, { text, complete: false }];
    setTodos(newTodos);
  };

  const deleteTodoHandler = (index: number): void => {
    const newTodos: ITodo[] = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const completeTodoHandler = (index: number): void => {
    const newTodos: ITodo[] = [...todos];
    newTodos[index].complete = !newTodos[index].complete;
    setTodos(newTodos);
  };

  const editTodoHandler = (text: string, index: number): void => {
    const updatedTodos: ITodo[] = JSON.parse(JSON.stringify(todos));
    updatedTodos[index].text = text;
    setTodos(updatedTodos);
  };

  return (
    <>
      <h1>Todo List:</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required
        />
        <button type='submit' disabled={value.length === 0 && true}>
          Add Todo
        </button>
      </form>

      <section>
        {todos.length === 0 ? (
          <p>Go on, Write some todos.</p>
        ) : (
          todos.map((el: ITodo, index: number) => (
            <React.Fragment key={index}>
              <p>
                <input
                  disabled={el.complete && true}
                  style={{
                    textDecoration: el.complete ? 'line-through' : '',
                  }}
                  value={el.text}
                  onChange={(e) => editTodoHandler(e.target.value, index)}
                />

                <button onClick={() => completeTodoHandler(index)}>
                  {el.complete ? 'Incomplete' : 'Complete'}
                </button>
                <button onClick={() => deleteTodoHandler(index)}>
                  Delete Todo
                </button>
              </p>
            </React.Fragment>
          ))
        )}
      </section>
    </>
  );
}

export default App;
