import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer';
import CategoryPage from './pages/CategoryPage';
import ProductPage from './pages/ProductPage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Sell from './pages/Sell';
import { ToastContainer } from "react-toastify";
import Cart from './pages/Cart';
import TrackOrders from './pages/TrackOrders';
import MyProducts from './pages/MyProducts';
import EditProduct from './pages/EditProduct';
import SoilTesting from './pages/SoilTesting';

function App() {

  const user1={
    name:"Sam Mehta",
    email:"sam@gmail.com",
    password:"123456",
    role:"farmer"
  };

  const user2={
    name:"John Don",
    email:"john@gmail.com",
    password:"123456",
    role:"shopper"
  };

  return (
    <>
    <ToastContainer
        className="mt-14"
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<><Navbar user={user1}/><Home /><Footer/></>} />
        <Route path="/signup" element={<div className='h-screen'><Navbar user={user1}/><Signup /></div>} />
        <Route path="/login" element={<div className='h-screen'><Navbar user={user1}/><Login /></div>} />
        <Route path="/category/:category" element={<><Navbar user={user1}/><CategoryPage/><Footer/></>} />
        <Route path="/category/:category/:id" element={<><Navbar user={user1}/><ProductPage/><Footer/></>} />
        <Route path="/sell" element={<div className='h-screen'><Navbar user={user1}/><Sell /></div>} />
        <Route path="/cart" element={<div className='h-screen'><Navbar user={user1}/><Cart /></div>} />
        <Route path="/trackorders" element={<div className='h-screen'><Navbar user={user1}/><TrackOrders /></div>} />
        <Route path="/myproducts" element={<div className='h-screen'><Navbar user={user1}/><MyProducts /></div>} />
        <Route path="/myproducts/:id" element={<><Navbar user={user1}/><EditProduct/><Footer/></>} />
        <Route path="/soiltesting" element={<div className='h-screen'><Navbar user={user1}/><SoilTesting /></div>} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
