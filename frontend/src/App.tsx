import { lazy } from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';

// import Login from './Pages/Login';
const Login = lazy(()=>import("./Pages/Login"));
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element ={
          <Login/>
        }/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
