// import ShowCoffees from './components/ShowCoffees';
import LoginForm from './components/LatteLoginForm';
import RegisterForm from './components/RegisterForm';
import EspressoEditForm from './components/EspressoEdit';
import EditCoffeeForm from './components/EditCoffeeForm';
import CreateCoffeeForm from './components/CreateCoffeeForm';
import NavBar from './components/NavBar';
// import Blog from './components/Blog'
import './App.css'
import { Routes, Route } from 'react-router-dom';
import UserType from './types/auth'
import { useState } from 'react'
import LatteLabryinth from './components/LatteLabryinth';


function App() {
  const [user, setUser]=useState<UserType|null>(null)
  

  return (

    <div>
      <NavBar/>
      <Routes>
          <Route path='/login' element={<LoginForm setUser={setUser}/>} />
          <Route path='/register' element={<RegisterForm />}/>
          <Route path='/' element={<LatteLabryinth />} />
          <Route path='/editprofile' element={<EspressoEditForm user={user}/>}/>
          <Route path='/createcoffee' element={<CreateCoffeeForm user={user}/>}/>
          <Route path='/editcoffee' element={<EditCoffeeForm user={user}/>}/>
      </Routes>

    </div>
  )
}

export default App
