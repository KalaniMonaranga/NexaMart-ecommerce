import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

function App() {
  return (
    // 1. The Router must be the very first thing!
    <Router>
      <Navbar /> 
      
      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<h1>Welcome to NexaMart Catalogue</h1>} />
          <Route path="/cart" element={<h1>Your Shopping Cart</h1>} />
          <Route path="/login" element={<h1>Login to your Account</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;