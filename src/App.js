import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Todo from "./pages/Todo";

function App() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <Routes>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/signin" element={<Signin />}></Route>
        <Route path="/todo" element={<Todo />}></Route>
        <Route
          path="/"
          element={
            <div>
              <h1>할일 관리</h1>
              <button
                onClick={() => {
                  navigate("/signin");
                }}
              >
                로그인
              </button>
              <button
                onClick={() => {
                  navigate("/signup");
                }}
              >
                회원가입
              </button>
            </div>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
