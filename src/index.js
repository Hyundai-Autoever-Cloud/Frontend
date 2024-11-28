import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import axios from 'axios'; // axios 추가
import reportWebVitals from './reportWebVitals';  


// App 컴포넌트 정의
function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  useEffect(() => {
    // API 호출
    axios.get('http://test-loadbalancer4-1722022310.ap-northeast-2.elb.amazonaws.com:8080/user')  // 백엔드 서버 주소
      .then(response => {
        setUsers(response.data);  
        setLoading(false);         
      })
      .catch(error => {
        setError(error);          
        setLoading(false);         
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;  
  }

  if (error) {
    return <div>Error: {error.message}</div>;  
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
