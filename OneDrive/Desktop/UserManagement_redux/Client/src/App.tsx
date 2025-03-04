import './App.css';

import UserRegister from './pages/User/UserRigister';
import UserLogin from './pages/User/UserLogin';
import UserProfile from './pages/User/UserProfile';
import AdminDashboard from './pages/Admin/adminDashboard';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux'; 
import store from './store/store';

function App() {

  
  return (
    <Provider store={store}>
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
       <Route path="/userRegister" element={<UserRegister/>} />
       <Route path='/login' element ={<UserLogin/>}/>
       <Route path='/userProfile' element ={<UserProfile/>} />
       <Route path='/adminDashboard' element={<AdminDashboard/>} />
      </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
