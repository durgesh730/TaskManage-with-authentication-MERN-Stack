import Main from './components/Main/Main';
import './components/Main/main.css'
import ResetPassword from './components/Password/ResetPassword';
import Signup from './components/Signup/Signup';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path='/mainpage' element={<Main />} />
            <Route path='/resetpassword' element={<ResetPassword/>} />
            <Route path='/' element={<Signup/>} />
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
