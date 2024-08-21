import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './Authentication/AuthContext';

function Home() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/questions/approved');
      const questions = response.data;

      const uniqueCategories = [
        ...new Set(questions.map((question) => question.category)),
      ];

      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error fetching categories', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Navbar</Link>
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNavAltMarkup" 
            aria-controls="navbarNavAltMarkup" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              {user && user.role === 'user' && (
                <>
                  <Link className="nav-link" to="/createquestion">Post Question</Link>
                  <Link className="nav-link" to="/listallquestions">Questions</Link>
                </>
              )}
              {user && user.role === 'admin' && (
                <Link className="nav-link" to="/adminquestions">Questions</Link>
              )}
            </div>
            <ul className="navbar-nav ms-auto">
              {!user ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">Register</Link>
                  </li>
                </>
              ) : (
                <li className="nav-item dropdown">
                  <a 
                    className="nav-link dropdown-toggle" 
                    href="#" 
                    id="navbarDropdownMenuLink" 
                    role="button" 
                    data-bs-toggle="dropdown" 
                    aria-expanded="false"
                  >
                    Menu
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink">
                    <li><a className="dropdown-item" onClick={handleLogout}>Logout</a></li>
                  </ul>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container my-5">
        <div className="row">
          {categories.map((category) => (
            <div className="col-md-4 mb-4" key={category}>
              <div 
                className="card" 
                onClick={() => navigate(`/listquestions/${category}`)} 
                style={{ cursor: 'pointer', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
              >
                <div 
                  className="card-body" 
                  style={{
                    background: 'linear-gradient(90deg, rgba(136, 45, 179, 1) 0%, rgba(237, 144, 250, 1) 100%)',
                    color: '#fff',
                    textAlign: 'center',
                    padding: '20px 0',
                    fontSize: '24px',
                    fontWeight: 'bold',
                    fontFamily: 'Arial, sans-serif',
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
                    borderRadius: '10px',
                  }}
                >
                  {category}
                </div>
                <p className="card-text text-center mt-2">Explore questions related to {category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
