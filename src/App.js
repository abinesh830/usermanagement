import './App.css';
import Login from './Components/Login';
import Userdashboard from './Components/Userdashboard';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
function App() {

    const navigate = useNavigate();

  useEffect(() => {
    function syncLogout(event) {
      if (event.key === 'users' && event.newValue === null) {
        // User logged out in another tab
        navigate('/login', { replace: true });
      }
    }

    window.addEventListener('storage', syncLogout);

    return () => {
      window.removeEventListener('storage', syncLogout);
    };
  }, [navigate]);

  return (
    <div>
      <Login/>
      <Userdashboard/>
    </div>
  );
}

export default App;
