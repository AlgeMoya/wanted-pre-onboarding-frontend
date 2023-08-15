import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [btnActive, setBtnActive] = useState("false");
  const url = "https://www.pre-onboarding-selection-task.shop/auth/signup";

  function checkForm() {
    // 이메일 조건: @ 포함, 비밀번호 조건: 8자 이상
    if (email.includes("@") && password.length >= 8) {
      setBtnActive(true);
    } else {
      setBtnActive(false);
    }
  }

  useEffect(() => {
    if (localStorage.getItem("Token") !== null) {
      navigate("/todo");
    }
  }, []);

  useEffect(() => {
    checkForm();
  }, [email]);

  useEffect(() => {
    checkForm();
  }, [password]);

  function signupRequest() {
    // POST 요청 보내기
    axios
      .post(
        url,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response.status === 201) {
          navigate("/signin");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        console.error("Error: ", error.response.data.message);
      });
  }

  return (
    <div>
      <h1>회원가입</h1>
      <input
        data-testid="email-input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <input
        data-testid="password-input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button
        data-testid="signup-button"
        disabled={!btnActive}
        onClick={signupRequest}
      >
        회원가입
      </button>
    </div>
  );
}

export default Signup;
