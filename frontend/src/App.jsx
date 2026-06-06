import Header from './Header';
import { Route, Routes } from 'react-router-dom';
import Products from './Products';
import About from './About';
import Signup from './signup';
import Signin from './signin';
import { useState } from 'react';
import './App.css';

function App() {

  //state to manage searchquery
  const [searchquery, setsearchquery] = useState('');

  return (
    <>
      <Header setsearchquery={setsearchquery} />

      <Routes>
        <Route
          path='/'
          element={<Products searchquery={searchquery} />}
        />

        <Route path='/about' element={<About />} />
        
        <Route
          path='/products'
          element={<Products searchquery={searchquery} />}
        />
        <Route path='/register' element={<Signup />} />
        <Route path='/login' element={<Signin />} />
      </Routes>
    </>
  );
}

export default App;
