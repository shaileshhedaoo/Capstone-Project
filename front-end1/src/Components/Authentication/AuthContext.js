import { createContext , useState ,useEffect } from "react";
// import {jwtDecode} from 'jwt-decode';

const AuthContext = createContext();

const AuthProvider = ({children}) =>{
    const [user , setUser] = useState(null);

    useEffect(()=>{
        const fetchUser = async () => {
            try {
                const loggedInUser = localStorage.getItem('user');
                if (loggedInUser) {
                    setUser(JSON.parse(loggedInUser));
                    // const decoded = jwtDecode(loggedInUser);
                    // setUser(decoded);
                }
            } catch (error) {
                console.log("Error in Authorization : "+error)
            }
        };

        fetchUser();
    },[]);

    const login = async(user) => {

        try {
            setUser(user);
            localStorage.setItem('user',JSON.stringify(user));
            // const decoded = jwtDecode(user);
            // setUser(decoded);
        } catch (error) {
            console.error("Login failed", error);
            // Handle login failure
        }
    };


    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{user , login  , logout}}>
            {children}
        </AuthContext.Provider>
    );
};
export { AuthContext , AuthProvider};