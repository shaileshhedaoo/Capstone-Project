import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./Authentication/AuthContext";

function Menu() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg bg-dark rounded" aria-label="Thirteenth navbar example">
      <div className="container-fluid">
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarsExample11" 
          aria-controls="navbarsExample11" 
          aria-expanded="true" 
          aria-label="Toggle navigation" 
          style={{ color: "white" }}>
          <span className="navbar-toggler-icon navbar-dark"></span>
        </button>

        <img 
          src="https://images-platform.99static.com//yotL_mQ2hgdsLcTkLbQ83Q2PvpQ=/231x234:731x734/fit-in/500x500/99designs-contests-attachments/59/59820/attachment_59820787" 
          className="bi me-0" 
          width="70" 
          height="60" 
          style={{ borderRadius: 50 }} 
          alt=""
        />

        <Link 
          className="navbar-brand col-lg-2 me-0" 
          to="/" 
          style={{ fontWeight: 600, fontSize: 20, color: "white" }}>
          Question Management
        </Link>

        <div className="collapse navbar-collapse d-lg-flex" id="navbarsExample11">
          <ul className="navbar-nav col-lg-8 justify-content-lg-center">
            <Link className="nav-link active" aria-current="page" to="/">
              <li className="nav-item" style={{ marginRight: 30, color: "white", fontWeight: 600 }}>Home</li>
            </Link>

            {user && user.role === 'user' && (
              <>
                <Link className="nav-link active" aria-current="page" to="/createquestion">
                  <li className="nav-item" style={{ marginRight: 30, color: "white", fontWeight: 600 }}>Post Question</li>
                </Link>
                <Link className="nav-link active" aria-current="page" to="/listallquestions">
                  <li className="nav-item" style={{ marginRight: 30, color: "white", fontWeight: 600 }}>Questions</li>
                </Link>
              </>
            )}

            {user && user.role === 'admin' && (
              <Link className="nav-link active" aria-current="page" to="/adminquestions">
                <li className="nav-item" style={{ marginRight: 30, color: "white", fontWeight: 600 }}>Questions</li>
              </Link>
            )}
          </ul>
        </div>

        <div className="dropdown" style={{ marginRight: 20 }}>
          <button 
            type="button" 
            className="btn btn-dark dropdown-toggle" 
            data-bs-toggle="dropdown" 
            data-bs-display="static" 
            aria-expanded="false">
            Menu
          </button>
          <ul className="dropdown-menu dropdown-menu-lg-end dropdown-menu-dark">
            {!user && (
              <>
                <li><a className="dropdown-item" href="/login">Login</a></li>
                <li><a className="dropdown-item" href="/register">Register</a></li>
              </>
            )}
            {user && (
              <li><a className="dropdown-item" onClick={handleLogout}>Logout</a></li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Menu;
