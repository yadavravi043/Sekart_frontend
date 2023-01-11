import './App.css';
import React from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom'

import Home from './pages/homepage/home';
import ProductList from './pages/ProductListPage/productList';
import ProductDetailsPage from './pages/ProductListPage/productList';
function App() {
  return (
<>
<BrowserRouter>
   <Routes>
       <Route path='/' exact element={<Home/>} />
       <Route path='/:slug' exact element={<ProductList/>} />
   </Routes>
</BrowserRouter>
</>)
}

export default App;
