import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import axios from 'axios'; // axios 추가
import reportWebVitals from './reportWebVitals';  // 이 줄을 추가합니다.


// App 컴포넌트 정의
function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // 데이터 로딩 상태 관리
  const [error, setError] = useState(null); // 오류 상태 관리

  useEffect(() => {
    // API 호출
    axios.get('http://localhost:8080/user')  // 백엔드 서버 주소
      .then(response => {
        setUsers(response.data);  // 데이터 설정
        setLoading(false);         // 로딩 완료
      })
      .catch(error => {
        setError(error);           // 오류 처리
        setLoading(false);         // 로딩 완료
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;  // 로딩 중일 때 표시
  }

  if (error) {
    return <div>Error: {error.message}</div>;  // 오류 발생 시 표시
  }

  return (
    <div>
      <h1>Users List</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.username} - {user.email}</li>
        ))}
      </ul>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// performance 측정
reportWebVitals();
