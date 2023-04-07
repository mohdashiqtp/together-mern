import './App.css';
import Login from './screens/Login';
import Singup from './screens/Singup';
import Home from './screens/Home'
import Profile from './screens/Profile'
import Friends from './screens/Friends'
import EditProfile from './screens/EditProfile'
import Chats from './screens/Chats'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Match from './screens/Match';
import Activity from './screens/Activity';
import ViewUser from './screens/ViewUser';


function App() {

  const singup = localStorage.getItem('singup')

  const login = localStorage.getItem('login')



  return (
    <div className="App">
      <Router>

        <Routes>

          <Route path='/singup' element={<Singup />} />
          <Route path='/login' element={<Login />} />

          {/* { login ? */}



          <Route path='/match' element={<Match />} />

          {/* : window.location.assign('/login') } */}

          <Route path='/' element={< Home />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/view_profile:id' element={<ViewUser />} />
          <Route path='/chats:id' element={<Chats />} />
          <Route path='/friends:id' element={<Friends />} />
          <Route path='/edit_profile' element={<EditProfile />} />
          <Route path='/user/activity' element={<Activity />} />

        </Routes>

      </Router>

    </div>
  );
}

export default App;
