import './App.css';
import {Route, Routes } from 'react-router-dom';
import Menu from './Components/Menu';
import Footer from './Components/Footer';
import { lazy, Suspense } from 'react';
import Login from './Components/Login';
import Register from './Components/Register';
import { AuthProvider } from './Components/Authentication/AuthContext';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './Components/Authentication/AuthContext';

const Home=lazy(()=>import('./Components/Home'));
const CreateQuestion=lazy(()=> import('./Components/CreateQuestion'));
const UpdateQuestion=lazy(()=> import('./Components/UpdateQuestion'));
const ListQuestionsByCategory=lazy(()=> import('./Components/ListQuestionsByCategory'));
const ReadQuestion=lazy(()=> import('./Components/ReadQuestion'));
const ListAllQuestions=lazy(()=>import('./Components/ListAllQuestions'));
const AdminQuestions=lazy(()=>import('./Components/AdminQuestions'));


function App() {

  const ProtectedRoute=({children,role})=>{
    const {user} =useContext(AuthContext);
    if(!user){
      return <Navigate to='/login'/>
    }
    else{
      <Navigate to='/'/>
    }
    return children;
  }


  return (
    <div className="App">
      <AuthProvider>
      <Menu/>
      <Suspense fallback={
        <div className='container'>
            <div className="d-flex align-items-center" style={{"marginTop":100}}>
            <strong role="status">Loading...</strong>
            <div className="spinner-border ms-auto" aria-hidden="true"></div>
            </div>
        </div>
        }>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/createquestion" element={<CreateQuestion/>}></Route>
        <Route path="/updatequestion/:id" element={<UpdateQuestion/>}></Route>
        <Route path="/listquestions/:category" element={<ListQuestionsByCategory/>}></Route>
        <Route path="/readquestion/:id" element={<ReadQuestion/>}></Route>
        <Route path='/listallquestions' element={<ListAllQuestions/>}></Route>
        <Route path='/login'element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/adminquestions' element={<AdminQuestions/>}></Route>
      </Routes>
      </Suspense>
      <Footer/>
      </AuthProvider>
    </div>
  );
}

export default App;
