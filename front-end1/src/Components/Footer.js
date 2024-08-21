import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./Authentication/AuthContext";

function Footer(){
    const {user} = useContext(AuthContext);

    return(
            <footer className="py-3 my-4 bg-dark text-white">
                <ul className="nav justify-content-center border-bottom pb-3 mb-3">
                <li className="nav-item"><Link className="nav-link active text-white" aria-current="page" to="/">Home</Link></li>
                {user && user.role==='admin'? (<li className="nav-item"><Link className="nav-link text-white" aria-current="page" to="/listallquestions">Questions</Link></li>):null}
                {user&& user.role==='admin' ? (<li className="nav-item"><Link className="nav-link text-white" aria-current="page" to="/createquestion">PostQuestion</Link></li>):null}
                </ul>
                <p className="text-center text-muted">© 2024 Company, Inc</p>
            </footer>
    )
}

export default Footer;
