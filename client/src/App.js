import Main from './components/Main';
import './components/main.css'
import ResetPassword from './components/ResetPassword';
import Signup from './components/Signup';
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
