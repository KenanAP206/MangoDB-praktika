
import { useEffect } from 'react'
import {Routes, Route, NavLink} from 'react-router-dom'
import Home from './Pages/User/Main'
import Details from './Pages/User/Details';
import AddForm from './Pages/User/AddForm'


export default function CustomizedTables() {

  return (
    <section id='Table-sec'>
    <Routes>
          <Route path='/' element={<Home/>}/>  
          <Route path='/:id' element={<Details/>}/>
          <Route path='/addform' element={<AddForm/>}/>
      </Routes>
    </section>
  );
}