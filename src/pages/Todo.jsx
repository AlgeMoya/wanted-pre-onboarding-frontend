import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Todo.css";

function Todo() {
  const navigate = useNavigate();
  const url = "https://www.pre-onboarding-selection-task.shop/todos";
  const [newTodo, setNewTodo] = useState(""); // State for email input
  const [todos, setTodos] = useState([]);
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [modifyText, setModifyText] = useState("");

  function getTodo() {
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      })
      .then((response) => {
        console.log("Response:", response);
        console.log("응답 코드: ", response.status);
        console.log("Data: ", response.data);
        setTodos(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
        console.error("Error: ", error.response.data.message);
      });
  }

  function addTodo() {
    // POST 요청 보내기
    console.log(newTodo);

    const requestBody = {
      todo: newTodo,
    };

    axios
      .post(url, requestBody, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Response:", response);
        console.log("응답 코드: ", response.status);
        console.log("Data: ", response.data);
        getTodo();
        setNewTodo("");
      })
      .catch((error) => {
        console.error("Error:", error);
        console.error("Error: ", error.response.data.message);
      });
  }

  function changeCompleted(todoId) {
    todos.map((todo) => {
      if (todo.id === todoId) {
        const requestBody = {
          todo: todo.todo,
          isCompleted: !todo.isCompleted,
        };

        axios
          .put(`${url}/${todo.id}`, requestBody, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("Token")}`,
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            console.log("Response:", response);
            console.log("응답 코드: ", response.status);
            console.log("Data: ", response.data);
            getTodo();
          })
          .catch((error) => {
            console.error("Error:", error);
            console.error("Error: ", error.response.data.message);
          });
      }
    });
  }

  function deleteTodo(todoId) {
    todos.map((todo) => {
      if (todo.id === todoId) {
        axios
          .delete(`${url}/${todo.id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("Token")}`,
            },
          })
          .then((response) => {
            console.log("Response:", response);
            console.log("응답 코드: ", response.status);
            console.log("Data: ", response.data);
            getTodo();
          })
          .catch((error) => {
            console.error("Error:", error);
            console.error("Error: ", error.response.data.message);
          });
      }
    });
  }

  function handleModifyClick(todo) {
    setEditingTodoId(todo.id);
    setModifyText(todo.todo);
  }

  function updateTodo(todoId) {
    todos.map((todo) => {
      if (todo.id === todoId) {
        const requestBody = {
          todo: modifyText,
          isCompleted: todo.isCompleted,
        };

        axios
          .put(`${url}/${todo.id}`, requestBody, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("Token")}`,
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            console.log("Response:", response);
            console.log("응답 코드: ", response.status);
            console.log("Data: ", response.data);
            getTodo();
            setEditingTodoId(null);
            setModifyText("");
          })
          .catch((error) => {
            console.error("Error:", error);
            console.error("Error: ", error.response.data.message);
          });
      }
    });
  }

  function signout() {
    localStorage.removeItem("Token");
    navigate("/");
  }

  useEffect(() => {
    if (localStorage.getItem("Token") === null) {
      navigate("/signin");
    }

    getTodo();
  }, []);

  return (
    <div>
      <h1>할일</h1>
      <button style={{ marginBottom: "0.5rem" }} onClick={signout}>
        로그아웃
      </button>
      <div style={{ marginBottom: "1rem" }}>
        <input
          data-testid="new-todo-input"
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          style={{ marginRight: "0.5rem" }}
        />
        <button data-testid="new-todo-add-button" onClick={addTodo}>
          추가
        </button>
      </div>
      {todos.map((todo) => (
        <li key={todo.id} style={{ display: "flex", alignItems: "center" }}>
          {editingTodoId === todo.id ? (
            <label className="todo-item-label">
              <input
                type="checkbox"
                style={{ marginRight: "0.5rem" }}
                checked={todo.isCompleted}
                onChange={() => {
                  changeCompleted(todo.id);
                  console.log(
                    "Checkbox changed for todo with name:",
                    todo.todo
                  );
                }}
              />
              <input
                data-testid="modify-input"
                style={{ marginRight: "0.5rem" }}
                type="text"
                value={modifyText}
                onChange={(e) => setModifyText(e.target.value)}
              />
              <button
                data-testid="submit-button"
                onClick={() => updateTodo(todo.id)}
              >
                제출
              </button>
              <button
                data-testid="cancel-button"
                onClick={() => {
                  setEditingTodoId(null);
                  setModifyText("");
                }}
              >
                취소
              </button>
            </label>
          ) : (
            <div>
              <label className="todo-item-label">
                <input
                  type="checkbox"
                  style={{ marginRight: "0.5rem" }}
                  checked={todo.isCompleted}
                  onChange={() => {
                    changeCompleted(todo.id);
                    console.log(
                      "Checkbox changed for todo with name:",
                      todo.todo
                    );
                  }}
                />
                <span style={{ marginRight: "0.5rem" }}>{todo.todo}</span>
                <button
                  data-testid="modify-button"
                  onClick={() => handleModifyClick(todo)}
                >
                  수정
                </button>
                <button
                  data-testid="delete-button"
                  onClick={() => {
                    deleteTodo(todo.id);
                  }}
                >
                  삭제
                </button>
              </label>
            </div>
          )}
        </li>
      ))}
    </div>
  );
}

export default Todo;
