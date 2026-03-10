import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ padding: '1rem', background: '#333', color: '#fff', display: 'flex', justifyContent: 'space-between' }}>
      <h2>NexaMart</h2>
      <div>
        <Link to="/" style={{ margin: '0 10px', color: '#fff', textDecoration: 'none' }}>Home</Link>
        <Link to="/cart" style={{ margin: '0 10px', color: '#fff', textDecoration: 'none' }}>Cart</Link>
        <Link to="/login" style={{ margin: '0 10px', color: '#fff', textDecoration: 'none' }}>Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;