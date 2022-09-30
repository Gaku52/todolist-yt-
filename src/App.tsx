import React, { useState } from 'react';
import './App.css';

function App() {
  const [inputText, setInputText] = useState("");
  //todo配列オブジェクトの更新用に用意。プロパティはinputText, id, checkedの3つを更新する。
  const [todos, setTodos] = useState<Todo[]>([]);

  type Todo = {
    inputText: string;
    id: number;
    checked: boolean;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setInputText(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //新しいTodoを作成
    const newTodo: Todo = {
      inputText: inputText,
      id: todos.length,
      checked: false,
    };

    setTodos([newTodo, ...todos]);
    console.log(inputText);
    setInputText("");
  };

  //編集処理
  const handleEdit = (id: number, inputText: string) => {
    const newTodos = todos.map((todo) => {
      if(todo.id === id) {
        todo.inputText = inputText;
      }
      return todo;
    });
    setTodos(newTodos);
  };

  //BOXを作成
  const handleChecked = (id: number, checked: boolean) => {
    const newTodos = todos.map((todo) => {
      if(todo.id === id) {
        todo.checked = !checked;
      }
      return todo;
    });
    setTodos(newTodos);
  };

  //削除処理
  const handleDelete = (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  return (
    <div className="App">
      <div>
        <h2>Todoリスト with Typescript</h2>
          <form onSubmit={(e) => handleSubmit(e)}>
            <input
              type="text"
              onChange={(e) => handleChange(e)}
              className="inputText"
            />
            <input type="submit" value="作成" className="submitButton" />
          </form>
          <ul className="todoList">
            {todos.map((todo) => (
              <li key={todo.id}>
                <input
                  type="text"
                  onChange={(e) => handleEdit(todo.id, e.target.value)}
                  className="inputText"
                  value={todo.inputText}
                  disabled={todo.checked}
                />
                <input
                  type="checkbox"
                  onChange={(e) => handleChecked(todo.id, todo.checked)}
                />
                <button onClick={() => handleDelete(todo.id)}>消</button>
              </li>
            ))}
          </ul>
      </div>
    </div>
  );
}

export default App;