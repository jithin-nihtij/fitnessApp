import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import SignUp from './Components/SignUp/SignUp';
import Profile from './Components/Profile/Profile';
import AdminDash from './Components/Admin/AdminDash';
import Edit from './Components/Update/Edit';
import ChangePass from './Components/Update/ChangePass';
import Feed from './Components/Feed/Feed';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<SignUp/>}/>
            <Route path='/profile/:userId' element={<Profile/>}/>
            <Route path='/admin' element={<AdminDash/>}/>
            <Route path='/edit/:userId' element={<Edit/>}/>
            <Route path='/changePass/:userId' element={<ChangePass/>}/>
            <Route path='/feed/:userId' element={<Feed/>}/>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
