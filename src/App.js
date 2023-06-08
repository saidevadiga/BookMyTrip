import BookBus from "./Components/BookBus";
import BusDetails from "./Components/BusDetails";
import Dashboard from "./Components/Dashboard";
import Login from "./Components/Login";
import Profile from "./Components/Profile";
import Protect from "./Components/Protect";
import SignUp from "./Components/SignUp";
import {BrowserRouter,Routes,Route} from 'react-router-dom'

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp/>} />
        <Route path="/login" element={<Login/>} /> 
        <Route path="/dashboard" element={<Protect Child={Dashboard}/>}/>
        <Route path="/profile" element={<Protect Child={Profile}/>}/>
        <Route path="/bookbus" element={<Protect Child={BookBus}/>}/>
        <Route path="/busdetail/:busid" element={<Protect Child={BusDetails}/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
