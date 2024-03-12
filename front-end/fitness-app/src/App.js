import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Components/Home';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import Profile from './Components/Profile';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<SignUp/>}/>
            <Route path='/profile' element={<Profile/>}/>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
